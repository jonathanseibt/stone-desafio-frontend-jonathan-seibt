import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, SwapVertOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SwapDialogStore from './Swap.dialog.store';
import { withStylesSwapButton } from './Swap.dialog.styles';

export const TITLE = 'Trocar';

interface InputProps {
  autoFocus?: boolean;
}

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

  const crypto = CryptoModel.findByID(SwapDialogStore._crypto) ?? new CryptoModel();

  return (
    <Dialog onClose={onClose} open={SwapDialogStore.opened} maxWidth='xs' scroll='body'>
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
          {crypto.acronym === Constants.BITCOIN.acronym ? (
            <>
              <InputCryptoCurrencyBitcoin autoFocus />
              <InputCryptoCurrencyBrita />
            </>
          ) : (
            <>
              <InputCryptoCurrencyBrita autoFocus />
              <InputCryptoCurrencyBitcoin />
            </>
          )}
        </Box>
      </DialogContent>

      <Box padding={3}>
        <SwapButton fullWidth size='large' variant='outlined' startIcon={<SwapVertOutlined />} onClick={onClickSwap}>
          {`${TITLE} ${
            crypto.acronym === Constants.BITCOIN.acronym ? `${Constants.BITCOIN.name} por ${Constants.BRITA.name}` : `${Constants.BRITA.name} por ${Constants.BITCOIN.name}`
          }`}
        </SwapButton>
      </Box>
    </Dialog>
  );
});

const InputCryptoCurrencyBitcoin: React.FC<InputProps> = observer((props) => {
  return (
    <NumberField
      value={SwapDialogStore.inputCryptoCurrencyBitcoin.value}
      error={SwapDialogStore.inputCryptoCurrencyBitcoin.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyBitcoin(value)}
      label={`Quantidade de ${Constants.BITCOIN.name}`}
      name='crypto-currency-bitcoin'
      variant='outlined'
      margin='normal'
      required
      fullWidth
      outputFormat='string'
      decimalPlaces={8}
      currencySymbol=''
      decimalCharacter=','
      digitGroupSeparator='.'
      autoFocus={props.autoFocus}
      helperText={
        <>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SwapDialogStore.inputCryptoCurrencyBitcoin.helperText}
            </Typography>
          </Box>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SwapDialogStore.inputCryptoCurrencyBitcoinHelperText}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {Constants.BITCOIN.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`/assets/img/${Constants.BITCOIN.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

const InputCryptoCurrencyBrita: React.FC<InputProps> = observer((props) => {
  return (
    <NumberField
      value={SwapDialogStore.inputCryptoCurrencyBrita.value}
      error={SwapDialogStore.inputCryptoCurrencyBrita.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyBrita(value)}
      label={`Quantidade de ${Constants.BRITA.name}`}
      name='crypto-currency-brita'
      variant='outlined'
      margin='normal'
      required
      fullWidth
      outputFormat='string'
      decimalPlaces={8}
      currencySymbol=''
      decimalCharacter=','
      digitGroupSeparator='.'
      autoFocus={props.autoFocus}
      helperText={
        <>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SwapDialogStore.inputCryptoCurrencyBrita.helperText}
            </Typography>
          </Box>
          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {SwapDialogStore.inputCryptoCurrencyBritaHelperText}
            </Typography>
          </Box>
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: (
          <Box marginRight={1}>
            <Typography variant='button' color='textSecondary'>
              {Constants.BRITA.acronym}
            </Typography>
          </Box>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <Avatar src={`/assets/img/${Constants.BRITA.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SwapDialog;
