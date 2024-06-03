// pages/AddUser.js or components/AddUser.js

import React, { useState } from 'react';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, Box, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import createAcct from './createAcct';

const Page = () => {
  const [type, setUserRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [staffnumber, setStaffnumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return; // Stop the form submission
    }

    // Proceed with form submission if passwords match
    setLoading(true);
    createAcct({ type, name, email, staffnumber, password, password_confirmation: passwordConfirmation }, () => {
      setLoading(false);
      // Resetting user details after form submission
      setUserRole('');
      setName('');
      setEmail('');
      setStaffnumber('');
      setPassword('');
      setConfirmPassword('');
    });

    
  };

  return (
    <>
      <Box sx={{ maxWidth: '500px', margin: 'auto', p: 4 }}>
        <Typography variant="h5" mb={2}>
          Create New User Account
        </Typography>
        <Typography variant="body2" mb={2}>
          <strong>NOTE:</strong> Account creation for Staff and CHO officers is managed here. Patient account creation, on the other hand, is handled through the CHO Mobile App, which is optimized for mobile use. The mobile app also supports features such as wallet funding, appointment creation for patients, and more.
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={type}
              label="Role"
              onChange={(e) => setUserRole(e.target.value)}
              required
            >
              <MenuItem value="nurse">Nurse</MenuItem>
              <MenuItem value="lab">Lab</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="cho">CHO</MenuItem>
              <MenuItem value="hdo">Health Desk Officer</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="pharmacy">Pharmacy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <Typography variant="body2">
            An email address is required as the login for staff. This ensures that they receive notifications via email whenever a task is assigned to them.
          </Typography>
          <TextField
            id="email"
            label="Email: Username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <Typography variant="body2">
            Password should be at least 8 digits.
          </Typography>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="staffnumber"
            label="Staff Number"
            value={staffnumber}
            onChange={(e) => setStaffnumber(e.target.value)}
            fullWidth
       
          />
          <Button disabled={loading} type="submit" variant="contained" style={{ backgroundColor: '#008889' }}>
            {loading ? '...Submitting' : 'Submit'}
          </Button>
        </form>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
