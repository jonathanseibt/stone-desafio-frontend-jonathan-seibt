import { Avatar, Box, CardActionArea, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import WalletStore from './Wallet.store';
import useStyles from './Wallet.styles';

export const URL = '/carteira';
export const TITLE = 'Carteira';
export const SUBTITLE = 'Bem-vindo, Jonathan!';

const WalletView: React.FC = observer(() => {
  useEffect(() => WalletStore.load());

  return (
    <>
      <Header />
      <Cryptos />
    </>
  );
});

const Header: React.FC = observer(() => {
  const styles = useStyles();
  const balance = WalletStore.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  const cryptos = WalletStore.cryptos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

  return (
    <Paper elevation={3} className={styles.background}>
      <Box padding={5} width={1} display='flex' justifyContent='space-between' marginBottom={3}>
        <Box display='flex' alignItems='center' width={1}>
          <Box width={1}>
            <Typography variant='h6' color='textSecondary' noWrap>
              Saldo atual
            </Typography>

            <Typography component='h2' variant='h4' className={styles.balance} noWrap>
              {balance}
            </Typography>

            <Box paddingTop={1}>
              <Typography variant='body2' color='textSecondary' noWrap>
                Saldo em criptoativos
              </Typography>
              <Typography variant='subtitle1' className={styles.balance} noWrap>
                {cryptos}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Hidden smDown>
          <Box paddingBottom={1} width={1} textAlign='right'>
            <Typography align='right' variant='caption' color='textSecondary' noWrap>
              Olá,
            </Typography>
            <Typography align='right' variant='h5' color='textSecondary' noWrap>
              Nome do usuário
            </Typography>
          </Box>
        </Hidden>
      </Box>
    </Paper>
  );
});

const Cryptos: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <>
      {!!WalletStore.data.length && (
        <Typography variant='h6' color='textSecondary' noWrap>
          Meus ativos
        </Typography>
      )}

      <Box marginTop={2} marginBottom={2}>
        <Grid container spacing={3}>
          {WalletStore.data.map((row, index) => {
            const icon = `/assets/img/${row.icon}`;
            const balanceQuantity = row.balance.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
            const balanceValue = row.balance.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

            return (
              <Grid key={index} item xs={12} lg={4}>
                <Paper elevation={3} style={{ background: row.background }}>
                  <Box padding={5} display='flex' justifyContent='space-between' overflow='auto'>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={icon} className={styles.avatar} />

                      <Box paddingX={2} alignSelf='center'>
                        <Typography variant='h6' color='textPrimary'>
                          {row.acronym}
                        </Typography>
                        <Typography variant='button' color='textSecondary'>
                          {row.coin}
                        </Typography>
                      </Box>
                    </Box>

                    <Box paddingX={2} alignSelf='center' textAlign='end'>
                      <Typography variant='h6' color='textPrimary'>
                        {balanceQuantity}
                      </Typography>
                      <Typography variant='button' color='textSecondary'>
                        {balanceValue}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}

          <SeeMore />
        </Grid>
      </Box>
    </>
  );
});

const SeeMore: React.FC = observer(() => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onClickMore = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  return (
    <Grid item xs={12} lg={!!WalletStore.data.length ? 4 : 12}>
      <Box borderRadius={4} component={CardActionArea} onClick={onClickMore}>
        <Box padding={5} className={styles.more} display='flex' alignItems='center'>
          <AvatarGroup max={4}>
            <Avatar src='/assets/img/bitcoin.png' />
            <Avatar src='/assets/img/brita.png' />
            <Avatar src='/assets/img/ethereum.png' />
            <Avatar src='/assets/img/tether.png' />
            <Avatar src='/assets/img/litecoin.png' />
            <Avatar src='/assets/img/xrp.png' />
            <Avatar src='/assets/img/binance.png' />
          </AvatarGroup>

          <Box paddingX={2} alignSelf='center'>
            {!WalletStore.data.length && (
              <Typography variant='h6' color='textPrimary'>
                Nenhum ativo na sua carteira ainda?
              </Typography>
            )}

            <Box paddingTop={1 / 2}>
              <Typography variant='button' color={!!WalletStore.data.length ? 'textSecondary' : 'secondary'}>
                {!!WalletStore.data.length ? 'Ver mais...' : 'Negociar agora!'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
});

export default WalletView;
