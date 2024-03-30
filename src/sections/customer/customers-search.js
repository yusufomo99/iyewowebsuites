import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ handleSearchChange, searchQuery }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue={searchQuery} // Use value or defaultValue to control the input
      fullWidth
      placeholder="Search patient"
      onChange={handleSearchChange} // Event handler for input changes
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);




// import TextField from '@mui/material/TextField';
// // import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';

// const CustomersSearch = ({handleSearchChange,searchQuery}) => {


//   return (
//     <TextField
//       label="Search"
//       variant="outlined"
//       fullWidth
//       value={searchQuery}
//       onChange={handleSearchChange}
      
    
//     />
//   );
// };

// export default CustomersSearch;

