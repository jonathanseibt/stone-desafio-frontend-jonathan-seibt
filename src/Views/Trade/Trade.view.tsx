import { Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { SwapVertOutlined, SyncOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import BrowserStore from '../../Browser.store';
import { UserWalletCryptoModel } from '../../Models/User/Wallet/Crypto/UserWalletCrypto.model';
import SessionStore from '../../Session.store';
import BuyDialog from './Buy/Buy.dialog';
import BuyDialogStore from './Buy/Buy.dialog.store';
import SellDialog from './Sell/Sell.dialog';
import SellDialogStore from './Sell/Sell.dialog.store';
import SwapDialog from './Swap/Swap.dialog';
import SwapDialogStore from './Swap/Swap.dialog.store';
import TradeStore from './Trade.store';
import useStyles, { withStylesBuyButton, withStylesSellButton, withStylesSwapButton } from './Trade.styles';

export const URL = '/negociar';
export const TITLE = 'Negociar';
export const SUBTITLE = 'Aqui você pode comprar, vender e trocar ativos';

const TradeView: React.FC = observer(() => {
  return (
    <>
      <View />
      <BuyDialog />
      <SellDialog />
      <SwapDialog />
    </>
  );
});

const View: React.FC = observer(() => {
  const onClickSync = () => {
    TradeStore.sync();
  };

  return (
    <Paper elevation={3}>
      <Box display='flex' justifyContent='space-between' alignItems='center' padding={2}>
        <Box alignSelf='center'>
          <Typography component='h2' variant='h5'>
            {TITLE}
          </Typography>
          <Typography variant='subtitle1'>{SUBTITLE}</Typography>
        </Box>

        <IconButton onClick={onClickSync}>
          <SyncOutlined fontSize='small' />
        </IconButton>
      </Box>

      <Box marginBottom={3}>
        <List />
      </Box>
    </Paper>
  );
});

const List: React.FC = observer(() => {
  const styles = useStyles();

  const BuyButton = withStylesBuyButton(Button);
  const SellButton = withStylesSellButton(Button);
  const SwapButton = withStylesSwapButton(Button);

  const onClickBuy = () => {
    BuyDialogStore.open();
  };

  const onClickSell = () => {
    SellDialogStore.open();
  };

  const onClickSwap = () => {
    SwapDialogStore.open();
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader />

        <TableBody>
          {!BrowserStore.cryptos.length ? (
            <TableEmpty />
          ) : (
            <>
              {_.sortBy(BrowserStore.cryptos, ['name']).map((row, index) => {
                const icon = `/assets/img/${row.icon}`;
                const priceBuy = row.priceBuy.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                const priceSell = row.priceSell.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                const balanceQuantity = SessionStore.getUser()
                  .wallet.cryptos.find((crypto) => (crypto._crypto = row.id))
                  ?.quantity.toLocaleString('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 8,
                  });
                const balanceValue = UserWalletCryptoModel.getBalance(
                  SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = row.id)) ?? new UserWalletCryptoModel(),
                ).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                });

                return (
                  <TableRow key={index} style={{ background: row.backgroundStyle }}>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <Avatar src={icon} />

                        <Box paddingX={2} alignSelf='center'>
                          <Typography variant='h6' color='textPrimary'>
                            {row.acronym}
                          </Typography>
                          <Typography variant='button' color='textSecondary'>
                            {row.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography variant='h6' align='right' className={styles.buy}>
                        {priceBuy}
                      </Typography>
                      <Typography variant='caption' className={row.priceBuy > row.lastPriceBuy ? styles.up : styles.down}>
                        {row.priceBuy > row.lastPriceBuy ? 'subiu' : 'caiu'}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography variant='h6' align='right' className={styles.sell}>
                        {priceSell}
                      </Typography>
                      <Typography variant='caption' className={row.priceSell > row.lastPriceSell ? styles.up : styles.down}>
                        {row.priceSell > row.lastPriceSell ? 'subiu' : 'caiu'}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography variant='h6' color='textPrimary' align='right'>
                        {balanceQuantity}
                      </Typography>
                      <Typography variant='button' color='textSecondary' align='right'>
                        {balanceValue}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <BuyButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={onClickBuy}>
                        Comprar
                      </BuyButton>
                    </TableCell>

                    <TableCell align='right' padding='none'>
                      <SellButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignTopOutlined />} onClick={onClickSell}>
                        Vender
                      </SellButton>
                    </TableCell>

                    <TableCell align='right'>
                      <SwapButton fullWidth size='large' variant='outlined' startIcon={<SwapVertOutlined />} onClick={onClickSwap}>
                        Trocar
                      </SwapButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableFooter />
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const TableHeader: React.FC = observer(() => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography noWrap variant='inherit'>
            Nome do ativo
          </Typography>
        </TableCell>

        <TableCell width={1} align='right'>
          <Typography noWrap variant='inherit'>
            Preço de compra
          </Typography>
        </TableCell>

        <TableCell width={1} align='right'>
          <Typography noWrap variant='inherit'>
            Preço de venda
          </Typography>
        </TableCell>

        <TableCell width={1} align='right'>
          <Typography noWrap variant='inherit'>
            Minha carteira
          </Typography>
        </TableCell>

        <TableCell width={1} />
        <TableCell width={1} />
        <TableCell width={1} />
      </TableRow>
    </TableHead>
  );
});

const TableFooter: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <TableRow className={styles.more}>
      <TableCell colSpan={7}>
        <Box display='flex' alignItems='center'>
          <AvatarGroup max={4}>
            <Avatar src='/assets/img/ethereum.png' />
            <Avatar src='/assets/img/tether.png' />
            <Avatar src='/assets/img/litecoin.png' />
            <Avatar src='/assets/img/xrp.png' />
            <Avatar src='/assets/img/binance.png' />
          </AvatarGroup>

          <Box paddingX={2} alignSelf='center'>
            <Typography variant='button' color='textSecondary'>
              Mais em breve!
            </Typography>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
});

const TableEmpty: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <TableRow className={styles.empty}>
      <TableCell colSpan={7}>
        <Box display='flex' alignItems='center'>
          <Box paddingX={2} alignSelf='center' width={1} textAlign='center'>
            <Typography variant='button' color='textSecondary'>
              Nenhum registro encontrado
            </Typography>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
});

export default TradeView;
