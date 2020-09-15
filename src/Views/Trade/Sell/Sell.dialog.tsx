import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignTopOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
import SellDialogStore from './Sell.dialog.store';
import { withStylesSellButton } from './Sell.dialog.styles';

export const TITLE = 'Vender';

const SellDialog: React.FC = observer(() => {
  useEffect(() => SellDialogStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const SellButton = withStylesSellButton(Button);

  const onClose = () => {
    SellDialogStore.opened = false;
  };

  const onClickClose = () => {
    SellDialogStore.opened = false;
  };

  const onClickSell = () => {
    if (SellDialogStore.validateForm()) {
      const result = SellDialogStore.sell();

      if (result) {
        enqueueSnackbar('Venda realizada com sucesso!', { variant: 'success' });
      }
    }
  };

  return (
    <Dialog onClose={onClose} open={SellDialogStore.opened} maxWidth='xs' scroll='body'>
      <Box padding={3} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography component='h2' variant='h5'>
          {TITLE}
        </Typography>

        <IconButton onClick={onClickClose}>
          <CloseOutlined fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box padding={3}>
          <InputCryptoCurrency />
          <InputCurrentCurrency />
        </Box>
      </DialogContent>

      <Box padding={3}>
        <SellButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignTopOutlined />} onClick={onClickSell}>
          {`${TITLE} ${SellDialogStore.getCrypto.acronym === Constants.BITCOIN.acronym ? Constants.BITCOIN.name : Constants.BRITA.name}`}
        </SellButton>
      </Box>
    </Dialog>
  );
});

const InputCryptoCurrency: React.FC = observer(() => {
  return (
    <NumberField
      value={SellDialogStore.inputCryptoCurrency.value}
      error={SellDialogStore.inputCryptoCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SellDialogStore.onChangeInputCryptoCurrency(value)}
      label={`Valor em ${SellDialogStore.getCrypto.name}`}
      name='crypto-currency'
      variant='outlined'
      margin='normal'
      required
      fullWidth
      outputFormat='string'
      decimalPlaces={8}
      currencySymbol=''
      decimalCharacter=','
      digitGroupSeparator='.'
      autoFocus
      helperText={
        <>
          {!!SellDialogStore.inputCryptoCurrency.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={SellDialogStore.inputCryptoCurrency.error ? 'error' : 'textSecondary'} noWrap>
                {SellDialogStore.inputCryptoCurrency.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Saldo disponível: ${Format.currency(SellDialogStore.getUserWalletCryptoBalance, 2)}`}
            </Typography>
          </Box>

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Preço de venda: ${Format.currency(SellDialogStore.getCrypto.priceSell, 2)}`}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {SellDialogStore.getCrypto.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`/assets/img/${SellDialogStore.getCrypto.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

const InputCurrentCurrency: React.FC = observer(() => {
  return (
    <NumberField
      value={SellDialogStore.inputCurrentCurrency.value}
      error={SellDialogStore.inputCurrentCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SellDialogStore.onChangeInputCurrentCurrency(value)}
      label={`Valor em ${Constants.REAL.name}`}
      name='current-currency'
      variant='outlined'
      margin='normal'
      required
      fullWidth
      outputFormat='string'
      decimalPlaces={2}
      currencySymbol=''
      decimalCharacter=','
      digitGroupSeparator='.'
      helperText={
        <>
          {!!SellDialogStore.inputCurrentCurrency.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={SellDialogStore.inputCurrentCurrency.error ? 'error' : 'textSecondary'} noWrap>
                {SellDialogStore.inputCurrentCurrency.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Saldo atual: ${Format.currency(SellDialogStore.getUserWalletBalance, 2)}`}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {Constants.REAL.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`/assets/img/${Constants.REAL.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SellDialog;
