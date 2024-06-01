import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';

const DeclineModal = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // Add logic for handling the decline reason
    console.log({ reason });
    // Call the onSubmit prop function with the reason
    onSubmit(reason);
    // Reset the reason field
    setReason('');
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Decline Reason
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Reason for Declining"
          type="text"
          fullWidth
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeclineModal;
