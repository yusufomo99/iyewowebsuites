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
  Pagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import AppointmentModal from '../../pages/AppointmentModal';

export const Appointmentstable = (props) => {
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
    allDoctors =[],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [doctorOnDuty, setDoctorOnDuty] = useState('');
  const [appointmentUuid, setappointmentUuid] = useState();

 

  const openModal = (customerName,condition,apptUuid) => {
    setPatientName(customerName);
    setPatientCondition(condition)
    setappointmentUuid(apptUuid)
    setModalIsOpen(true)
  
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      {items && items?.length ? (
        <>
          <AppointmentModal
            modalIsOpen={modalIsOpen}
            patientName={patientName}
            patientCondition={patientCondition}
            doctorOnDuty={doctorOnDuty}
            closeModal={closeModal}
            allDoctors={allDoctors}
            appointmentUuid={appointmentUuid}
          />
  
          <Card>
            <Scrollbar>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAll}
                          indeterminate={selectedSome}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectAll?.();
                            } else {
                              onDeselectAll?.();
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>MEDICAL CONDITION</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((customer) => {
                      const isSelected = selected.includes(customer.id);
                      const createdAt = format(new Date(customer?.created_at), 'dd/MM/yyyy');
  
                      return (
                        <TableRow hover key={customer.id} selected={isSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  onSelectOne?.(customer?.patient.uuid);
                                } else {
                                  onDeselectOne?.(customer?.patient.uuid);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell onClick={() => openModal(customer.patient.name, customer.description, customer.uuid)}>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Avatar src='' style={{ backgroundColor: '#009396'}}>
                                {getInitials(customer.patient?.name)}
                              </Avatar>
                              <Typography variant="subtitle2">{customer.patient?.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{customer.patient?.email}</TableCell>
                          <TableCell>{customer.description?.slice(0,35)}...</TableCell>
                          <TableCell>{customer.patient?.phone}</TableCell>
                          <TableCell>{createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>

       
            {/* <Pagination
              component="div"
              count={Math.ceil(count/10)}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            /> */}
          </Card>
        </>
      ) : (
        <p style={{ fontSize: '1.5rem', textAlign: 'center',justifyContent: 'flex-end' }}>Loading...</p>
      )}
        {/* <Stack spacing={2} style={{ background: 'white', justifyContent: 'flex-end' }}>
      <Pagination 
        count={Math.ceil(count / 10)} 
        color="primary" 
        onChange={onPageChange}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#009396',
          },
          '& .Mui-selected': {
            backgroundColor: '#009396',
            color: 'white',
          },
        }}
      />
    </Stack> */}
    </>
  );
  
};

Appointmentstable.propTypes = {
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
