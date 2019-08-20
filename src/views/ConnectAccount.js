import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BackButton from '~/components/BackButton';
import Button from '~/components/Button';
import QRCode from '~/components/QRCode';

const ConnectAccount = (props, context) => {
  const { address } = useSelector(state => state.wallet);

  return (
    <Fragment>
      <BackButton />
      <QRCode data={address} width={250} />

      <Link to="/welcome/seed">
        <Button>{context.t('views.connect.seed')}</Button>
      </Link>
    </Fragment>
  );
};

ConnectAccount.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default ConnectAccount;