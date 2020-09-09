import React from 'react';
import { observer } from 'mobx-react';
import { Container, Paper, Box, Avatar, Typography } from '@material-ui/core';
import useStyles from './Auth.styles';
import { Helmet } from 'react-helmet-async';
import Constants from '../../Constants';

interface Props {
  title: string;
}

const AuthLayout: React.FC<Props> = observer((props) => {
  const styles = useStyles();

  return (
    <>
      <Helmet>
        <title>{`${Constants.TITLE} | ${props.title}`}</title>
      </Helmet>

      <Box minHeight='100vh' minWidth='100vw'>
        <Box minHeight='30vh' minWidth='100vw' className={styles.background} />

        <Box marginTop='-200px'>
          <Container component='main' maxWidth='xs'>
            <Box display='flex' justifyContent='center' flexDirection='column'>
              <Avatar variant='square' src='/assets/img/coin.svg' className={styles.logoImage} />
              <Typography component='h1' variant='button' align='center' className={styles.logoText}>
                {Constants.TITLE}
              </Typography>
            </Box>

            <Box marginY={4}>
              <Paper elevation={3}>
                <Box paddingTop={5} paddingBottom={8} paddingX={8}>
                  <Box marginBottom={3}>
                    <Typography component='h1' variant='h5' align='center'>
                      {props.title}
                    </Typography>
                  </Box>

                  {props.children}
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
});

export default AuthLayout;
