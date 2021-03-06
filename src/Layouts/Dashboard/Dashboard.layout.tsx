import { AppBar, Avatar, Box, Button, Container, Hidden, ListItemIcon, ListSubheader, MenuItem, MenuList, Popover, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import { ExitToAppOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import Constants from '../../Constants';
import SessionStore from '../../Session.store';
import { URL as HISTORY_VIEW_URL } from '../../Views/History/History.view';
import { URL as LOGIN_VIEW_URL } from '../../Views/Login/Login.view';
import { URL as TRADE_VIEW_URL } from '../../Views/Trade/Trade.view';
import { URL as WALLET_VIEW_URL } from '../../Views/Wallet/Wallet.view';
import DashboardStore from './Dashboard.store';
import useStyles from './Dashboard.styles';

interface Props {
  title: string;
  menu: number;
}

const DashboardLayout: React.FC<Props> = observer((props) => {
  DashboardStore.tab = props.menu;

  return (
    <>
      <Helmet>
        <title>{`${Constants.TITLE} | ${props.title}`}</title>
      </Helmet>

      <Navbar />

      <Content>{props.children}</Content>
    </>
  );
});

const Navbar: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <Box height='300px' className={styles.background}>
      <AppBar position='relative' color='transparent' elevation={0}>
        <Toolbar>
          <Box display='flex' paddingY={2} width={1} justifyContent='space-between'>
            <Box display='flex'>
              <NavbarLogo />
            </Box>

            <Hidden smDown>
              <Box display='flex'>
                <NavbarNavigation />
              </Box>
            </Hidden>

            <Box display='flex'>
              <NavbarMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Hidden mdUp>
        <Box display='flex' width={1} justifyContent='center'>
          <NavbarNavigation />
        </Box>
      </Hidden>
    </Box>
  );
});

const NavbarLogo: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <>
      <Avatar variant='square' src={`${Constants.PATH_IMAGES}/logo.png`} className={styles.logo} />

      <Box paddingX={1} alignSelf='center'>
        <Typography component='h1' variant='button' align='center' className={styles.name} noWrap>
          {Constants.TITLE}
        </Typography>
      </Box>
    </>
  );
});

const NavbarNavigation: React.FC = observer(() => {
  const history = useHistory();
  const styles = useStyles();

  const onChangeTab = (event: React.ChangeEvent<{}>, tab: number) => {
    DashboardStore.tab = tab;

    switch (tab) {
      case 0:
        history.push(WALLET_VIEW_URL);
        break;
      case 1:
        history.push(TRADE_VIEW_URL);
        break;
      case 2:
        history.push(HISTORY_VIEW_URL);
        break;
    }
  };

  return (
    <Box>
      <Tabs value={DashboardStore.tab} onChange={onChangeTab} className={styles.menu} indicatorColor='primary'>
        <Tab label='Carteira' />
        <Tab label='Negociar' />
        <Tab label='Histórico' />
      </Tabs>
    </Box>
  );
});

const NavbarMenu: React.FC = observer(() => {
  const history = useHistory();
  const styles = useStyles();

  const onClickMenu = (event: React.MouseEvent) => {
    DashboardStore.openMenu(event);
  };

  const onCloseMenu = () => {
    DashboardStore.closeMenu();
  };

  const onClickLogout = () => {
    DashboardStore.closeMenu();

    SessionStore.unauthenticate();

    history.push(LOGIN_VIEW_URL);
  };

  return (
    <>
      <Button onClick={onClickMenu}>
        <Box paddingX={1} marginTop='1px'>
          <Typography component='h3' variant='button' align='right' className={styles.user} noWrap>
            {SessionStore.getUser().name}
          </Typography>
        </Box>

        <Avatar src={`${Constants.PATH_IMAGES}/avatar.png`} className={styles.avatar} />
      </Button>

      <Popover
        open={Boolean(DashboardStore.menu)}
        anchorEl={DashboardStore.menu}
        onClose={onCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuList subheader={<ListSubheader>{SessionStore.getUser().email}</ListSubheader>}>
          <MenuItem onClick={onClickLogout}>
            <ListItemIcon>
              <ExitToAppOutlined fontSize='small' color='secondary' />
            </ListItemIcon>

            <Typography variant='inherit' color='secondary'>
              Sair
            </Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
});

const Content: React.FC = observer((props) => {
  return (
    <Box marginTop='-100px'>
      <Container component='main' maxWidth='lg'>
        <Box>{props.children}</Box>
      </Container>
    </Box>
  );
});

export default DashboardLayout;
