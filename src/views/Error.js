import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import View from '~/components/View';
import translate from '~/services/locale';
import { burnApp } from '~/store/app/actions';

const CriticalError = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const onBurnClick = () => {
    if (window.confirm(translate('CriticalError.dialogAreYouSure'))) {
      dispatch(burnApp());
    }
  };

  const onReload = () => {
    window.location.reload();
  };

  if (app.isErrorCritical) {
    return (
      <View>
        <Container maxWidth="sm">
          <Typography align="center">
            {translate('CriticalError.bodyCriticalErrorDescription')}
          </Typography>
          <Button fullWidth isPrimary onClick={onBurnClick}>
            {translate('CriticalError.buttonBurnWallet')}
          </Button>
        </Container>
      </View>
    );
  } else {
    return (
      <View>
        <Container maxWidth="sm">
          <Typography align="center">
            {translate('CriticalError.bodyCriticalErrorTryAgain')}
          </Typography>
          <Button fullWidth isPrimary onClick={onReload}>
            {translate('CriticalError.buttonReload')}
          </Button>
        </Container>
      </View>
    );
  }
};

export default CriticalError;
