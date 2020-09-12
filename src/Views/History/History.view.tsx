import { Avatar, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { SyncOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import HistoryStore from './History.store';
import useStyles from './History.styles';

export const URL = '/historico';
export const TITLE = 'Histórico';
export const SUBTITLE = 'Aqui você pode consultar o seu histórico de compra e venda de ativos';

const HistoryView: React.FC = observer(() => {
  useEffect(() => HistoryStore.load());

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

  return (
    <TableContainer>
      <Table>
        <TableHeader />

        <TableBody>
          {HistoryStore.data.map((row, index) => {
            const type = row.type === 'buy' ? 'Compra' : 'Venda';
            const date = new Date().toLocaleDateString('pt-BR');
            const time = new Date().toLocaleTimeString('pt-BR');
            const icon = `/assets/img/${row.icon}`;
            const price = row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
            const quantity = row.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
            const balanceQuantity = row.balance.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
            const balanceValue = row.balance.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

            return (
              <TableRow key={index} className={row.type === 'buy' ? styles.rowBuy : styles.rowSell}>
                <TableCell>
                  <Typography variant='button' className={row.type === 'buy' ? styles.textBuy : styles.textSell}>
                    {type}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant='h6' className={styles.textCell}>
                    {date}
                  </Typography>
                  <Typography variant='caption'>{time}</Typography>
                </TableCell>

                <TableCell>
                  <Box display='flex' alignItems='center'>
                    <Avatar src={icon} />

                    <Box paddingX={2} alignSelf='center'>
                      <Typography variant='h6' color='textPrimary' className={styles.textCell}>
                        {row.acronym}
                      </Typography>
                      <Typography variant='button' color='textSecondary'>
                        {row.coin}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align='right'>
                  <Typography variant='h6' align='right' className={`${styles.textCell} ${row.type === 'buy' ? styles.textBuy : styles.textSell}`}>
                    {price}
                  </Typography>
                  <Typography variant='button' color='textSecondary' align='right'>
                    {quantity}
                  </Typography>
                </TableCell>

                <TableCell align='right'>
                  <Typography variant='h6' color='textPrimary' align='right' className={styles.textCell}>
                    {balanceQuantity}
                  </Typography>
                  <Typography variant='button' color='textSecondary' align='right'>
                    {balanceValue}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const TableHeader: React.FC = observer(() => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={1}>
          <Typography noWrap variant='inherit'>
            Operação
          </Typography>
        </TableCell>

        <TableCell width={1}>
          <Typography noWrap variant='inherit'>
            Data
          </Typography>
        </TableCell>

        <TableCell>
          <Typography noWrap variant='inherit'>
            Nome do ativo
          </Typography>
        </TableCell>

        <TableCell width={1} align='right'>
          <Typography noWrap variant='inherit'>
            Preço
          </Typography>
        </TableCell>

        <TableCell width={1} align='right'>
          <Typography noWrap variant='inherit'>
            Minha carteira
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
});

export default HistoryView;
