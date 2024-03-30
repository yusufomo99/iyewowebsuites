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
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import ManagePatients from '../../pages/ManagePatients';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
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

  
  const handleManagePatientsOpen = (patient,uuid,md,ld, description) => {
      setSelectedPatient(patient);
      setapptUuid(uuid)
      setmedicalRecords(md)
      setlabRecords(ld)
      setdescription(description)
      setIsManagePatientsOpen(true);
  };

  const handleManagePatientsClose = () => {
      setIsManagePatientsOpen(false);
      setSelectedPatient(null);
  };

  const openModal = (customerName,condition) => {
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
                />
            <Table>
              <TableHead>
                <TableRow>
                  
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>MEDICAL CONDITION</TableCell>
                  {/* <TableCell>Phone</TableCell> */}
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  // const createdAt = format(customer.created_at, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={customer.uuid} selected={isSelected}>
                     
                      <TableCell onClick={()=>handleManagePatientsOpen(
                        customer.patient.name,
                        customer.uuid,
                        customer.medical_records,
                        customer.lab_records,
                        customer.description 
                        )
                        }>
                        <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src='' style={{ backgroundColor: '#009396'}}>{getInitials(customer.doctor.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.patient.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.doctor.email}</TableCell>
                      <TableCell>
                        {customer.description ? customer.description : 'NA'}
                      </TableCell>
                      {/* <TableCell>{createdAt}</TableCell> */}
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
