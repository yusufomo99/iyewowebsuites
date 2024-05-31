import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import ResetPassword from './ResetPassword'

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const [staffName, setstaffName] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
useEffect(()=>{

  // Retrieve user details from local storage
const storedUserDetails = localStorage.getItem('user_details');

// Parse the user details if they exist
const user = storedUserDetails ? JSON.parse(storedUserDetails) : null;

// Now 'user' contains the parsed user details
setstaffName(user?.name)
},[])
  

  const handleSignOut = useCallback(
    () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_details');
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >

<div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Reset Password Modal
      </Button> */}
      <ResetPassword open={isModalOpen} onClose={handleClose} />
    </div>
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        
        <Typography
          color="text.secondary"
          variant="body2"
        >
        {staffName}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
      <MenuItem variant="overline"
        onClick={handleOpen}
        >
       Reset Password 
        </MenuItem>
</Box>
<Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
