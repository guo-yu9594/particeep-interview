import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3c00ff',
    },
    secondary: {
      main: '#9386ba',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
        },
      },
    },
  },
});

const ListPagination = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Pagination color="primary" className="ListPagination" count={3} />
    </ThemeProvider>
  );
};

export default ListPagination;
