import { useCallback, useMemo, useState , useEffect} from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import getAllUsers from './getAllUsersAPI'

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const [allUsers,setloadAllUsers] = useState([])

  const loadAllUsers = (data)=>{
    setloadAllUsers(data)
  }
useEffect(()=>{
  getAllUsers(loadAllUsers)
  
},[])
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Patients" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Phone No.
                </TableCell>
                <TableCell>
                  Patient
                </TableCell>
                <TableCell sortDirection="desc">
                  Balance
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((order) => {
                // const createdAt = format(order.created_at, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.phone}
                    </TableCell>
                    <TableCell>
                      {order.name}
                    </TableCell>
                    <TableCell>
                      {order.wallet_balance}
                    </TableCell>
                    <TableCell>
                    {order.created_at}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

// OverviewLatestOrders.prototype = {

//   sx: PropTypes.object
// };
