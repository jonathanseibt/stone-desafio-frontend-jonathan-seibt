import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBuy: {
    borderLeftWidth: '15px',
    borderLeftColor: green[500],
    borderLeftStyle: 'solid',
  },
  rowSell: {
    borderLeftWidth: '15px',
    borderLeftColor: red[500],
    borderLeftStyle: 'solid',
  },
  textBuy: {
    color: green[500],
  },
  textSell: {
    color: red[500],
  },
}));

export default useStyles;
