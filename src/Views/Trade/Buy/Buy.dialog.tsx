import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
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
          Comprar
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
  return (
    <NumberField
      {...BuyDialogStore.inputCryptoCurrency}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => BuyDialogStore.onChangeInputCryptoCurrency(value)}
      label='Valor em Bitcoin'
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
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              BTC
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src='/assets/img/bitcoin.png' />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default BuyDialog;
