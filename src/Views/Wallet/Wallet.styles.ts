import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Constants from '../../Constants';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Constants.PATH_IMAGES}/wallet-background.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  avatar: {
    width: '56px',
    height: '56px',
  },
  more: {
    height: '136px',
    display: 'flex',
  },
  balance: {
    fontWeight: 'bold',
    color: green[500],
  },
}));

export default useStyles;
