import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined, SwapVertOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import InputCurrency from '../../../Components/Input/InputCurrency';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
import SwapDialogStore from './Swap.dialog.store';
import { withStylesSwapButton } from './Swap.dialog.styles';

const SwapDialog: React.FC = observer(() => {
  useEffect(() => {
    SwapDialogStore.load();
  });

  return <Content />;
});

const Content: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const getTitle = () => {
    if (SwapDialogStore.isBitcoin) {
      return `Trocar ${Constants.BITCOIN.name} por ${Constants.BRITA.name}`;
    } else {
      return `Trocar ${Constants.BRITA.name} por ${Constants.BITCOIN.name}`;
    }
  };

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
          Trocar
        </Typography>

        <IconButton onClick={onClickClose}>
          <CloseOutlined fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box padding={3}>
          {SwapDialogStore.isBitcoin ? (
            <>
              <InputCurrencyBitcoin />
              <InputCurrencyBrita />
            </>
          ) : (
            <>
              <InputCurrencyBrita />
              <InputCurrencyBitcoin />
            </>
          )}
        </Box>
      </DialogContent>

      <Box padding={3}>
        <SwapButton fullWidth size='large' variant='outlined' startIcon={<SwapVertOutlined />} onClick={onClickSwap}>
          {getTitle()}
        </SwapButton>
      </Box>
    </Dialog>
  );
});

const InputCurrencyBitcoin: React.FC = observer(() => {
  const getCaptionBalance = () => {
    if (SwapDialogStore.isBitcoin) {
      return `Saldo disponível: ${Format.decimal(SwapDialogStore.getUserWalletBitcoinBalance)}`;
    } else {
      return `Saldo atual: ${Format.decimal(SwapDialogStore.getUserWalletBitcoinBalance)}`;
    }
  };

  const getCaptionPrice = () => {
    if (SwapDialogStore.isBitcoin) {
      return `Preço de venda: ${Format.currency(SwapDialogStore.getBitcoinPriceSell)}`;
    } else {
      return `Preço de compra: ${Format.currency(SwapDialogStore.getBitcoinPriceBuy)}`;
    }
  };

  return (
    <InputCurrency
      {...SwapDialogStore.inputCryptoCurrencyBitcoin}
      label={`Valor em ${Constants.BITCOIN.name}`}
      onChange={SwapDialogStore.onChangeInputCryptoCurrencyBitcoin}
      name={`crypto-currency-${Constants.BITCOIN.name}`}
      acronym={Constants.BITCOIN.acronym}
      icon={Constants.BITCOIN.icon}
      required={true}
      digits={8}
      helperText2={getCaptionBalance()}
      helperText3={getCaptionPrice()}
    />
  );
});

const InputCurrencyBrita: React.FC = observer(() => {
  const getCaptionBalance = () => {
    if (SwapDialogStore.isBrita) {
      return `Saldo disponível: ${Format.decimal(SwapDialogStore.getUserWalletBritaBalance)}`;
    } else {
      return `Saldo atual: ${Format.decimal(SwapDialogStore.getUserWalletBritaBalance)}`;
    }
  };

  const getCaptionPrice = () => {
    if (SwapDialogStore.isBrita) {
      return `Preço de venda: ${Format.currency(SwapDialogStore.getBritaPriceSell)}`;
    } else {
      return `Preço de compra: ${Format.currency(SwapDialogStore.getBritaPriceBuy)}`;
    }
  };

  return (
    <InputCurrency
      {...SwapDialogStore.inputCryptoCurrencyBrita}
      label={`Valor em ${Constants.BRITA.name}`}
      onChange={SwapDialogStore.onChangeInputCryptoCurrencyBrita}
      name={`crypto-currency-${Constants.BRITA.name}`}
      acronym={Constants.BRITA.acronym}
      icon={Constants.BRITA.icon}
      required={true}
      digits={8}
      helperText2={getCaptionBalance()}
      helperText3={getCaptionPrice()}
    />
  );
});

const SwapButton = withStylesSwapButton(Button);

export default SwapDialog;
