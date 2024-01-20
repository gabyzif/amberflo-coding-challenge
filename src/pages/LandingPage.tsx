import React, { useEffect, useState } from 'react';
import Table from '../components/Table/Table';
import { Column } from '../types';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
} from '@mui/material';


const LandingPage = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>Meters Dashboard</h1>
      <Table columns={columnConfig} data={meters} loading={loading} />
    </div>
  );
};

export default LandingPage;
