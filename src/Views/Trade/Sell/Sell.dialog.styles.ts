import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export const withStylesSellButton = withStyles((theme) => ({
  root: {
    color: 'white',
    borderColor: red[500],
    backgroundColor: red[500],
    '&:hover': {
      color: 'white',
      borderColor: red[700],
      backgroundColor: red[700],
    },
  },
}));

export default useStyles;
