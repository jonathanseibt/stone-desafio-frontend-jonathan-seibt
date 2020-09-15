import { makeStyles } from '@material-ui/core/styles';
import Constants from '../../Constants';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Constants.PATH_IMAGES}/dashboard-background.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logoImage: {
    alignSelf: 'center',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  logoText: {
    marginTop: '1px',
    color: 'white',
  },
  menu: {
    color: 'white',
  },
  userImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  userText: {
    color: 'white',
  },
}));

export default useStyles;
