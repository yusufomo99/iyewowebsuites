import React, { useState } from 'react';
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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import ManagePatients from '../../pages/ManagePatients';
import approveDepositAPI from './approveDepositAPI' ;
import DepositModal from './DepositModal';
export const CustomersTable = (props) => {
  const {
    count = 0,
    items1 = [],
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
    getDepositsAPI
  } = props;

  const [isManagePatientsOpen, setIsManagePatientsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [depositUuid, setdepositUuid] = useState('');
  const handleManagePatientsOpen = (patient) => {
    setSelectedPatient(patient);
    setIsManagePatientsOpen(true);
  };

  const handleManagePatientsClose = () => {
    setIsManagePatientsOpen(false);
    setSelectedPatient(null);
  };


  const closeModal = ()=>{

    setisModalOpen(false)
  }
  const approvalSuccess = ()=>{

    setisModalOpen(true)
  }

  const callApproveDepositAPI = (uuid) => {
    approvalSuccess()
    setdepositUuid(uuid)
    //  approveDepositAPI(uuid, approvalSuccess)
  }


  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
         <ManagePatients
                  isOpen={isManagePatientsOpen}
                  onClose={handleManagePatientsClose}
                  patientData={selectedPatient}
                />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>

        <DepositModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        depositUuid={depositUuid}
        getDepositsAPI={getDepositsAPI}
        />

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
                <TableCell>
                  CHO
                </TableCell>
                <TableCell>
                  Patient
                </TableCell>
                <TableCell>
                Amount
                </TableCell>
                <TableCell>
                Date
                </TableCell>
                <TableCell>
             Action
                </TableCell>
                {/* <TableCell>
                  Signed Up
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items1.map((customer) => {
                const isSelected = selected.includes(customer.id);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (

               
                
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
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
                    <TableCell
                  
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                                    <Avatar src='' style={{ backgroundColor: '#009396'}}>
                          {getInitials(customer.cho.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.cho.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.user.name}
                    </TableCell>
                    <TableCell>
                      {customer.amount}
                    </TableCell>
                    <TableCell>
                    {customer.created_at}
                    </TableCell>
                    <TableCell>
                 <button
  style={{ backgroundColor: '#009396', color: '#fff', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
  onClick={() => {
    callApproveDepositAPI(customer.uuid)
  }}
>
  Approve
</button>
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
  selected: PropTypes.array
};
