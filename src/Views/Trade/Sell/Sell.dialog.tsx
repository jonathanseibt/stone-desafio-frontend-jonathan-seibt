import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignTopOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import InputCurrency from '../../../Components/Input/InputCurrency';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
import SellDialogStore from './Sell.dialog.store';
import { withStylesSellButton } from './Sell.dialog.styles';

const SellDialog: React.FC = observer(() => {
  useEffect(() => {
    SellDialogStore.load();
  });

  return <Content />;
});

const Content: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

  const onClose = () => {
    SellDialogStore.opened = false;
  };

  const onClickClose = () => {
    SellDialogStore.opened = false;
  };

  const onClickSell = () => {
    if (SellDialogStore.validateForm()) {
      SellDialogStore.sell();

      enqueueSnackbar('Venda realizada com sucesso!', { variant: 'success' });

      SellDialogStore.opened = false;
    }
  };

  return (
    <Dialog onClose={onClose} open={SellDialogStore.opened} maxWidth='xs' scroll='body'>
      <Box padding={3} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography component='h2' variant='h5'>
          Vender
        </Typography>

        <IconButton onClick={onClickClose}>
          <CloseOutlined fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box padding={3}>
          <InputCurrency
            {...SellDialogStore.inputCryptoCurrency}
            label={`Valor em ${SellDialogStore.getCrypto.name}`}
            onChange={SellDialogStore.onChangeInputCryptoCurrency}
            name='crypto-currency'
            acronym={SellDialogStore.getCrypto.acronym}
            icon={SellDialogStore.getCrypto.icon}
            required={true}
            autoFocus={true}
            digits={8}
            helperText2={`Saldo disponível: ${Format.decimal(SellDialogStore.getUserWalletCryptoBalance)}`}
            helperText3={`Preço de venda: ${Format.currency(SellDialogStore.getCrypto.priceSell)}`}
          />

          <InputCurrency
            {...SellDialogStore.inputCurrentCurrency}
            label={`Valor em ${Constants.REAL.name}`}
            onChange={SellDialogStore.onChangeInputCurrentCurrency}
            name='current-currency'
            acronym={Constants.REAL.acronym}
            icon={Constants.REAL.icon}
            required={true}
            helperText2={`Saldo atual: ${Format.currency(SellDialogStore.getUserWalletBalance, 2)}`}
          />
        </Box>
      </DialogContent>

      <Box padding={3}>
        <SellButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignTopOutlined />} onClick={onClickSell}>
          {`Vender ${SellDialogStore.getCrypto.name}`}
        </SellButton>
      </Box>
    </Dialog>
  );
});

const SellButton = withStylesSellButton(Button);

export default SellDialog;
