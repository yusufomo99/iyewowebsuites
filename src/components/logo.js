import { useTheme } from '@mui/material/styles';
import { ReactComponent as IyewoLogo } from '../../public/assets/logos/iyewoLogo.svg';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;
  

  return (
   
    <img src="/assets/logos/iyewoLogo.svg" alt="Iyewo Logo" />
  );
};

// function Logo() {
//   return (
//     <div>
//       <h1>My Page</h1>
//       <IyewoLogo />
//     </div>
//   );
// }

// export default Logo;

