import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Container,
  Grid,
  Alert,
  Paper,
} from '@mui/material';

const MeterDetailsPage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [meter, setMeter] = useState(null);
  const [isEditable, setEditable] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    display_name: '',
    api_name: '',
    active: false,
    used_for_billing: false,
    type: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://take-home-exercise-api.herokuapp.com/meters`,
          {
            headers: {
              'API-KEY': process.env.REACT_APP_API_KEY,
            },
          }
        );
        const data = await response.json();
        const selectedMeter = data.find((meter) => meter.id === id);
        if (selectedMeter) {
          setMeter(selectedMeter);
          setFormState({
            display_name: selectedMeter.display_name,
            api_name: selectedMeter.api_name,
            active: selectedMeter.active,
            used_for_billing: selectedMeter.used_for_billing,
            type: selectedMeter.type,
          });

          const cutoffDate = new Date('2023-05-01');
          const createdDate = new Date(selectedMeter.created_time);
          setEditable(createdDate >= cutoffDate && !selectedMeter.read_only);
        }
      } catch (error) {
        setError('Failed to fetch meter details.');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://take-home-exercise-api.herokuapp.com/meters/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify(formState),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      history('/');
    } catch (error) {
      setError('Failed to update meter details.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://take-home-exercise-api.herokuapp.com/meters/${id}`,
        {
          method: 'DELETE',
          headers: {
            'API-KEY': process.env.REACT_APP_API_KEY,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      history('/');
    } catch (error) {
      setError('Failed to delete meter.');
    }
  };
  if (!meter) return <Typography>Loading...</Typography>;

  return (
    <Container component={Paper} style={{ margin: 10, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Meter Details
      </Typography>
      {error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Display Name"
              name="display_name"
              value={formState.display_name}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="API Name"
              name="api_name"
              value={formState.api_name}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  name="active"
                  checked={formState.active}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              }
              label="Active"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  name="used_for_billing"
                  checked={formState.used_for_billing}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              }
              label="Used for Billing"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Type"
              name="type"
              value={formState.type}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isEditable}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={!isEditable}
            >
              Delete Meter
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MeterDetailsPage;
