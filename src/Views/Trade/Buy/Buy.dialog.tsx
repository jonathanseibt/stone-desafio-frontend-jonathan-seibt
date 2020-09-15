import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
import BuyDialogStore from './Buy.dialog.store';
import { withStylesBuyButton } from './Buy.dialog.styles';

export const TITLE = 'Comprar';

const BuyDialog: React.FC = observer(() => {
  useEffect(() => {
    BuyDialogStore.load();
  });

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
    if (BuyDialogStore.validateForm()) {
      BuyDialogStore.buy();

      enqueueSnackbar('Compra realizada com sucesso!', { variant: 'success' });

      BuyDialogStore.opened = false;
    }
  };

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
          {`${TITLE} ${BuyDialogStore.getCrypto.acronym === Constants.BITCOIN.acronym ? Constants.BITCOIN.name : Constants.BRITA.name}`}
        </BuyButton>
      </Box>
    </Dialog>
  );
});

const InputCurrentCurrency: React.FC = observer(() => {
  return (
    <NumberField
      value={BuyDialogStore.inputCurrentCurrency.value}
      error={BuyDialogStore.inputCurrentCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => BuyDialogStore.onChangeInputCurrentCurrency(value)}
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
      autoFocus
      helperText={
        <>
          {!!BuyDialogStore.inputCurrentCurrency.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={BuyDialogStore.inputCurrentCurrency.error ? 'error' : 'textSecondary'} noWrap>
                {BuyDialogStore.inputCurrentCurrency.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Saldo disponível: ${Format.currency(BuyDialogStore.getUserWalletBalance, 2)}`}
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
            <Avatar src={`${Constants.PATH_IMAGES}/${Constants.REAL.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

const InputCryptoCurrency: React.FC = observer(() => {
  return (
    <NumberField
      value={BuyDialogStore.inputCryptoCurrency.value}
      error={BuyDialogStore.inputCryptoCurrency.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => BuyDialogStore.onChangeInputCryptoCurrency(value)}
      label={`Valor em ${BuyDialogStore.getCrypto.name}`}
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
          {!!BuyDialogStore.inputCryptoCurrency.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={BuyDialogStore.inputCryptoCurrency.error ? 'error' : 'textSecondary'} noWrap>
                {BuyDialogStore.inputCryptoCurrency.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Saldo atual: ${Format.currency(BuyDialogStore.getUserWalletCryptoBalance)}`}
            </Typography>
          </Box>

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {`Preço de compra: ${Format.currency(BuyDialogStore.getCrypto.priceBuy)}`}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {BuyDialogStore.getCrypto.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`${Constants.PATH_IMAGES}/${BuyDialogStore.getCrypto.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default BuyDialog;
