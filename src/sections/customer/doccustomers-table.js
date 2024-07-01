import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  Button,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import ManagePatients from '../../pages/ManagePatients';
import ViewMedicalRecords from './ViewMedicalRecords';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [doctorOnDuty, setDoctorOnDuty] = useState('');

  const [isManagePatientsOpen, setIsManagePatientsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [apptUuid, setapptUuid] = useState(null);
  const [medicalRecords, setmedicalRecords] = useState()
  const [labRecords, setlabRecords] = useState()
  const [description, setdescription] = useState()
  const [patientRecord, setpatientRecord] = useState()
  const [created_at, setcreated_at] = useState()
  const [pharmacyRecord, setpharmacyRecord] = useState()

  
  const [isViewMedicalRecordsOpen, setViewMedicalRecordsOpen] = useState(false);
  const [selectedPatientData, setSelectedPatientData] = useState({});
  const [selectedMedicalRecords, setSelectedMedicalRecords] = useState({});

 

 

  const handleViewMedicalRecordsOpen = (customer) => {
    // setSelectedPatientData(newpatient);
    // setSelectedMedicalRecords(newmedicalRecords);
    setlabRecords(customer.lab_records)
    setSelectedPatientData(customer.patient);
    setSelectedMedicalRecords(customer.medical_records);
    // setlabRecords(customer.lab_records)
    setcreated_at(customer.created_at)
   setlabRecords(customer.lab_records)

    setViewMedicalRecordsOpen(true);
  };

  const handleViewMedicalRecordsClose = () => {
    setViewMedicalRecordsOpen(false);
  };


  const handleManagePatientsOpen = (patient, uuid, md, ld, description, patientRecord) => {
    setSelectedPatient(patient);
    setapptUuid(uuid)
    setmedicalRecords(md)
    setlabRecords(ld)
    setdescription(description)
    setIsManagePatientsOpen(true);
    setpatientRecord(patientRecord)

  };

  const handleManagePatientsClose = () => {
    setIsManagePatientsOpen(false);
    setSelectedPatient(null);
  };

  const openModal = (customerName, condition) => {
    setPatientName(customerName);
    setPatientCondition(condition)
    setModalIsOpen(true)

  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>


      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <ManagePatients
              isOpen={isManagePatientsOpen}
              onClose={handleManagePatientsClose}
              patientData={selectedPatient}
              apptUuid={apptUuid}
              description={description}
              patientRecord={patientRecord}
              labRecords={labRecords}
            />


      <ViewMedicalRecords
        open={isViewMedicalRecordsOpen}
        onClose={handleViewMedicalRecordsClose}
        patientData={selectedPatientData}
        medicalRecords={selectedMedicalRecords}
        labRecords = {labRecords}
        created_at={created_at}
      />
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>MEDICAL CONDITION</TableCell>
                  <TableCell>Systolic Blood Pressure</TableCell>
                  {/* <TableCell>MEDICAL CONDITION</TableCell> */}
                  <TableCell>Diastolic Blood Pressure</TableCell>
                  <TableCell>BMI </TableCell>
                  <TableCell>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  // const createdAt = format(customer.created_at, 'dd/MM/yyyy');

                  return (
                    <TableRow

                      hover
                      key={customer.uuid} selected={isSelected}


                    >

                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src='' style={{ backgroundColor: '#009396' }}>{getInitials(customer.doctor.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.patient.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >{customer.doctor.phone}</TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >
                        {customer.description ? customer.description : 'NA'}
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >{customer.patient.systolic_blood_pressure}</TableCell>
                      {/* <TableCell>
                        {customer.condition}
                      </TableCell> */}
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >{customer.patient.diastolic_blood_pressure}
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleManagePatientsOpen(
                          customer.patient.name,
                          customer.uuid,
                          customer.medical_records,
                          customer.lab_records,
                          customer.description,
                          customer.patient,

                        )
                        }
                      >{customer.patient.bmi}</TableCell>

                      <TableCell>
                      <div style={{ display: 'flex' }}>
  <button
    style={{
      backgroundColor: '#003396',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      marginRight: '10px'
    }}
    onClick={() =>
      handleManagePatientsOpen(
        customer.patient.name,
        customer.uuid,
        customer.medical_records,
        customer.lab_records,
        customer.description,
        customer.patient
      )
    }
  >
    Add Record
  </button>

  <button
    style={{
      backgroundColor: '#003396',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none'
    }}
    onClick={() => handleViewMedicalRecordsOpen(customer)}
  >
    View Record
  </button>
</div>

                      </TableCell>
                    </TableRow>



                  );
                })}
              </TableBody>

              {items?.length < 1 && <div>...Loading</div>}
            </Table>
          </Box>
        </Scrollbar>
        {/* <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
