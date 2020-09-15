import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import InputCurrency from '../../../Components/Input/InputCurrency';
import Constants from '../../../Constants';
import Format from '../../../Utils/Format';
import BuyDialogStore from './Buy.dialog.store';
import { withStylesBuyButton } from './Buy.dialog.styles';

const BuyDialog: React.FC = observer(() => {
  useEffect(() => {
    BuyDialogStore.load();
  });

  return <Content />;
});

const Content: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();

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
          Comprar
        </Typography>

        <IconButton onClick={onClickClose}>
          <CloseOutlined fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box padding={3}>
          <InputCurrency
            {...BuyDialogStore.inputCurrentCurrency}
            label={`Valor em ${Constants.REAL.name}`}
            onChange={BuyDialogStore.onChangeInputCurrentCurrency}
            name='current-currency'
            acronym={Constants.REAL.acronym}
            icon={Constants.REAL.icon}
            required={true}
            autoFocus={true}
            helperText2={`Saldo disponível: ${Format.currency(BuyDialogStore.getUserWalletBalance, 2)}`}
          />

          <InputCurrency
            {...BuyDialogStore.inputCryptoCurrency}
            label={`Valor em ${BuyDialogStore.getCrypto.name}`}
            onChange={BuyDialogStore.onChangeInputCryptoCurrency}
            name='crypto-currency'
            acronym={BuyDialogStore.getCrypto.acronym}
            icon={BuyDialogStore.getCrypto.icon}
            required={true}
            digits={8}
            helperText2={`Saldo atual: ${Format.currency(BuyDialogStore.getUserWalletCryptoBalance)}`}
            helperText3={`Preço de compra: ${Format.currency(BuyDialogStore.getCrypto.priceBuy)}`}
          />
        </Box>
      </DialogContent>

      <Box padding={3}>
        <BuyButton fullWidth size='large' variant='outlined' startIcon={<VerticalAlignBottomOutlined />} onClick={onClickBuy}>
          {`Comprar ${BuyDialogStore.getCrypto.name}`}
        </BuyButton>
      </Box>
    </Dialog>
  );
});

const BuyButton = withStylesBuyButton(Button);

export default BuyDialog;
