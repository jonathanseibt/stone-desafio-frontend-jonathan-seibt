import { Avatar, Box, CardActionArea, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Constants from '../../Constants';
import { CryptoModel } from '../../Models/Crypto/Crypto.model';
import SessionStore from '../../Session.store';
import Format from '../../Utils/Format';
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

  const user = SessionStore.getUser();

  return (
    <Paper elevation={3} className={styles.background}>
      <Box padding={5} width={1} display='flex' justifyContent='space-between' marginBottom={3}>
        <Box display='flex' alignItems='center' width={1}>
          <Box width={1}>
            <Typography variant='h6' color='textSecondary' noWrap>
              Saldo atual
            </Typography>

            <Typography component='h2' variant='h4' className={styles.balance} noWrap>
              {Format.currency(user.wallet.balance, 2)}
            </Typography>
          </Box>
        </Box>

        <Hidden smDown>
          <Box paddingBottom={1} width={1} textAlign='right'>
            <Typography align='right' variant='caption' color='textSecondary' noWrap>
              Olá,
            </Typography>
            <Typography align='right' variant='h5' color='textSecondary' noWrap>
              {user.name}
            </Typography>
          </Box>
        </Hidden>
      </Box>
    </Paper>
  );
});

const Cryptos: React.FC = observer(() => {
  const styles = useStyles();

  const cryptos = _.sortBy(SessionStore.getUser().wallet.cryptos, ['name']);

  return (
    <>
      {!!cryptos.length && (
        <Typography variant='h6' color='textSecondary' noWrap>
          Meus ativos
        </Typography>
      )}

      <Box marginTop={2} marginBottom={2}>
        <Grid container spacing={3}>
          {cryptos.map((row, index) => {
            const crypto = CryptoModel.findByAcronym(row.acronym) ?? new CryptoModel();

            return (
              <Grid key={index} item xs={12} lg={4}>
                <Paper elevation={3} style={{ background: crypto.backgroundStyle }}>
                  <Box padding={5} display='flex' justifyContent='space-between' overflow='auto'>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={`${Constants.PATH_IMAGES}/${crypto.icon}`} className={styles.avatar} />

                      <Box paddingX={2} alignSelf='center'>
                        <Typography variant='h6' color='textPrimary'>
                          {crypto.acronym}
                        </Typography>
                        <Typography variant='button' color='textSecondary'>
                          {crypto.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box paddingX={2} alignSelf='center' textAlign='end'>
                      <Typography variant='h6' color='textPrimary'>
                        {Format.decimal(row.balance)}
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

  const cryptos = SessionStore.getUser().wallet.cryptos;

  const color = !!cryptos.length ? 'textSecondary' : 'secondary';
  const text = !!cryptos.length ? 'Ver mais...' : 'Negociar agora!';

  const onClickMore = () => {
    history.push(TRADE_VIEW_URL);
  };

  return (
    <Grid item xs={12} lg={!!cryptos.length ? 4 : 12}>
      <Box borderRadius={4} component={CardActionArea} onClick={onClickMore}>
        <Box padding={5} className={styles.more} display='flex' alignItems='center'>
          <AvatarGroup max={4}>
            <Avatar src={`${Constants.PATH_IMAGES}/bitcoin.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/brita.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/ethereum.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/tether.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/litecoin.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/xrp.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/binance.png`} />
          </AvatarGroup>

          <Box paddingX={2} alignSelf='center'>
            {!cryptos.length && (
              <Typography variant='h6' color='textPrimary'>
                Nenhum ativo na sua carteira ainda?
              </Typography>
            )}

            <Box paddingTop={1 / 2}>
              <Typography variant='button' color={color}>
                {text}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
});

export default WalletView;
