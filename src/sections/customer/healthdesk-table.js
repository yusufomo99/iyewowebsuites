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
  Button,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import AppointmentModal from '../../pages/vitalsModal';
import HealthDeskModal from './healthdeskModal';
import UserCrud from './userCrud'

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
  const [healthData,sethealthData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
const [pisModalOpen,setpisModalOpen]  = useState(false);

  const phandleOpen = () => {
    setpisModalOpen(true);
  };

  const phandleClose = () => {
    setpisModalOpen(false);
  };

  const handleOpen = (customer) =>{
   
    sethealthData(customer)
    setOpenModal(true)
  };
  const handleClose = () => setOpenModal(false);

 
 


  return (
    <>
        <HealthDeskModal open={openModal} onClose={handleClose} data={healthData} />
        <UserCrud open={pisModalOpen} onClose={phandleClose} />
      <Card>

    
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                 
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>MEDICAL CONDITION</TableCell> */}
                  <TableCell>Phone</TableCell>
                  <TableCell>Wallet Balance </TableCell>
                  {/* <TableCell>Action </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                   
                   
                    
                    >
                    
                      <TableCell
                   style={{cursor:'pointer'}}
                   onClick={()=>{handleOpen(customer)}}
                   hover key={customer.id} selected={isSelected}
                    //    onClick={()=>{openModal( customer.uuid)}}
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src='' style={{ backgroundColor: '#009396'}}>{getInitials(customer.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell
                                         style={{cursor:'pointer'}}
                                         onClick={()=>{handleOpen(customer)}}
                                         hover key={customer.id} selected={isSelected}
                      >{customer.email}</TableCell>
                      {/* <TableCell>
                        {customer.condition}
                      </TableCell> */}
                      <TableCell
                                         style={{cursor:'pointer'}}
                                         onClick={()=>{handleOpen(customer)}}
                                         hover key={customer.id} selected={isSelected}
                      >{customer.phone}</TableCell>
                      <TableCell
                      
                      style={{cursor:'pointer'}}
                      onClick={()=>{handleOpen(customer)}}
                      hover key={customer.id} selected={isSelected}
                      >{customer.wallet_balance}</TableCell>
                      {/* <Button variant="contained" onClick={phandleOpen} color="primary">Manage</Button> */}
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
