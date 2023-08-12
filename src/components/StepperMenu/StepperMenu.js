import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const StepperMenu = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressInput, setAddressInput] = useState('');



  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleAddressChange = event => {
    setSelectedAddress(event.target.value);
  };

  const handleAddressInput = event => {
    setAddressInput(event.target.value);
  };

  const renderStepContent = step => {
    switch (step) {
      case 0:
        return (
          /* Content for the "Items" step */
          <Typography>Product details go here</Typography>
        );
      case 1:
        return (
          /* Content for the "Select Address" step */
          <FormControl fullWidth>
            <InputLabel>Select an Address</InputLabel>
            <Select value={selectedAddress} onChange={handleAddressChange}>
              <MenuItem value={1}>Address 1</MenuItem>
              <MenuItem value={2}>Address 2</MenuItem>
              {/* Add more addresses as needed */}
            </Select>
            <TextField
              label="Or Add New Address"
              value={addressInput}
              onChange={handleAddressInput}
              fullWidth
            />

          </FormControl>
        );
      case 2:
        return (
          /* Content for the "Confirm Order" step */
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Left side - Item details */}
              <Typography>Item details go here</Typography>
            </Grid>
            <Grid item xs={6}>
              {/* Right side - Address details */}
              <Typography>Address details go here</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Place Order
              </Button>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
        <div>{renderStepContent(activeStep)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepperMenu;
