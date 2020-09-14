import { Avatar, Box, CardActionArea, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CryptoModel } from '../../Models/Crypto/Crypto.model';
import { UserWalletCryptoModel } from '../../Models/User/Wallet/Crypto/UserWalletCrypto.model';
import { UserWalletModel } from '../../Models/User/Wallet/UserWallet.model';
import SessionStore from '../../Session.store';
import { URL as TRADE_VIEW_URL } from '../Trade/Trade.view';
import useStyles from './Wallet.styles';

export const URL = '/carteira';
export const TITLE = 'Carteira';

const WalletView: React.FC = observer(() => {
  return (
    <>
      <Header />
      <Cryptos />
    </>
  );
});

const Header: React.FC = observer(() => {
  const styles = useStyles();

  const balance = SessionStore.getUser().wallet.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  const cryptoBalance = UserWalletModel.getCryptoBalance(SessionStore.getUser().wallet).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

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
                {cryptoBalance}
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
              {SessionStore.getUser().name}
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
      {!!SessionStore.getUser().wallet.cryptos.length && (
        <Typography variant='h6' color='textSecondary' noWrap>
          Meus ativos
        </Typography>
      )}

      <Box marginTop={2} marginBottom={2}>
        <Grid container spacing={3}>
          {SessionStore.getUser().wallet.cryptos.map((row, index) => {
            const icon = `/assets/img/${CryptoModel.findByID(row._crypto)?.icon}`;
            const quantity = row.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
            const balance = UserWalletCryptoModel.getBalance(row).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

            return (
              <Grid key={index} item xs={12} lg={4}>
                <Paper elevation={3} style={{ background: CryptoModel.findByID(row._crypto)?.backgroundStyle }}>
                  <Box padding={5} display='flex' justifyContent='space-between' overflow='auto'>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={icon} className={styles.avatar} />

                      <Box paddingX={2} alignSelf='center'>
                        <Typography variant='h6' color='textPrimary'>
                          {CryptoModel.findByID(row._crypto)?.acronym}
                        </Typography>
                        <Typography variant='button' color='textSecondary'>
                          {CryptoModel.findByID(row._crypto)?.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box paddingX={2} alignSelf='center' textAlign='end'>
                      <Typography variant='h6' color='textPrimary'>
                        {quantity}
                      </Typography>
                      <Typography variant='button' color='textSecondary'>
                        {balance}
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
  const history = useHistory();
  const styles = useStyles();

  const onClickMore = () => {
    history.push(TRADE_VIEW_URL);
  };

  return (
    <Grid item xs={12} lg={!!SessionStore.getUser().wallet.cryptos.length ? 4 : 12}>
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
            {!SessionStore.getUser().wallet.cryptos.length && (
              <Typography variant='h6' color='textPrimary'>
                Nenhum ativo na sua carteira ainda?
              </Typography>
            )}

            <Box paddingTop={1 / 2}>
              <Typography variant='button' color={!!SessionStore.getUser().wallet.cryptos.length ? 'textSecondary' : 'secondary'}>
                {!!SessionStore.getUser().wallet.cryptos.length ? 'Ver mais...' : 'Negociar agora!'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
});

export default WalletView;
