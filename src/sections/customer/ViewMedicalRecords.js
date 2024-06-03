import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ViewMedicalRecords = ({ open, onClose, patientData = {}, medicalRecords = {}, created_at='', lab_records }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90%',
            maxHeight: '90%',
            overflowY: 'auto',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            View Medical Records :<br/>
            <h6>{created_at}</h6> 

          </Typography>
          <Box mt={2}>
            <Typography variant="h6">Patient Information</Typography>
            <Typography variant="body1"><strong>Name:</strong> {patientData?.name || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Phone:</strong> {patientData?.phone || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {patientData?.email || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Wallet Balance:</strong> {patientData?.wallet_balance || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Heart Rate:</strong> {patientData?.heart_rate || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Systolic Blood Pressure:</strong> {patientData?.systolic_blood_pressure || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Diastolic Blood Pressure:</strong> {patientData?.diastolic_blood_pressure || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Pulse Rate:</strong> {patientData?.pulse_rate || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Temperature:</strong> {patientData?.temperature || 'N/A'}</Typography>
            <Typography variant="body1"><strong>BMI:</strong> {patientData?.bmi || 'N/A'}</Typography>
            <Typography variant="body1"><strong>SPO2:</strong> {patientData?.spo2 || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Weight:</strong> {patientData?.weight || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Height:</strong> {patientData?.height || 'N/A'}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Medical Records</Typography>
            <Typography variant="body1"><strong>Diagnosis:</strong> {medicalRecords?.diagnosis || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Presenting Complaints:</strong> {medicalRecords?.presenting_complaints || 'N/A'}</Typography>
            <Typography variant="body1"><strong>History of Presenting Complaints:</strong> {medicalRecords?.history_of_presenting_complaints || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Current Medications:</strong> {medicalRecords?.current_medications || 'N/A'}</Typography>
            <Typography variant="body1"><strong>CNS Examination:</strong> {medicalRecords?.cns_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Cardiovascular Examination:</strong> {medicalRecords?.cardiovascular_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Respiratory Examination:</strong> {medicalRecords?.respiratory_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Abdominal Examination:</strong> {medicalRecords?.abdominal_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Musculoskeletal Examination:</strong> {medicalRecords?.musculoskeletal_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Urogenital Examination:</strong> {medicalRecords?.urogenital_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>DRE/Vaginal Examination:</strong> {medicalRecords?.dre_vaginal_examination || 'N/A'}</Typography>
            <Typography variant="body1"><strong>General Examination:</strong> {medicalRecords?.general_examination || 'N/A'}</Typography>
          </Box>


          <Box mt={2}>
            <Typography variant="h6">Lab Records</Typography>
            {lab_records==[] ? <Typography>No Lab Record</Typography>: <Typography>-</Typography> }
         </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" onClick={onClose} color="secondary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ViewMedicalRecords;
