import { blue, green, grey, red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  more: {
    backgroundColor: grey[200],
  },
  up: {
    color: green[500],
  },
  down: {
    color: red[500],
  },
  main: {
    lineHeight: 1,
  },
}));

export const withStylesBuyButton = withStyles((theme) => ({
  root: {
    color: green[500],
    borderColor: green[500],
    backgroundColor: 'transparent',
    '&:hover': {
      color: 'white',
      borderColor: green[500],
      backgroundColor: green[500],
    },
  },
}));

export const withStylesSellButton = withStyles((theme) => ({
  root: {
    color: red[500],
    borderColor: red[500],
    backgroundColor: 'transparent',
    '&:hover': {
      color: 'white',
      borderColor: red[500],
      backgroundColor: red[500],
    },
  },
}));

export const withStylesSwapButton = withStyles((theme) => ({
  root: {
    color: blue[500],
    borderColor: blue[500],
    backgroundColor: 'transparent',
    '&:hover': {
      color: 'white',
      borderColor: blue[500],
      backgroundColor: blue[500],
    },
  },
}));

export default useStyles;
