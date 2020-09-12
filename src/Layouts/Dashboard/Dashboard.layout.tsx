import { AppBar, Avatar, Box, Button, Container, ListItemIcon, MenuItem, MenuList, Popover, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import { ExitToAppOutlined, PersonOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Constants from '../../Constants';
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

            <Box display='flex'>
              <NavbarNavigation />
            </Box>

            <Box display='flex'>
              <NavbarMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

const NavbarLogo: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <>
      <Avatar variant='square' src='/assets/img/logo.png' className={styles.logoImage} />

      <Box paddingX={1} alignSelf='center'>
        <Typography component='h1' variant='button' align='center' className={styles.logoText}>
          {Constants.TITLE}
        </Typography>
      </Box>
    </>
  );
});

const NavbarNavigation: React.FC = observer(() => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeTab = (event: React.ChangeEvent<{}>, tab: number) => {
    // DashboardStore.tab = tab;

    switch (DashboardStore.tab) {
      case 0:
        enqueueSnackbar('Em desenvolvimento...');
        break;
      case 1:
        enqueueSnackbar('Em desenvolvimento...');
        break;
      case 2:
        enqueueSnackbar('Em desenvolvimento...');
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
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onClickMenu = (event: React.MouseEvent) => {
    DashboardStore.openMenu(event);
  };

  const onCloseMenu = () => {
    DashboardStore.closeMenu();
  };

  const onClickProfile = () => {
    DashboardStore.closeMenu();
    enqueueSnackbar('Em desenvolvimento...');
  };

  const onClickLogout = () => {
    DashboardStore.closeMenu();
    enqueueSnackbar('Em desenvolvimento...');
  };

  return (
    <>
      <Button onClick={onClickMenu}>
        <Box paddingX={1} marginTop='1px'>
          <Typography component='h3' variant='button' align='center' className={styles.userText}>
            Nome do usuário
          </Typography>
        </Box>

        <Avatar src='/assets/img/avatar.png' className={styles.userImage} />
      </Button>

      <Popover
        open={Boolean(DashboardStore.menu)}
        anchorEl={DashboardStore.menu}
        onClose={onCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuList>
          <MenuItem onClick={onClickProfile}>
            <ListItemIcon>
              <PersonOutlined fontSize='small' />
            </ListItemIcon>

            <Typography variant='inherit'>Meu perfil</Typography>
          </MenuItem>

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
