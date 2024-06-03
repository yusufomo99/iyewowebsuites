import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
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
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    allDoctors = [],
  } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [appointmentUuid, setAppointmentUuid] = useState();

  const openModal = (customerName, condition, apptUuid) => {
    setPatientName(customerName);
    setPatientCondition(condition);
    setAppointmentUuid(apptUuid);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      {items && items.length ? (
        <>
          <AppointmentModal
            modalIsOpen={modalIsOpen}
            patientName={patientName}
            patientCondition={patientCondition}
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
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Medical Condition</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((customer) => {
                      const createdAt = format(new Date(customer?.created_at), 'dd/MM/yyyy');

                      return (
                        <TableRow
                          key={customer.id}
                          hover
                          style={{ cursor: 'pointer' }}
                          onClick={() => openModal(customer.patient.name, customer.description, customer.uuid)}
                        >
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Avatar src="" style={{ backgroundColor: '#009396' }}>
                                {getInitials(customer.patient?.name)}
                              </Avatar>
                              <Typography variant="subtitle2">{customer.patient?.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{customer.patient?.email}</TableCell>
                          <TableCell>{customer.description?.slice(0, 35)}...</TableCell>
                          <TableCell>{customer.patient?.phone}</TableCell>
                          <TableCell>{createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
          </Card>
        </>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          No Records
        </Typography>
      )}
      <Stack spacing={2} sx={{ mt: 2, background: 'white', justifyContent: 'center' }}>
        {/* <Pagination
          count={Math.ceil(count / rowsPerPage)}
          color="primary"
          page={page}
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
        /> */}
      </Stack>
    </>
  );
};

Appointmentstable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  allDoctors: PropTypes.array,
};
