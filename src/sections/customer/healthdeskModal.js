import React, {useState} from 'react';
import { Box, Button, Modal,TextField, Typography, Stack, Paper } from '@mui/material';

const HealthDeskModal = ({ open, onClose, data={} }) => {

    const [pname,setName] = useState('')

    const assignNurse = ()=>{
    alert(`You assigned this patient to ${pname}. BUT This api is not fully ready`)
    }
  const fieldsToDisplay = [
    'heart_rate',
    'systolic_blood_pressure',
    'diastolic_blood_pressure',
    'pulse_rate',
    'temperature',
    'bmi',
    'spo2',
    'weight',
    'height',
    'user_type',
    
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh', // Adjust as necessary
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Health Metrics
        </Typography>
        <Stack spacing={2}>
          <Paper sx={{ p: 2 }}>
            {fieldsToDisplay.map((key) => (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {key.replace(/_/g, ' ')}
                </Typography>
                <Typography variant="body1">
                  {data[key] !== null ? data[key]?.toString() : 'N/A'}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Stack>
        <TextField
        id="name"
        label="Assign a Nurse"
    placeholder='Name here'
        value={pname}
        onChange={(e) => setName(e.target.value)}
      />
        <Box mt={3} textAlign="center">
          <Button  variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>  <Button style={{ backgroundColor: '#008889' }} variant="contained" color="primary" onClick={assignNurse}>
            Assign Nurse
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HealthDeskModal;
