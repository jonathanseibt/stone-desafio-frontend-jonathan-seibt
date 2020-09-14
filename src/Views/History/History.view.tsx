import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { UserWalletHistoryModel } from '../../Models/User/Wallet/History/UserWalletHistory.model';
import SessionStore from '../../Session.store';
import useStyles from './History.styles';

export const URL = '/historico';
export const TITLE = 'Histórico';
export const SUBTITLE = 'Aqui você pode consultar o seu histórico de compra e venda de ativos';

const HistoryView: React.FC = observer(() => {
  return <View />;
});

const View: React.FC = observer(() => {
  return (
    <Paper elevation={3}>
      <Box display='flex' justifyContent='space-between' alignItems='center' padding={2}>
        <Box alignSelf='center'>
          <Typography component='h2' variant='h5'>
            {TITLE}
          </Typography>
          <Typography variant='subtitle1'>{SUBTITLE}</Typography>
        </Box>
      </Box>

      <Box marginBottom={3}>
        <List />
      </Box>
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
          {!SessionStore.getUser().wallet.history.length ? (
            <TableEmpty />
          ) : (
            SessionStore.getUser().wallet.history.map((row, index) => {
              const date = row.date.toLocaleDateString('pt-BR');
              const time = row.date.toLocaleTimeString('pt-BR');
              const icon = `/assets/img/${row.getCrypto().icon}`;
              const price = row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
              const quantity = row.quantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
              const balanceQuantity = row.balanceQuantity.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 8 });
              const balanceValue = row.balanceValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

              return (
                <TableRow
                  key={index}
                  style={{ background: row.getCrypto().backgroundStyle }}
                  className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.rowBuy : styles.rowSell}>
                  <TableCell>
                    <Typography variant='button' className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.textBuy : styles.textSell}>
                      {row.operation === UserWalletHistoryModel.OPERATION.BUY ? 'Compra' : 'Venda'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant='h6'>{date}</Typography>
                    <Typography variant='caption'>{time}</Typography>
                  </TableCell>

                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={icon} />

                      <Box paddingX={2} alignSelf='center'>
                        <Typography variant='h6' color='textPrimary'>
                          {row.getCrypto().acronym}
                        </Typography>
                        <Typography variant='button' color='textSecondary'>
                          {row.getCrypto().name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align='right'>
                    <Typography variant='h6' align='right' className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.textBuy : styles.textSell}>
                      {price}
                    </Typography>
                    <Typography variant='button' color='textSecondary' align='right'>
                      {quantity}
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
                </TableRow>
              );
            })
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

const TableEmpty: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <TableRow className={styles.empty}>
      <TableCell colSpan={6}>
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

export default HistoryView;
