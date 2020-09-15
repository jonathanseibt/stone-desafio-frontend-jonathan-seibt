import { green, grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  empty: {
    backgroundColor: grey[200],
  },
  buy: {
    borderLeftWidth: '15px',
    borderLeftColor: green[500],
    borderLeftStyle: 'solid',
  },
  sell: {
    borderLeftWidth: '15px',
    borderLeftColor: red[500],
    borderLeftStyle: 'solid',
  },
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
  },
}));

export default useStyles;
