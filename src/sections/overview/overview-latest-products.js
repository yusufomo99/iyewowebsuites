import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import getApprovedAppointments from '../../pages/getApprovedappt'

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
const [approvedApptData,setapprovedApptData] = useState([]);

const loadApprovedApptData = (data)=>{
  setapprovedApptData(data)
}

  useEffect(()=>{
    getApprovedAppointments(loadApprovedApptData)

  },[])
  return (
    <Card sx={sx}>
      <CardHeader title="Approved Appointments" />
      <small style={{padding:'10px'}}>Doctor's waiting list</small>
      <List> 
        {approvedApptData?.map((product, index) => {
          const hasDivider = index < products.length - 1;
          // const ago = formatDistanceToNow(product.patient.created_at);

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
             
              <ListItemText
                primary={product.patient.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={product.patient.created_at}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              
            </ListItem>
          );
        })}
      </List>
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

// OverviewLatestProducts.propTypes = {
 
//   sx: PropTypes.object
// };
