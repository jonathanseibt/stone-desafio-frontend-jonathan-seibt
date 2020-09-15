import { Avatar, Box, InputAdornment, Typography } from '@material-ui/core';
import NumberField from '@unicef/material-ui-currency-textfield';
import { observer } from 'mobx-react';
import React from 'react';
import Constants from '../../Constants';

interface Props {
  value: string;
  label: string;
  name: string;
  acronym: string;
  icon: string;
  error: boolean;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  required?: boolean;
  digits?: number;
  helperText?: string;
  helperText2?: string;
  helperText3?: string;
}

const InputCurrency: React.FC<Props> = observer((props) => {
  const acronym = (
    <Box marginRight={1}>
      <Typography variant='button' color='textSecondary'>
        {props.acronym}
      </Typography>
    </Box>
  );

  const icon = (
    <Box marginLeft={1}>
      <InputAdornment position='end'>
        <Avatar src={`${Constants.PATH_IMAGES}/${props.icon}`} />
      </InputAdornment>
    </Box>
  );

  const caption = (
    <Box component='span' display='block'>
      <Typography variant='caption' color={props.error ? 'error' : 'textSecondary'} noWrap>
        {props.helperText}
      </Typography>
    </Box>
  );

  const caption2 = (
    <Box component='span' display='block'>
      <Typography variant='caption' color='textSecondary' noWrap>
        {props.helperText2}
      </Typography>
    </Box>
  );

  const caption3 = (
    <Box component='span' display='block'>
      <Typography variant='caption' color='textSecondary' noWrap>
        {props.helperText3}
      </Typography>
    </Box>
  );

  return (
    <NumberField
      value={props.value}
      error={props.error}
      label={props.label}
      name={props.name}
      decimalPlaces={props.digits ?? 2}
      autoFocus={props.autoFocus}
      required={props.required}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => props.onChange(value)}
      variant='outlined'
      margin='normal'
      outputFormat='string'
      currencySymbol=''
      decimalCharacter=','
      digitGroupSeparator='.'
      fullWidth
      helperText={
        <>
          {!!props.helperText && caption}
          {!!props.helperText2 && caption2}
          {!!props.helperText3 && caption3}
        </>
      }
      InputProps={{
        autoComplete: 'off',
        startAdornment: acronym,
        endAdornment: icon,
      }}
    />
  );
});

export default InputCurrency;
