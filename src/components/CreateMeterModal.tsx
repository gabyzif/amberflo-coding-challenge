import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from '@mui/material';

const CreateMeter = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    api_name: '',
    display_name: '',
    active: false,
    used_for_billing: false,
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose(); // Close the modal after creation
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New Meter
        </Typography>
        <TextField
          name="api_name"
          label="API Name"
          value={formData.api_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="display_name"
          label="Display Name"
          value={formData.display_name}
          onChange={handleChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={handleChange}
              name="active"
            />
          }
          label="Active"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.used_for_billing}
              onChange={handleChange}
              name="used_for_billing"
            />
          }
          label="Used for Billing"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="sum">Sum</MenuItem>
            <MenuItem value="max">Max</MenuItem>
            <MenuItem value="unique_count">Unique Count</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '300px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: 4,
  gap: 3,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
};

export default CreateMeter;
