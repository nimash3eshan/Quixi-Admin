import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    // set an immage path to https://i.ibb.co/7t7vPh3/logo.png
    <img src="https://i.ibb.co/7t7vPh3/logo.png" alt="logo" height={50} width={50}/>
  );
};
