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
import AppointmentModal from '../../pages/vitalsModal';

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
  const [apptUuid,setUuid] = useState('');

  const openModal = (uuid) => {
    setUuid(uuid)
    setModalIsOpen(true)
  
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <AppointmentModal
        showModal={modalIsOpen}
        // patientName={patientName}
        // patientCondition={patientCondition}
        // doctorOnDuty={doctorOnDuty}
        closeModal={closeModal}
        apptUuid={apptUuid}
      />

      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
          <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
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
                  </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>MEDICAL CONDITION</TableCell> */}
                  <TableCell>Phone</TableCell>
                  <TableCell>Wallet Balance </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={customer.id} selected={isSelected}>
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
                            }
                          }}
                        />
                      </TableCell> */}
                      <TableCell onClick={()=>{openModal( customer.patient.uuid)}}>
                        <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src='' style={{ backgroundColor: '#009396'}}>{getInitials(customer.patient.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.patient.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.patient.email}</TableCell>
                      {/* <TableCell>
                        {customer.condition}
                      </TableCell> */}
                      <TableCell>{customer.patient.phone}</TableCell>
                      <TableCell>{customer.patient.wallet_balance}</TableCell>
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
