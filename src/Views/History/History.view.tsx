import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { CryptoModel } from '../../Models/Crypto/Crypto.model';
import { UserWalletHistoryModel } from '../../Models/User/Wallet/History/UserWalletHistory.model';
import SessionStore from '../../Session.store';
import Format from '../../Utils/Format';
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

  const user = SessionStore.getUser();

  return (
    <TableContainer>
      <Table>
        <TableHeader />

        <TableBody>
          {!user.wallet.history.length ? (
            <TableEmpty />
          ) : (
            user.wallet.history.map((row, index) => {
              const crypto = CryptoModel.findByAcronym(row.acronym) ?? new CryptoModel();

              return (
                <TableRow
                  key={index}
                  style={{ background: crypto.backgroundStyle }}
                  className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.rowBuy : styles.rowSell}>
                  <TableCell>
                    <Typography variant='button' className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.textBuy : styles.textSell}>
                      {row.operation === UserWalletHistoryModel.OPERATION.BUY ? 'Compra' : 'Venda'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant='h6'>{Format.date(row.date)}</Typography>
                    <Typography variant='caption'>{Format.time(row.date)}</Typography>
                  </TableCell>

                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={`/assets/img/${crypto.icon}`} />

                      <Box paddingX={2} alignSelf='center'>
                        <Typography variant='h6' color='textPrimary'>
                          {crypto.acronym}
                        </Typography>
                        <Typography variant='button' color='textSecondary'>
                          {crypto.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align='right'>
                    <Typography variant='h6' align='right' className={row.operation === UserWalletHistoryModel.OPERATION.BUY ? styles.textBuy : styles.textSell}>
                      {Format.real(row.price)}
                    </Typography>
                    <Typography variant='button' color='textSecondary' align='right'>
                      {Format.decimal(row.quantity)}
                    </Typography>
                  </TableCell>

                  <TableCell align='right'>
                    <Typography variant='h6' color='textPrimary' align='right'>
                      {Format.decimal(row.balanceQuantity)}
                    </Typography>
                    <Typography variant='button' color='textSecondary' align='right'>
                      {Format.real(row.balanceValue)}
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
