import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import createLabRecords from './createLabRecords'
const dummyTests = [
  { id: 1, name: 'Blood Test' },
  { id: 2, name: 'Urine Analysis' },
  { id: 3, name: 'X-ray' },
];

const LabModal = ({ showModal, closeModal, apptUuid}) => {
  const [labRecord, setLabRecord] = useState({
    testType: '',
    result: '',
    date: '',
    technician: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLabRecord((prevLabRecord) => ({ ...prevLabRecord, [name]: value }));
  };


  const dataReset = ()=>{
    setLabRecord({
      testType: '',
      result: '',
      date: '',
      technician: '',
    });
  }

  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

const labData = {
  "appointment_id": apptUuid,
  "type": labRecord.testType,
  "result": labRecord.result,
  "date": formattedDate
};
  const handleFormSubmit = (e) => {
    e.preventDefault();

  createLabRecords(labData,dataReset)
  // console.log(labData,"labData")
    // alert(apptUuid)
    // Simulate deep learning analysis
    // analyzeLabRecord(labRecord);
    // Close the modal after submission
    // closeModal();
  };

  const analyzeLabRecord = (labRecord) => {
    // Placeholder logic for deep learning
    console.log('Deep learning analysis on lab record:', labRecord);
    // Replace this with your actual deep learning logic
  };

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="lab-modal"
      aria-describedby="modal-for-laboratory-records"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" mb={2}>
          Laboratory Records Form
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Select
            fullWidth
            label="Test Type"
            name="testType"
            value={labRecord.testType}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Select a test
            </MenuItem>
            {dummyTests.map((test) => (
              <MenuItem key={test.id} value={test.name}>
                {test.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Result"
            name="result"
            value={labRecord.result}
            onChange={handleInputChange}
            margin="normal"
            variant="filled"
          />
          {/* <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={labRecord.date}
            onChange={handleInputChange}
            margin="normal"
            variant="filled"
          /> */}
          {/* <TextField
            fullWidth
            label="Technician"
            name="technician"
            value={labRecord.technician}
            onChange={handleInputChange}
            margin="normal"
            variant="filled"
          /> */}
                     
          <Button style={{ backgroundColor: '#009396'}} type="submit" variant="contained" color="primary" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LabModal;
