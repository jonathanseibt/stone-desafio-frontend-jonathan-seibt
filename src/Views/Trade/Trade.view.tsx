import { Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { SwapVertOutlined, SyncOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import TradeStore from './Trade.store';
import useStyles, { withStylesBuyButton, withStylesSellButton, withStylesSwapButton } from './Trade.styles';

export const URL = '/negociar';
export const TITLE = 'Negociar';
export const SUBTITLE = 'Aqui você pode comprar, vender e trocar ativos';

const TradeView: React.FC = observer(() => {
  useEffect(() => TradeStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const onClickSync = () => {
    enqueueSnackbar('Em desenvolvimento...');
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

      <List />
    </Paper>
  );
});

const List: React.FC = observer(() => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const BuyButton = withStylesBuyButton(Button);
  const SellButton = withStylesSellButton(Button);
  const SwapButton = withStylesSwapButton(Button);

  const onClickBuy = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  const onClickSell = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  const onClickSwap = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader />

        <TableBody>
          {TradeStore.data.map((row, index) => {
            const icon = `/assets/img/${row.icon}`;
            const price = row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
            const status = row.status === 'up' ? 'subiu' : 'caiu';
            const balanceQuantity = row.balance.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
            const balanceValue = row.balance.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

            return (
              <TableRow key={index}>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    <Avatar src={icon} />

                    <Box paddingX={2} alignSelf='center'>
                      <Typography variant='h6' color='textPrimary' className={styles.main}>
                        {row.acronym}
                      </Typography>
                      <Typography variant='button' color='textSecondary'>
                        {row.coin}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align='right' className={row.status === 'up' ? styles.up : styles.down}>
                  <Typography variant='h6' align='right' className={styles.main}>
                    {price}
                  </Typography>
                  <Typography variant='caption'>{status}</Typography>
                </TableCell>

                <TableCell align='right'>
                  <Typography variant='h6' color='textPrimary' align='right' className={styles.main}>
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
            Último preço
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
      <TableCell colSpan={6}>
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

export default TradeView;
