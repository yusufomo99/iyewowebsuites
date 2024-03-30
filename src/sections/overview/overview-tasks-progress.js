import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

export const OverviewTasksProgress = (props) => {
  const { value, sx,labTotal } = props;


  function formatNaira(value) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);
  }

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
            Wallet Balance
            </Typography>
            <Typography variant="h6" style={{color:'#009396', fontWeight:'bold'}}>
            {labTotal ? formatNaira(labTotal) : ''}

            </Typography>
          </Stack>
          <img src="/assets/logos/TOTALLABTEST.svg" style={{width:'53px', height:'53px'}} alt="TOTAL LAB TEST" />
      
          {/* <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar> */}
        </Stack>
        {/* <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
