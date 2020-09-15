import { Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { SwapVertOutlined, SyncOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import BrowserStore from '../../Browser.store';
import Constants from '../../Constants';
import SessionStore from '../../Session.store';
import Format from '../../Utils/Format';
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
export const SUBTITLE = 'Aqui você pode comprar, vender e trocar suas criptomoedas';

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

  const cryptos = _.sortBy(BrowserStore.cryptos, ['name']);

  const onClickBuy = (acronym: string) => {
    BuyDialogStore.open(acronym);
  };

  const onClickSell = (acronym: string) => {
    SellDialogStore.open(acronym);
  };

  const onClickSwap = (acronym: string) => {
    SwapDialogStore.open(acronym);
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader />

        <TableBody>
          {!cryptos.length ? (
            <TableEmpty />
          ) : (
            <>
              {cryptos.map((row, index) => {
                const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === row.acronym)?.balance ?? 0;
                const statusBuy = row.priceBuy > row.lastPriceBuy ? 'subiu' : 'caiu';
                const statusSell = row.priceSell > row.lastPriceSell ? 'subiu' : 'caiu';

                const classNameColorBuy = row.priceBuy > row.lastPriceBuy ? styles.up : styles.down;
                const classNameColorSell = row.priceSell > row.lastPriceSell ? styles.up : styles.down;

                return (
                  <TableRow key={index} style={{ background: row.backgroundStyle }}>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <Avatar src={`${Constants.PATH_IMAGES}/${row.icon}`} />

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
                        {Format.currency(row.priceBuy)}
                      </Typography>
                      <Typography variant='caption' className={classNameColorBuy}>
                        {statusBuy}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography variant='h6' align='right' className={styles.sell}>
                        {Format.currency(row.priceSell)}
                      </Typography>
                      <Typography variant='caption' className={classNameColorSell}>
                        {statusSell}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography variant='h6' color='textPrimary' align='right'>
                        {Format.decimal(balance)}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <BuyButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={() => onClickBuy(row.acronym)}>
                        Comprar
                      </BuyButton>
                    </TableCell>

                    <TableCell align='right' padding='none'>
                      <SellButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignTopOutlined />} onClick={() => onClickSell(row.acronym)}>
                        Vender
                      </SellButton>
                    </TableCell>

                    <TableCell align='right'>
                      <SwapButton fullWidth size='large' variant='outlined' startIcon={<SwapVertOutlined />} onClick={() => onClickSwap(row.acronym)}>
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
            Nome da criptomoeda
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
            <Avatar src={`${Constants.PATH_IMAGES}/ethereum.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/tether.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/litecoin.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/xrp.png`} />
            <Avatar src={`${Constants.PATH_IMAGES}/binance.png`} />
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
