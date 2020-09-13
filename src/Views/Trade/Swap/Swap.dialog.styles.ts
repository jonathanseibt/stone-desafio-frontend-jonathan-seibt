import { blue } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export const withStylesSwapButton = withStyles((theme) => ({
  root: {
    color: 'white',
    borderColor: blue[500],
    backgroundColor: blue[500],
    '&:hover': {
      color: 'white',
      borderColor: blue[700],
      backgroundColor: blue[700],
    },
  },
}));

export default useStyles;
