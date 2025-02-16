import Paper from '@mui/material/Paper';
import Searchbar from '../Serarchbar';

function Header() {
  return (
    <Paper elevation={2} className="mb-2 w-full justify-center py-4">
      <Searchbar />
    </Paper>
  );
}

export default Header;
