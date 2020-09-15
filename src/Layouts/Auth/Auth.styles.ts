import { makeStyles } from '@material-ui/core/styles';
import Constants from '../../Constants';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Constants.PATH_IMAGES}/auth-background.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  name: {
    color: 'white',
  },
}));

export default useStyles;
