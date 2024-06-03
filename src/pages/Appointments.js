import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Appointmentstable } from 'src/sections/customer/appointments-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import getPendingAppointments from './getPendingAppointments';
import getDoctorssAPI from './getDoctorssAPI';
import { useRouter } from 'next/navigation';

const now = new Date();

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.uuid);
    },
    [customers]
  );
};

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [choData, setchoData] = useState();
  const [allDoctors, setallDoctors] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchCHO = (fetchedData) => {
    setchoData(fetchedData);
  };

  const reloginContext = () => {
    router.push('/auth/login');
  };

  const fetchDoctors = (fetchedData) => {
    setallDoctors(fetchedData);
  };

  useEffect(() => {
    getPendingAppointments(fetchCHO, page, reloginContext, startDate, endDate);
  }, [page, startDate, endDate]);

  useEffect(() => {
    getDoctorssAPI(fetchDoctors);
  }, []);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else if (type === 'end') {
      setEndDate(value);
    }
  };

  const handleSearch = () => {

    setchoData([]);
    getPendingAppointments(fetchCHO, page, reloginContext,searchQuery, startDate, endDate);
  };

  return (
    <>
      <Head>
        <title>
          Iyewo
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Manage Appointments
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  {/* <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained" style={{ backgroundColor: '#009396'}} type="submit"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
         <CustomersSearch 
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginLeft: 2, marginRight: 2 }}
              />
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginLeft: 2, marginRight: 2 }}
              />
              <Button
                onClick={handleSearch}
                
                variant="contained"
                style={{ backgroundColor: '#009396' }}
              >
                Search
              </Button>
            </Stack>
            <Appointmentstable
              count={choData?.meta?.total}
              items={choData?.data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={choData?.meta?.per_page}
              allDoctors={allDoctors}
            />
          </Stack>
        </Container>
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
