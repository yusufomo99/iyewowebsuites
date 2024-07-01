import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays } from 'date-fns';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/fieldofficers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import CreateCHOModal from './CreateCHOModal';
import getCHOs from './getCHOs';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(now, 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  // ... more data
];

const useCustomers = (page, rowsPerPage, startDate, endDate) => {
  return useMemo(
    () => {
      const filteredData = data.filter((customer) => {
        const createdAt = new Date(customer.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
      return applyPagination(filteredData, page, rowsPerPage);
    },
    [page, rowsPerPage, startDate, endDate]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => customers.map((customer) => customer.id),
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(subDays(now, 30));
  const [endDate, setEndDate] = useState(now);
  const [searchQuery, setSearchQuery] = useState('');
  const customers = useCustomers(page, rowsPerPage, startDate, endDate);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    // getCHOs()
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearch = () => {
    // Implement search logic here
  };

  return (
    <>
      <Head>
        <title>Iyewo</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Field Officers</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* Import and Export buttons can be here */}
                </Stack>
              </Stack>
              <div>
                {/* Add button can be here */}
              </div>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CustomersSearch value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button 
                     variant="contained" style={{ backgroundColor: '#009396' }}
              onClick={handleSearch}>
                Search
              </Button>
            </Stack>
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
      <CreateCHOModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
