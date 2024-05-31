import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import createLabRecords from './createLabRecords';

const LabModal = ({ showModal, closeModal, apptUuid }) => {
  const [labRecord, setLabRecord] = useState({
    testType: '',
    result: '',
    date: '',
    technician: '',
    file: null,
  });
  const [pname, setName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLabRecord((prevLabRecord) => ({ ...prevLabRecord, [name]: value }));
  };

  const handleFileChange = (e) => {
    setLabRecord((prevLabRecord) => ({ ...prevLabRecord, file: e.target.files[0] }));
  };

  const dataReset = () => {
    setLabRecord({
      testType: '',
      result: '',
      date: '',
      technician: '',
      file: null,
    });
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  const labData = {
    appointment_id: apptUuid,
    type: labRecord.testType,
    result: labRecord.result,
    date: formattedDate,
    file: labRecord.file,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createLabRecords(labData, dataReset);
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
          <TextField
            fullWidth
            margin="normal"
            variant="filled"
            id="name"
            label="Test Name"
            value={pname}
            onChange={(e) => setName(e.target.value)}
          />
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
            InputLabelProps={{
              shrink: true,
            }}
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
          <input
            accept="application/pdf,image/*"
            style={{ marginTop: '16px', marginBottom: '16px', width: '100%' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            style={{ backgroundColor: '#009396' }}
            type="submit"
            variant="contained"
            color="primary"
            mt={2}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LabModal;
