import { createMuiTheme } from '@material-ui/core/styles';
import { AvatarGroupClassKey } from '@material-ui/lab/AvatarGroup';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiAvatarGroup: AvatarGroupClassKey;
  }
}

const Theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: 'white',
      },
    },
    MuiAvatarGroup: {
      avatar: {
        border: 0,
      },
    },
    MuiAvatar: {
      root: {
        width: '44px',
        height: '44px',
      },
    },
  },
});

export default Theme;
