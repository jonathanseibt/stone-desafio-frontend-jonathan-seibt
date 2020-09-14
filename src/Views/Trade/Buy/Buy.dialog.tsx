import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import BuyDialogStore from './Buy.dialog.store';
import { withStylesBuyButton } from './Buy.dialog.styles';

export const TITLE = 'Comprar';

const BuyDialog: React.FC = observer(() => {
  useEffect(() => BuyDialogStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const BuyButton = withStylesBuyButton(Button);

  const onClose = () => {
    BuyDialogStore.opened = false;
  };

  const onClickClose = () => {
    BuyDialogStore.opened = false;
  };

  const onClickBuy = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  const crypto = CryptoModel.findByID(BuyDialogStore._crypto) ?? new CryptoModel();

  return (
    <Dialog onClose={onClose} open={BuyDialogStore.opened} maxWidth='xs' scroll='body'>
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
          <InputCurrentCurrency />
          <InputCryptoCurrency />
        </Box>
      </DialogContent>

      <Box padding={3}>
        <BuyButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={onClickBuy}>
          {`${TITLE} ${crypto.acronym === Constants.BITCOIN.acronym ? Constants.BITCOIN.name : Constants.BRITA.name}`}
        </BuyButton>
      </Box>
    </Dialog>
  );
});

const InputCurrentCurrency: React.FC = observer(() => {
  return (
    <NumberField
      {...BuyDialogStore.inputCurrentCurrency}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => BuyDialogStore.onChangeInputCurrentCurrency(value)}
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
      autoFocus
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

const InputCryptoCurrency: React.FC = observer(() => {
  const crypto = CryptoModel.findByID(BuyDialogStore._crypto) ?? new CryptoModel();

  return (
    <NumberField
      value={BuyDialogStore.inputCryptoCurrency.value}
      error={BuyDialogStore.inputCryptoCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => BuyDialogStore.onChangeInputCryptoCurrency(value)}
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
      helperText={
        <>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {BuyDialogStore.inputCryptoCurrency.helperText}
            </Typography>
          </Box>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {BuyDialogStore.inputCryptoCurrencyHelperText}
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

export default BuyDialog;
