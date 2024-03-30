// pages/AddUser.js or components/AddUser.js

import React, { useState } from 'react';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import createAcct from './createAcct';

const Page = () => {
  const [type, setUserRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== password_confirmation) {
      alert("Passwords do not match.");
      return; // Stop the form submission
    }

    // Proceed with form submission if passwords match
    setLoading(true);
    createAcct({ type, name, phone, password, password_confirmation }, () => {
      setLoading(false);
      // Resetting user details after form submission
      setUserRole('');
      setName('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
      <FormControl>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={type}
          label="Role"
          onChange={(e) => setUserRole(e.target.value)}
        >
          <MenuItem value="nurse">Nurse</MenuItem>
          <MenuItem value="lab">Lab</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="cho">CHO</MenuItem>
          <MenuItem value="hdo">HDO</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="finance">Finance</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="name"
        label="Name"
    
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

<TextField
        id="phone"
        label="Phone"
     
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
  
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="confirm-password"
        label="Confirm Password"
        type="password"

        value={password_confirmation}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
     <Button disabled={loading} type="submit" variant="contained" style={{ backgroundColor: '#008889' }}>
        {loading ? '...Submitting' : 'Submit'}
      </Button>
    </form>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
