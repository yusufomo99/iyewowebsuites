import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createManagePatient from './createManagePatient';
import { setuid } from 'process';

const ManagePatients = (
  { isOpen,
    onClose,
     patientData,
     apptUuid='',
     medicalRecords=[],
     labRecords =[],
     description=''
   }
) => {
  const theme = useTheme();

  // State for each field in the form
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [associatedDiagnosis, setAssociatedDiagnosis] = useState('');
  const [date, setDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [presentingComplaints, setPresentingComplaints] = useState('');
  const [historyOfPresentingComplaints, setHistoryOfPresentingComplaints] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [reviewOfSystems, setReviewOfSystems] = useState('');

  // State for vital signs
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [spo2, setSpo2] = useState('');

  // General and system-specific examinations
  const [generalExamination, setGeneralExamination] = useState('');
  const [cnsExamination, setCnsExamination] = useState('');
  const [cardiovascularExamination, setCardiovascularExamination] = useState('');
  const [respiratoryExamination, setRespiratoryExamination] = useState('');
  const [abdominalExamination, setAbdominalExamination] = useState('');
  const [musculoskeletalExamination, setMusculoskeletalExamination] = useState('');
  const [urogenitalExamination, setUrogenitalExamination] = useState('');
  const [dreVaginalExamination, setDreVaginalExamination] = useState('');

  // File upload state
  const [file, setFile] = useState(null);

  //uuid
  const [uuid, setUuid] = useState('');


  useEffect(()=>{
    setUuid(apptUuid)

  },[])

  const dataReset = () => {
    setUuid('');
    setPatientName('');
    setAge('');
    setSex('');
    setAssociatedDiagnosis('');
    setDate('');
    setDateOfBirth('');
    setPresentingComplaints('');
    setHistoryOfPresentingComplaints('');
    setAdditionalInformation('');
    setCurrentMedications('');
    setReviewOfSystems('');
    setSystolicBP('');
    setDiastolicBP('');
    setPulseRate('');
    setTemperature('');
    setSpo2('');
    setGeneralExamination('');
    setCnsExamination('');
    setCardiovascularExamination('');
    setRespiratoryExamination('');
    setAbdominalExamination('');
    setMusculoskeletalExamination('');
    setUrogenitalExamination('');
    setDreVaginalExamination('');
    setFile(null); // Reset the file state to null or an initial value as required
  };
setTimeout(() => {
  setPatientName(patientData)
}, 1000);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Construct the data object to include all fields

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    
  
  const medData = {
    "appointment_id": apptUuid, // Assuming apptUuid is available in the scope
    "patient_name": patientName, // Assuming patientName is available in the scope
    "age": age, // Assuming age is available in the scope
    "sex": sex, // Assuming sex is available in the scope
    "associated_diagnosis": associatedDiagnosis, // Assuming associatedDiagnosis is available in the scope
    "date": formattedDate, // Assuming date is available in the scope
    "date_of_birth": dateOfBirth, // Assuming dateOfBirth is available in the scope
    "presenting_complaints": presentingComplaints, // Assuming presentingComplaints is available in the scope
    "history_of_presenting_complaints": historyOfPresentingComplaints, // Assuming historyOfPresentingComplaints is available in the scope
    "additional_information": additionalInformation, // Assuming additionalInformation is available in the scope
    "current_medications": currentMedications, // Assuming currentMedications is available in the scope
    "review_of_systems": reviewOfSystems, // Assuming reviewOfSystems is available in the scope
    "vital_signs": {
      "systolic_BP": systolicBP, // Accessing as if from a similar structure
      "diastolic_BP": diastolicBP, // Accessing as if from a similar structure
      "pulse_rate": pulseRate, // Accessing as if from a similar structure
      "temperature": temperature, // Accessing as if from a similar structure
      "spo2": spo2, // Accessing as if from a similar structure
    },
    "general_examination": generalExamination, // Assuming generalExamination is available in the scope
    "cns_examination": cnsExamination, // Assuming cnsExamination is available in the scope
    "cardiovascular_examination": cardiovascularExamination, // Assuming cardiovascularExamination is available in the scope
    "respiratory_examination": respiratoryExamination, // Assuming respiratoryExamination is available in the scope
    "abdominal_examination": abdominalExamination, // Assuming abdominalExamination is available in the scope
    "musculoskeletal_examination": musculoskeletalExamination, // Assuming musculoskeletalExamination is available in the scope
    "urogenital_examination": urogenitalExamination, // Assuming urogenitalExamination is available in the scope
    "dre_vaginal_examination": dreVaginalExamination, // Assuming dreVaginalExamination is available in the scope
    "file": file // Assuming file is available in the scope
  };



    
    createManagePatient(medData,dataReset)
    console.log('Saving Patient Records:', patientData);
    // onClose(); // Close the modal after saving
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={isOpen} onClose={onClose}>
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', maxWidth: '90%', maxHeight: '90%', overflowY: 'auto', backgroundColor: '#fff', padding: 20 }}>
          <Typography variant="h5" gutterBottom>Manage Patient Records</Typography>
          <form noValidate autoComplete="off">
            <TextField label="Patient Name" fullWidth margin="normal" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <TextField label="Age" fullWidth margin="normal" value={age} onChange={(e) => setAge(e.target.value)}   type="number"  // This ensures only numerical input is allowed
            InputProps={{
              inputProps: {
                min: 0,  // Optionally set a minimum value
              }
            }} />
            <TextField label="Sex" fullWidth margin="normal" value={sex} onChange={(e) => setSex(e.target.value)} />
            <TextField label="Associated Diagnosis" fullWidth margin="normal" value={associatedDiagnosis} onChange={(e) => setAssociatedDiagnosis(e.target.value)} />
            {/* <TextField label="Date" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} /> */}
            <TextField label="Date of Birth" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            <TextField label="Presenting Complaints" fullWidth multiline rows={3} margin="normal" value={presentingComplaints} onChange={(e) => setPresentingComplaints(e.target.value)} />
            <TextField label="History Of Presenting Complaints" fullWidth multiline rows={3} margin="normal" value={historyOfPresentingComplaints} onChange={(e) => setHistoryOfPresentingComplaints(e.target.value)} />
            <TextField label="Additional Information" fullWidth multiline rows={3} margin="normal" value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
            <TextField label="Current Medications" fullWidth multiline rows={3} margin="normal" value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} />
            <TextField label="Review of Systems" fullWidth multiline rows={3} margin="normal" value={reviewOfSystems} onChange={(e) => setReviewOfSystems(e.target.value)} />
            
            {/* Vital Signs */}
            <TextField label="Systolic Blood Pressure" fullWidth margin="normal" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} />
            <TextField label="Diastolic Blood Pressure" fullWidth margin="normal" value={diastolicBP} onChange={(e) => setDiastolicBP(e.target.value)} />
            <TextField label="Pulse Rate" fullWidth margin="normal" value={pulseRate} onChange={(e) => setPulseRate(e.target.value)}
              type="number"  // This ensures only numerical input is allowed
              InputProps={{
                inputProps: {
                  min: 0,  // Optionally set a minimum value
                }
              }}
            />
            <TextField label="Temperature" fullWidth margin="normal" value={temperature} onChange={(e) => setTemperature(e.target.value)}
              type="number"  // This ensures only numerical input is allowed
              InputProps={{
                inputProps: {
                  min: 0,  // Optionally set a minimum value
                }
              }}
            />
            <TextField label="SPO2" fullWidth margin="normal" value={spo2} onChange={(e) => setSpo2(e.target.value)}
              type="number"  // This ensures only numerical input is allowed
              InputProps={{
                inputProps: {
                  min: 0,  // Optionally set a minimum value
                }
              }}
            />

            {/* Examination Sections */}
            <TextField label="General Examination" fullWidth multiline rows={3} margin="normal" value={generalExamination} onChange={(e) => setGeneralExamination(e.target.value)} />
            <TextField label="Central Nervous System Examination" fullWidth multiline rows={3} margin="normal" value={cnsExamination} onChange={(e) => setCnsExamination(e.target.value)} />
            <TextField label="Cardiovascular System Examination" fullWidth multiline rows={3} margin="normal" value={cardiovascularExamination} onChange={(e) => setCardiovascularExamination(e.target.value)} />
            <TextField label="Respiratory System Examination" fullWidth multiline rows={3} margin="normal" value={respiratoryExamination} onChange={(e) => setRespiratoryExamination(e.target.value)} />
            <TextField label="Abdominal Examination" fullWidth multiline rows={3} margin="normal" value={abdominalExamination} onChange={(e) => setAbdominalExamination(e.target.value)} />
            <TextField label="Musculoskeletal Examination" fullWidth multiline rows={3} margin="normal" value={musculoskeletalExamination} onChange={(e) => setMusculoskeletalExamination(e.target.value)} />
            <TextField label="Urogenital Examination" fullWidth multiline rows={3} margin="normal" value={urogenitalExamination} onChange={(e) => setUrogenitalExamination(e.target.value)} />
            <TextField label="DRE/Vaginal Examination" fullWidth multiline rows={3} margin="normal" value={dreVaginalExamination} onChange={(e) => setDreVaginalExamination(e.target.value)} />

            {/* File Upload */}
            <Typography variant="body1" component="div">File Upload:</Typography>
            <input type="file" onChange={handleFileChange} />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleSave} color="primary">Save</Button>
              <Button variant="contained" onClick={onClose} color="secondary">Cancel</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ManagePatients;
