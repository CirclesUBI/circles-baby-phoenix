import { Box, Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateLoop } from '~/hooks/update';
import { checkCurrentBalance, checkTokenState } from '~/store/token/actions';
import { IconCircles } from '~/styles/icons';
import { formatCirclesValue } from '~/utils/format';

const useStyles = makeStyles((theme) => ({
  box: {
    maxWidth: theme.spacing(70),
    margin: `${theme.spacing(2)}px auto`,
    textAlign: 'center',
  },
  balance: {
    fontSize: '2.5rem',
    fontWeight: theme.typography.fontWeightRegular,
  },
  balanceIcon: {
    position: 'relative',
    top: 2,
    marginRight: theme.spacing(0.5),
    fontSize: '2rem',
  },
}));

const BalanceDisplayOrganization = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { token, safe } = useSelector((state) => state);

  useUpdateLoop(async () => {
    await dispatch(checkTokenState());
    await dispatch(checkCurrentBalance());
  });

  const isLoading = token.balance === null && !safe.pendingNonce;

  return (
    <Box className={classes.box}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography className={classes.balance}>
          <IconCircles className={classes.balanceIcon} />
          {token.balance !== null ? formatCirclesValue(token.balance) : 0}
        </Typography>
      )}
    </Box>
  );
};

export default BalanceDisplayOrganization;
