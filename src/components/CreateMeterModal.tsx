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
  FormHelperText,
  Paper,
} from '@mui/material';
interface Errors {
  api_name?: string;
  display_name?: string;
  type?: string;
}

const CreateMeter = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    api_name: '',
    display_name: '',
    active: false,
    used_for_billing: false,
    type: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.api_name) newErrors.api_name = 'API Name is required';
    if (!formData.display_name)
      newErrors.display_name = 'Display Name is required';
    if (!formData.type) newErrors.type = 'Type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box component={Paper}>
        <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create New Meter
          </Typography>
          <TextField
            name="api_name"
            label="API Name"
            value={formData.api_name}
            onChange={handleChange}
            fullWidth
            error={!!errors.api_name}
            helperText={errors.api_name}
          />
          <TextField
            name="display_name"
            label="Display Name"
            value={formData.display_name}
            onChange={handleChange}
            fullWidth
            error={!!errors.display_name}
            helperText={errors.display_name}
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
          <FormControl fullWidth margin="normal" error={!!errors.type}>
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
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </Box>
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
