import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import ButtonRound from '~/components/ButtonRound';
import { FAQ_URL } from '~/components/ExternalLinkList';
import { NEEDED_TRUST_CONNECTIONS } from '~/utils/constants';
import { finalizeNewAccount } from '~/store/onboarding/actions';
import { showSpinnerOverlay, hideSpinnerOverlay } from '~/store/app/actions';

const ValidationStatus = (props, context) => {
  const dispatch = useDispatch();
  const { app, safe, trust } = useSelector((state) => state);

  // Attempt deployment if one of two conditions is met:
  //
  // 1. We have enough incoming trust connections, the Relayer will
  // pay for our fees
  // 2. We funded the Safe ourselves manually
  const isReady = safe.pendingIsFunded || trust.isTrusted;

  // Is deployment currently happening?!
  const isPending = safe.pendingIsLocked;

  const onDeploy = async () => {
    dispatch(showSpinnerOverlay());
    await dispatch(finalizeNewAccount());
    dispatch(hideSpinnerOverlay());
  };

  // Safe and Token is already deployed?
  if (app.isValidated) {
    return null;
  }

  return (
    <Fragment>
      {isPending ? (
        <Fragment>
          <p>{context.t('ValidationStatus.pendingDeployment')}</p>
          <CircularProgress />
        </Fragment>
      ) : isReady ? (
        <Fragment>
          <p>{context.t('ValidationStatus.readyForDeployment')}</p>

          <ButtonRound onClick={onDeploy}>
            <span>{context.t('ValidationStatus.startDeploymentButton')}</span>
          </ButtonRound>
        </Fragment>
      ) : trust.isReady ? (
        <Fragment>
          {new Array(NEEDED_TRUST_CONNECTIONS).fill({}).map((item, index) => {
            return (
              <div key={index}>
                {index <= trust.connections - 1 ? 'x' : '-'}
              </div>
            );
          })}

          <p>
            {context.t('ValidationStatus.trustDescription', {
              connections: trust.connections,
              left: Math.max(0, NEEDED_TRUST_CONNECTIONS - trust.connections),
            })}{' '}
            <a href={FAQ_URL} rel="noopener noreferrer" target="_blank">
              {context.t('ValidationStatus.learnMore')}
            </a>
          </p>
        </Fragment>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

ValidationStatus.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default ValidationStatus;
