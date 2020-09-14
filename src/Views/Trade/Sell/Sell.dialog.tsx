import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
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
    enqueueSnackbar('Em desenvolvimento...');
  };

  const crypto = CryptoModel.findByID(SellDialogStore._crypto) ?? new CryptoModel();

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
        <SellButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={onClickSell}>
          {`${TITLE} ${crypto.acronym === Constants.BITCOIN.acronym ? Constants.BITCOIN.name : Constants.BRITA.name}`}
        </SellButton>
      </Box>
    </Dialog>
  );
});

const InputCryptoCurrency: React.FC = observer(() => {
  const crypto = CryptoModel.findByID(SellDialogStore._crypto) ?? new CryptoModel();

  return (
    <NumberField
      value={SellDialogStore.inputCryptoCurrency.value}
      error={SellDialogStore.inputCryptoCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SellDialogStore.onChangeInputCryptoCurrency(value)}
      label={`Quantidade de ${crypto.name}`}
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
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SellDialogStore.inputCryptoCurrency.helperText}
            </Typography>
          </Box>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SellDialogStore.inputCryptoCurrencyHelperText}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {crypto.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`/assets/img/${crypto.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

const InputCurrentCurrency: React.FC = observer(() => {
  return (
    <NumberField
      {...SellDialogStore.inputCurrentCurrency}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SellDialogStore.onChangeInputCurrentCurrency(value)}
      label='Valor em Real'
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
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              BRL
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src='/assets/img/real.png' />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SellDialog;
