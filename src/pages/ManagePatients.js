import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createManagePatient from './createManagePatient';

const ManagePatients = ({ isOpen, onClose, patientData, apptUuid = '', medicalRecords = [], labRecords = [], description = '',patientRecord={} }) => {
  const theme = useTheme();
  // State for each field in the form
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [associatedDiagnosis, setAssociatedDiagnosis] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [presentingComplaints, setPresentingComplaints] = useState('');
  const [historyOfPresentingComplaints, setHistoryOfPresentingComplaints] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [reviewOfSystems, setReviewOfSystems] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [spo2, setSpo2] = useState('');
  const [generalExamination, setGeneralExamination] = useState('');
  const [cnsExamination, setCnsExamination] = useState('');
  const [cardiovascularExamination, setCardiovascularExamination] = useState('');
  const [respiratoryExamination, setRespiratoryExamination] = useState('');
  const [abdominalExamination, setAbdominalExamination] = useState('');
  const [musculoskeletalExamination, setMusculoskeletalExamination] = useState('');
  const [urogenitalExamination, setUrogenitalExamination] = useState('');
  const [dreVaginalExamination, setDreVaginalExamination] = useState('');
  const [labAttendant, setLabAttendant] = useState('');
  const [messageToLabAttendant, setMessageToLabAttendant] = useState('');
  const [referral, setReferral] = useState('');

  // File upload state
  const [file, setFile] = useState(null);

  // uuid
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    setUuid(apptUuid);
  }, [patientRecord]);

  useEffect(()=>{
  setTimeout(()=>{

    if(patientRecord){
      setSystolicBP(patientRecord.systolic_blood_pressure)
      setDiastolicBP(patientRecord.diastolic_blood_pressure)
      setPulseRate(patientRecord.pulse_rate)
      setTemperature(patientRecord.temperature)
      setSpo2(patientRecord.spo2)
     }
  },1000)


  },[])

  const dataReset = () => {
    setUuid('');
    setPatientName('');
    setAge('');
    setSex('');
    setAssociatedDiagnosis('');
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
    setLabAttendant('');
    setMessageToLabAttendant('');
    setReferral('');
  };

  setTimeout(() => {
    setPatientName(patientData);
  }, 1000);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const medData = {
      "appointment_id": apptUuid,
      "patient_name": patientName,
      "age": age,
      "sex": sex,
      "diagnosis": associatedDiagnosis,
      "associated_diagnosis": associatedDiagnosis,
      "date": formattedDate,
      "date_of_birth": dateOfBirth,
      "presenting_complaints": presentingComplaints,
      "history_of_presenting_complaints": historyOfPresentingComplaints,
      "additional_information": additionalInformation,
      "current_medications": currentMedications,
      "review_of_systems": `CNS: ${cnsExamination}; CVS: ${cardiovascularExamination}; RESP: ${respiratoryExamination}`,
      "vital_signs": {
        "systolic_bp": systolicBP,
        "diastolic_bp": diastolicBP,
        "pulse_rate": pulseRate,
        "temperature": temperature,
        "spo2": spo2
      },
      "general_examination": generalExamination,
      "dre_vaginal_examination": dreVaginalExamination,
      "referral_description": referral,
      "lab_attendant": labAttendant,
      "message_to_lab_attendant": messageToLabAttendant
    };

    const formData = new FormData();
    Object.keys(medData).forEach(key => {
      if (key === 'vital_signs') {
        Object.keys(medData[key]).forEach(subKey => {
          formData.append(`vital_signs[${subKey}]`, medData[key][subKey]);
        });
      } else {
        formData.append(key, medData[key]);
      }
    });

    if (file) {
      formData.append('file', file);
    }

    createManagePatient(formData, dataReset);
    console.log('Saving Patient Records:', patientData);
  };

  const dummyPharmacyUsers = ['Pharmacy User 1', 'Pharmacy User 2', 'Pharmacy User 3'];
  const dummyLabUsers = ['Lab User 1', 'Lab User 2', 'Lab User 3'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={isOpen} onClose={onClose}>
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', maxWidth: '90%', maxHeight: '90%', overflowY: 'auto', backgroundColor: '#fff', padding: 20 }}>
          <Typography variant="h5" gutterBottom>Manage Patient Records</Typography>
          <form noValidate autoComplete="off" encType="multipart/form-data">

            <TextField label="Patient Name" fullWidth margin="normal" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <TextField label="Age" fullWidth margin="normal" value={age} onChange={(e) => setAge(e.target.value)} type="number"
              InputProps={{
                inputProps: {
                  min: 0,
                }
              }} />
            <FormControl fullWidth margin="normal">
              <InputLabel id="sex-label">Sex</InputLabel>
              <Select
                labelId="sex-label"
                value={sex}
                label="Sex"
                onChange={(e) => setSex(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Associated Diagnosis" fullWidth margin="normal" value={associatedDiagnosis} onChange={(e) => setAssociatedDiagnosis(e.target.value)} />
            <TextField label="Date of Birth" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            <TextField label="Presenting Complaints" fullWidth multiline rows={3} margin="normal" value={presentingComplaints} onChange={(e) => setPresentingComplaints(e.target.value)} />
            <TextField label="History Of Presenting Complaints" fullWidth multiline rows={3} margin="normal" value={historyOfPresentingComplaints} onChange={(e) => setHistoryOfPresentingComplaints(e.target.value)} />
            <TextField label="Additional Information" fullWidth multiline rows={3} margin="normal" value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
            <TextField label="Current Medications" fullWidth multiline rows={3} margin="normal" value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} />
            <TextField label="Review of Systems" fullWidth multiline rows={3} margin="normal" value={reviewOfSystems} onChange={(e) => setReviewOfSystems(e.target.value)} />
            <TextField label="Systolic Blood Pressure" fullWidth margin="normal" type="number" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} />
            <TextField label="Diastolic Blood Pressure" fullWidth margin="normal" type="number" value={diastolicBP} onChange={(e) => setDiastolicBP(e.target.value)} />
            <TextField label="Pulse Rate" fullWidth margin="normal" type="number" value={pulseRate} onChange={(e) => setPulseRate(e.target.value)}
              InputProps={{
                inputProps: {
                  min: 0,
                }
              }} />
            <TextField label="Temperature" fullWidth margin="normal" type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)}
              InputProps={{
                inputProps: {
                  min: 0,
                }
              }} />
            <TextField label="SPO2" fullWidth margin="normal" type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)}
              InputProps={{
                inputProps: {
                  min: 0,
                }
              }} />
            <TextField label="General Examination" fullWidth multiline rows={3} margin="normal" value={generalExamination} onChange={(e) => setGeneralExamination(e.target.value)} />
            <TextField label="Central Nervous System Examination" fullWidth multiline rows={3} margin="normal" value={cnsExamination} onChange={(e) => setCnsExamination(e.target.value)} />
            <TextField label="Cardiovascular System Examination" fullWidth multiline rows={3} margin="normal" value={cardiovascularExamination} onChange={(e) => setCardiovascularExamination(e.target.value)} />
            <TextField label="Respiratory System Examination" fullWidth multiline rows={3} margin="normal" value={respiratoryExamination} onChange={(e) => setRespiratoryExamination(e.target.value)} />
            <TextField label="Abdominal Examination" fullWidth multiline rows={3} margin="normal" value={abdominalExamination} onChange={(e) => setAbdominalExamination(e.target.value)} />
            <TextField label="Musculoskeletal Examination" fullWidth multiline rows={3} margin="normal" value={musculoskeletalExamination} onChange={(e) => setMusculoskeletalExamination(e.target.value)} />
            <TextField label="Urogenital Examination" fullWidth multiline rows={3} margin="normal" value={urogenitalExamination} onChange={(e) => setUrogenitalExamination(e.target.value)} />
            <TextField label="DRE/Vaginal Examination" fullWidth multiline rows={3} margin="normal" value={dreVaginalExamination} onChange={(e) => setDreVaginalExamination(e.target.value)} />
                   
            <FormControl fullWidth margin="normal">
              <InputLabel id="lab-attendant-label">Lab Attendant</InputLabel>
              <Select
                labelId="lab-attendant-label"
                value={labAttendant}
                label="Lab Attendant"
                onChange={(e) => setLabAttendant(e.target.value)}
              >
                {dummyLabUsers.map((user, index) => (
                  <MenuItem key={index} value={user}>{user}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Message to Lab Attendant" fullWidth multiline rows={3} margin="normal" value={messageToLabAttendant} onChange={(e) => setMessageToLabAttendant(e.target.value)} />

            {/* Dropdowns for pharmacy users and lab users */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="pharmacy-user-label">Pharmacy User</InputLabel>
              <Select
                labelId="pharmacy-user-label"
                value={labAttendant}
                label="Pharmacy User"
                onChange={(e) => setLabAttendant(e.target.value)}
              >
                {dummyPharmacyUsers.map((user, index) => (
                  <MenuItem key={index} value={user}>{user}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Pharmacy Referral Description" fullWidth multiline rows={3} margin="normal" value={referral} onChange={(e) => setReferral(e.target.value)} />
    
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
