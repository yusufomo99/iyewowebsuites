import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import createVitals from './createVitals'

const dummyDoctors = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Johnson' },
  { id: 3, name: 'Dr. Miller' },
];

const VitalsModal = ({ showModal, closeModal, apptUuid}) => {
  const [vitals, setVitals] = useState({
    heart_rate: '',
    systolic_blood_pressure: '',
    diastolic_blood_pressure: '',
    pulse_rate: '',
    temperature: '',
    weight: '',
    height: '',
    bmi: '',
    spo2: '',
    // assignedDoctor: '',
  });

  const [loading, setLoading] = useState(false);

  const dataReset = ()=>{
setVitals({
  heart_rate: '',
  systolic_blood_pressure: '',
  diastolic_blood_pressure: '',
  pulse_rate: '',
  temperature: '',
  weight: '',
  height: '',
  bmi: '',
  spo2: '',
  // assignedDoctor: '',
});


setLoading(false)
  }




  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setVitals((prevVitals) => ({ ...prevVitals, [name]: value }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the value to an integer. If the conversion fails, default to 0 or any other fallback value.
    const intValue = parseInt(value, 10) || 0;
    setVitals((prevVitals) => ({ ...prevVitals, [name]: intValue }));
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate deep learning analysis
    analyzeVitals(vitals);
    // Close the modal after submission
    // closeModal();
  };

  const analyzeVitals = (vitals) => {
    // Placeholder logic for deep learning
    // console.log('Deep learning analysis on vitals:', vitals);
    // alert(apptUuid)
    setLoading(true)
    createVitals(vitals,dataReset,apptUuid)
    // Replace this with your actual deep learning logic
  };

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="vitals-modal"
      aria-describedby="modal-for-taking-patient-vitals"
    >
      <Box
       sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxWidth: '90%',
        maxHeight: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Add overflowY to make it scrollable
      }}
      >
        <Typography variant="h5" mb={2}>
          Vitals Form
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Heart Rate"
            name="heart_rate"
            value={vitals.heart_rate}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Systolic Blood Pressure"
            name="systolic_blood_pressure"
            value={vitals.systolic_blood_pressure}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Diastolic Blood Pressure"
            name="diastolic_blood_pressure"
            value={vitals.diastolic_blood_pressure}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Pulse Rate"
            name="pulse_rate"
            value={vitals.pulse_rate}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Temperature"
            name="temperature"
            value={vitals.temperature}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            value={vitals.weight}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="Height"
            name="height"
            value={vitals.height}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
            
          />
          <TextField
            fullWidth
            label="Body Mass Index (BMI)"
            name="bmi"
            value={vitals.bmi}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          <TextField
            fullWidth
            label="SPO2"
            name="spo2"
            value={vitals.spo2}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }}
          />
          {/* <Select
            fullWidth
            label="Assigned Doctor"
            name="assignedDoctor"
            value={vitals.assignedDoctor}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Select a doctor
            </MenuItem>
            {dummyDoctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.name}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select> */}
          <Button disabled={loading} style={{ backgroundColor: '#009396'}} type="submit" variant="contained" color="primary" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default VitalsModal;
