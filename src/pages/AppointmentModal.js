// AppointmentModal.js

import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const { format } = require('date-fns');
import assignAppointmentAPI from './assignAppointmentAPI';
import Box from '@mui/material/Box';

const AppointmentModal = ({
  modalIsOpen,
  patientName,
  patientCondition,
  closeModal,
  allDoctors = [],
  allNurses = [], // Add this line to accept nurses as props
  appointmentUuid,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedNurse, setSelectedNurse] = useState(); // Add this line for nurse selection
  const [selectedDate, setSelectedDate] = useState();
  const [assignText, setAssignText] = useState('Assign');
  const [assignLoading, setAssignLoading] = useState(false);

 

  useEffect(() => {
    ResetData();
  }, []);

  const OnDataSuccess = () => {
    setShowSuccessMessage(true);
  };

  const ResetData = () => {
    setShowSuccessMessage(false);
    setAssignLoading(false);
    setAssignText('Assign');
  };

  const handleAssignAppointment = (doctorId, nurseId, date) => {
    setAssignLoading(true);
    setAssignText('Processing');
    const inputDate = new Date(date);

    const formattedDate = format(inputDate, 'yyyy-MM-dd');
    const formattedTime = format(inputDate, 'HH:mm');

    const AppointmentData = {
      doctor_id: doctorId,
      nurse_id: nurseId, // Add nurse ID to the appointment data
      appointment_date: formattedDate,
      appointment_time: formattedTime
    };

    assignAppointmentAPI(AppointmentData, OnDataSuccess, ResetData, appointmentUuid);
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#fff', padding: 20 }}>
        <Typography variant="h5" id="modal-title" gutterBottom>
          Assign Appointment
        </Typography>
        <form>
          <TextField
            label="Patient Name"
            variant="outlined"
            fullWidth
            value={patientName}
            margin="normal"
          />
          <TextField
            label="Patient Condition"
            variant="outlined"
            fullWidth
            value={patientCondition}
            margin="normal"
          />
          <Autocomplete
            value={selectedDoctor}
            onChange={(event, newValue) => setSelectedDoctor(newValue)}
            options={allDoctors}
            getOptionLabel={(option) => option.name + ' - ' + option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a doctor"
                fullWidth
              />
            )}
          />
          <Autocomplete
            value={selectedNurse} // Add this block for nurse selection
            onChange={(event, newValue) => setSelectedNurse(newValue)}
            options={allNurses}
            getOptionLabel={(option) => option.name + ' - ' + option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a nurse"
                fullWidth
              />
            )}
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Appointment Date and Time</Typography>
            <DateTimePicker
              label="Appointment Date and Time"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            {!showSuccessMessage && <Button variant="contained" 
              disabled={assignLoading}
              style={{ backgroundColor: '#009396', color: '#fff' }}
              onClick={() => { handleAssignAppointment(selectedDoctor.uuid, selectedNurse.uuid, selectedDate) }}
            >
              {assignText}
            </Button>}
            <Button variant="contained" style={{ backgroundColor: '#f6b219', color: '#fff' }} onClick={closeModal}>
              Close
            </Button>
          </Box>
          {showSuccessMessage && (
            <Box mt={2} color="green">
              Appointment assigned successfully!
            </Box>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
