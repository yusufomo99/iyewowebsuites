import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (

<Box
    style={{backgroundColor:'#d9d9d9 !important'}}
      component="main"
      sx={{
        background: '#d9d9d9 !important',
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
  
        container
        sx={{ flex: '1 1 auto', backgroundColor: '#d9d9d9', }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
       
          xs={12}
          lg={6}
          sx={{
            marginTop:'-50px',
            alignItems: 'center',
            // background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            backgroundColor: 'white',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
       <Box
  sx={{
    // p: 3,
    // backgroundColor: '#d9d9d9', // Cool white background color
    // borderRadius: '12px', // Rounded edges
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Typography
    align="center"
    color="#009396"
    sx={{
      fontSize: '24px',
      lineHeight: '32px',
      mb: 1,
    }}
    variant="h3"
  >
    {/* Welcome to IYEWO */}
    <Box
      // component="a"
      sx={{ color: '#ECF0F1' }}
      target="_blank"
    >
    
    </Box>
  </Typography>
  <Typography
    align="center"
    sx={{ mb: 3 }}
    variant="subtitle1"
  >
    {/* A professional kit that comes with ready-to-use MUI components. */}
  </Typography>


     <img
    alt=""
    src="/assets/logos/img3.png"
    style={{ width: '710px'  }}
  /> 


</Box>

        </Grid>
      </Grid>
    </Box>

  );
};

Layout.prototypes = {
  children: PropTypes.node
};