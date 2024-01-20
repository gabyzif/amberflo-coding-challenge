import React, { useEffect, useState } from 'react';
import Table from '../components/Table/Table';
import { Button } from '@mui/material';
import { Column } from '../types';
import CreateMeter from '../components/CreateMeterModal';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const history = useNavigate();

  const columnConfig: Column[] = [
    { id: 'id', displayName: 'ID', width: '20%', alignment: 'left' },
    {
      id: 'api_name',
      displayName: 'API Name',
      width: '10%',
      alignment: 'left',
    },
    {
      id: 'display_name',
      displayName: 'Display Name',
      width: '15%',
      alignment: 'left',
    },
    { id: 'active', displayName: 'Active', width: '7%', alignment: 'center' },
    {
      id: 'used_for_billing',
      displayName: 'Used For Billing',
      width: '15%',
      alignment: 'center',
    },
    { id: 'type', displayName: 'Type', width: '7%', alignment: 'center' },
    {
      id: 'updated_time',
      displayName: 'Updated Time',
      width: '10%',
      alignment: 'center',
    },
    {
      id: 'created_time',
      displayName: 'Created Time',
      width: '10%',
      alignment: 'center',
    },
  ];

  const handleRowClick = (meterId) => {
    history(`/meters/${meterId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://take-home-exercise-api.herokuapp.com/meters',
          {
            headers: {
              'API-KEY': process.env.REACT_APP_API_KEY,
            },
          }
        );
        const data = await response.json();
        setMeters(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateMeter = async (newMeterData) => {
    // Set up the request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-KEY': process.env.REACT_APP_API_KEY,
      },
      body: JSON.stringify({
        api_name: newMeterData.api_name,
        display_name: newMeterData.display_name,
        active: newMeterData.active,
        used_for_billing: newMeterData.used_for_billing,
        type: newMeterData.type,
      }),
    };

    try {
      const response = await fetch(
        'https://take-home-exercise-api.herokuapp.com/meters',
        requestOptions
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdMeter = await response.json();
      setMeters((prevMeters) => [...prevMeters, createdMeter]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Meters Dashboard</h1>
        <Button onClick={() => setCreateModalOpen(true)}>
          Create New Meter
        </Button>
      </div>

      <Table
        onRowClick={handleRowClick}
        columns={columnConfig}
        data={meters}
        loading={loading}
      />
      <CreateMeter
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateMeter}
      />
    </div>
  );
};

export default LandingPage;
