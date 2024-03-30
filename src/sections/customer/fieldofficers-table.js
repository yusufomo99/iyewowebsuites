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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import ManagePatients from '../../pages/ManagePatients';
import getCHOs from '../../pages/getCHOs';
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
    selected = []
  } = props;

  const [isManagePatientsOpen, setIsManagePatientsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [theCHOs, settheCHOs] = useState([]);

const fetchAllCHOs = (data)=>{
  settheCHOs(data)
}

  useEffect(()=>{
    getCHOs(fetchAllCHOs)
  },[])

  const handleManagePatientsOpen = (patient) => {
    setSelectedPatient(patient);
    setIsManagePatientsOpen(true);
  };

  const handleManagePatientsClose = () => {
    setIsManagePatientsOpen(false);
    setSelectedPatient(null);
  };


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
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  CHO I/Code
                </TableCell>
                <TableCell>
          Phone Verification
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theCHOs.map((customer) => {
                const isSelected = selected.includes(customer.id);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (

               
                
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    
                    <TableCell
                   
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                                     <Avatar src='' style={{ backgroundColor: '#009396'}}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      {customer.cho_identifier_code}
                    </TableCell>
                    <TableCell>
                    {customer.phone_verified==false ?'Unverified' : 'Verified'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
