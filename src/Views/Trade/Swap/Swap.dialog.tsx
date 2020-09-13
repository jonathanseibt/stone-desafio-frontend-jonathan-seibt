import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import SwapDialogStore from './Swap.dialog.store';
import { withStylesSwapButton } from './Swap.dialog.styles';

export const TITLE = 'Trocar';

const SwapDialog: React.FC = observer(() => {
  useEffect(() => SwapDialogStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const SwapButton = withStylesSwapButton(Button);

  const onClose = () => {
    SwapDialogStore.opened = false;
  };

  const onClickClose = () => {
    SwapDialogStore.opened = false;
  };

  const onClickSwap = () => {
    enqueueSnackbar('Em desenvolvimento...');
  };

  return (
    <Dialog onClose={onClose} open={SwapDialogStore.opened} maxWidth='xs'>
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
          <InputCryptoCurrencyFrom />
          <InputCryptoCurrencyTo />
        </Box>
      </DialogContent>

      <Box padding={3}>
        <SwapButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={onClickSwap}>
          Trocar
        </SwapButton>
      </Box>
    </Dialog>
  );
});

const InputCryptoCurrencyFrom: React.FC = observer(() => {
  return (
    <NumberField
      {...SwapDialogStore.inputCryptoCurrencyFrom}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyFrom(value)}
      label='Valor em Bitcoin'
      name='crypto-currency-from'
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

const InputCryptoCurrencyTo: React.FC = observer(() => {
  return (
    <NumberField
      {...SwapDialogStore.inputCryptoCurrencyTo}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyTo(value)}
      label='Valor em Brita'
      name='crypto-currency-to'
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
              BRT
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src='/assets/img/brita.png' />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SwapDialog;
