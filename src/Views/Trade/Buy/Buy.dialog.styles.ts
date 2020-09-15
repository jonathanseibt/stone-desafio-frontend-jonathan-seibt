import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

export const withStylesBuyButton = withStyles((theme) => ({
  root: {
    color: 'white',
    borderColor: green[500],
    backgroundColor: green[500],
    '&:hover': {
      color: 'white',
      borderColor: green[700],
      backgroundColor: green[700],
    },
  },
}));
