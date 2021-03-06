import { Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useRef } from 'react';
import { use100vh } from 'react-div-100vh';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '~/routes';

import Notifications from '~/components/Notifications';
import SpinnerOverlay from '~/components/SpinnerOverlay';
import UBI from '~/components/UBI';
import { initializeApp } from '~/store/app/actions';
import { IconAlert, IconClose } from '~/styles/icons';
import logError from '~/utils/debug';

const useStyles = makeStyles((theme) => ({
  app: {
    minWidth: theme.custom.components.appMinWidth,
    maxWidth: theme.custom.components.appMaxWidth,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  snackbar: {},
  // @NOTE: Hacky use of !important, see related issue:
  // https://github.com/iamhosseindhv/notistack/issues/305
  snackbarInfo: {
    background: `${theme.custom.gradients.info} !important`,
    color: `${theme.palette.info.contrastText} !important`,
  },
  snackbarWarning: {
    background: `${theme.custom.gradients.warning} !important`,
    color: `${theme.palette.warning.contrastText} !important`,
  },
  snackbarError: {
    background: `${theme.custom.gradients.error} !important`,
    color: `${theme.palette.error.contrastText} !important`,
  },
  snackbarSuccess: {
    background: `${theme.custom.gradients.success} !important`,
    color: `${theme.palette.success.contrastText} !important`,
  },
  snackbarIconVariant: {
    marginRight: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const ref = useRef();
  const notistackRef = useRef();

  // Fix issue where there was always one pixel too much in the calculation
  const height = use100vh() - 1;

  const onClickDismiss = (notificationId) => () => {
    notistackRef.current.closeSnackbar(notificationId);
  };

  useEffect(() => {
    // Initialize app state in redux store
    const initializeState = async () => {
      try {
        await dispatch(initializeApp());
      } catch (error) {
        logError(error);
      }
    };

    initializeState();
  }, [dispatch]);

  const SnackbarIcon = <IconAlert className={classes.snackbarIconVariant} />;

  return (
    <SnackbarProvider
      action={(notificationId) => (
        // eslint-disable-next-line react/display-name
        <IconButton color="inherit" onClick={onClickDismiss(notificationId)}>
          <IconClose fontSize="small" />
        </IconButton>
      )}
      classes={{
        variantSuccess: classes.snackbarSuccess,
        variantError: classes.snackbarError,
        variantWarning: classes.snackbarWarning,
        variantInfo: classes.snackbarInfo,
      }}
      iconVariant={{
        info: SnackbarIcon,
        default: SnackbarIcon,
        error: SnackbarIcon,
        success: SnackbarIcon,
        warning: SnackbarIcon,
      }}
      ref={notistackRef}
    >
      <Router>
        <Box className={classes.app} ref={ref} style={{ height }}>
          <UBI />
          <Notifications />
          <SpinnerOverlay isVisible={app.isLoading} />
          <Routes />
        </Box>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
