import React from 'react';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import CalendarIcon from '@heroicons/react/24/solid/CalendarIcon';
import MagnifyingGlassPlusIcon from '@heroicons/react/24/solid/MagnifyingGlassPlusIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import { SvgIcon } from '@mui/material';

// Function to get items based on user type
export const getItems = (userType) => {



  if (userType === 'Admin') {
    return [


      {
        title: 'Overview',
        path: '/',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      },

      

      
    
      {
        title: 'Add User',
        path: '/AddUser',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },

      {
        title: 'Health Desk',
        path: '/healthdesk',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },

      
    
      {
        title: 'Manage Patients',
        path: '/doctors',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },

{
        title: 'Nurse',
        path: '/nurse',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Manage All Users',
        path: '/manageUsers',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },
      
      {
        title: 'Manage Finance',
        path: '/ManageFinance',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Appointments',
        path: '/Appointments',
        icon: (
          <SvgIcon fontSize="small">
            <CalendarIcon />
          </SvgIcon>
        )
      },
    
      {
        title: 'Laboratory',
        path: '/laboratory',
        icon: (
          <SvgIcon fontSize="small">
            <MagnifyingGlassPlusIcon />
          </SvgIcon>
        )
      },

      
      
      {
        title: 'Manage CHO',
        path: '/ManageCHO',
        icon: (
          <SvgIcon fontSize="small">
            <UserCircleIcon />
          </SvgIcon>
        )
      },
      // {
      //   title: 'Account',
      //   path: '/account',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <UserIcon />
      //     </SvgIcon>
      //   )
      // },
      // {
      //   title: 'Settings',
      //   path: '/settings',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <CogIcon />
      //     </SvgIcon>
      //   )
      // },
    
    ];
  }else if(userType === 'doctor') {

    return [{
      title: 'Manage Patients',
      path: '/doctors',
      icon: (
        <SvgIcon fontSize="small">
          <UserCircleIcon />
        </SvgIcon>
      )
    },];
  }else if(userType === 'lab') {

    return [{
      title: 'Laboratory',
      path: '/laboratory',
      icon: (
        <SvgIcon fontSize="small">
          <MagnifyingGlassPlusIcon />
        </SvgIcon>
      )},];
  }else if(userType === 'nurse') {

    return [{
      title: 'Nurse',
      path: '/nurse',
      icon: (
        <SvgIcon fontSize="small">
          <UserCircleIcon />
        </SvgIcon>
      )
    },

    
    {
      title: 'Appointments',
      path: '/Appointments',
      icon: (
        <SvgIcon fontSize="small">
          <CalendarIcon />
        </SvgIcon>
      )
    },
  
  ];
  }else if(userType === 'finance') {

    return [{
      title: 'Manage Finance',
      path: '/ManageFinance',
      icon: (
        <SvgIcon fontSize="small">
          <UserCircleIcon />
        </SvgIcon>
      )
    },];
  }else if(userType === 'hdo') {

    return [{
      title: 'Health Desk ',
      path: '/healthdesk',
      icon: (
        <SvgIcon fontSize="small">
          <UserCircleIcon />
        </SvgIcon>
      )
    },

    
    {
      title: 'Appointments',
      path: '/Appointments',
      icon: (
        <SvgIcon fontSize="small">
          <CalendarIcon />
        </SvgIcon>
      )
    },
  
  ];
  }

  // Return an empty array or some other default if the user type doesn't match
  return [];
};
