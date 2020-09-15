import { Avatar, Box, Button, Dialog, DialogContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { CloseOutlined, SwapVertOutlined } from '@material-ui/icons';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
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
    if (SwapDialogStore.validateForm()) {
      SwapDialogStore.swap();

      enqueueSnackbar('Troca realizada com sucesso!', { variant: 'success' });

      SwapDialogStore.opened = false;
    }
  };

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
          {SwapDialogStore.isBitcoin ? (
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
          {SwapDialogStore.isBitcoin ? `${TITLE} ${Constants.BITCOIN.name} por ${Constants.BRITA.name}` : `${TITLE} ${Constants.BRITA.name} por ${Constants.BITCOIN.name}`}
        </SwapButton>
      </Box>
    </Dialog>
  );
});

const InputCryptoCurrencyBitcoin: React.FC<InputProps> = observer((props) => {
  const getCaptionBalance = () => {
    if (SwapDialogStore.isBitcoin) {
      return `Saldo disponível: ${Format.decimal(SwapDialogStore.getUserWalletBitcoinBalance)}`;
    } else {
      return `Saldo atual: ${Format.decimal(SwapDialogStore.getUserWalletBitcoinBalance)}`;
    }
  };

  const getCaptionPrice = () => {
    if (SwapDialogStore.isBitcoin) {
      return `Preço de venda: ${Format.currency(SwapDialogStore.getBitcoinPriceSell, 2)}`;
    } else {
      return `Preço de compra: ${Format.currency(SwapDialogStore.getBitcoinPriceBuy, 2)}`;
    }
  };

  return (
    <NumberField
      value={SwapDialogStore.inputCryptoCurrencyBitcoin.value}
      error={SwapDialogStore.inputCryptoCurrencyBitcoin.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyBitcoin(value)}
      label={`Valor em ${Constants.BITCOIN.name}`}
      name={`crypto-currency-${Constants.BITCOIN.name}`}
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
          {!!SwapDialogStore.inputCryptoCurrencyBitcoin.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={SwapDialogStore.inputCryptoCurrencyBitcoin.error ? 'error' : 'textSecondary'} noWrap>
                {SwapDialogStore.inputCryptoCurrencyBitcoin.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {getCaptionBalance()}
            </Typography>
          </Box>

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {getCaptionPrice()}
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
            <Avatar src={`${Constants.PATH_IMAGES}/${Constants.BITCOIN.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

const InputCryptoCurrencyBrita: React.FC<InputProps> = observer((props) => {
  const getCaptionBalance = () => {
    if (SwapDialogStore.isBrita) {
      return `Saldo disponível: ${Format.decimal(SwapDialogStore.getUserWalletBritaBalance)}`;
    } else {
      return `Saldo atual: ${Format.decimal(SwapDialogStore.getUserWalletBritaBalance)}`;
    }
  };

  const getCaptionPrice = () => {
    if (SwapDialogStore.isBrita) {
      return `Preço de venda: ${Format.currency(SwapDialogStore.getBritaPriceSell, 2)}`;
    } else {
      return `Preço de compra: ${Format.currency(SwapDialogStore.getBritaPriceBuy, 2)}`;
    }
  };

  return (
    <NumberField
      value={SwapDialogStore.inputCryptoCurrencyBrita.value}
      error={SwapDialogStore.inputCryptoCurrencyBrita.error}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => SwapDialogStore.onChangeInputCryptoCurrencyBrita(value)}
      label={`Valor em ${Constants.BRITA.name}`}
      name={`crypto-currency-${Constants.BRITA.name}`}
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
          {!!SwapDialogStore.inputCryptoCurrencyBrita.helperText && (
            <Box component={'span'} display='block'>
              <Typography variant='caption' color={SwapDialogStore.inputCryptoCurrencyBrita.error ? 'error' : 'textSecondary'} noWrap>
                {SwapDialogStore.inputCryptoCurrencyBrita.helperText}
              </Typography>
            </Box>
          )}

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {getCaptionBalance()}
            </Typography>
          </Box>

          <Box component={'span'} display='block'>
            <Typography variant='caption' color='textSecondary' noWrap>
              {getCaptionPrice()}
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
            <Avatar src={`${Constants.PATH_IMAGES}/${Constants.BRITA.icon}`} />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SwapDialog;
