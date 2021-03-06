import { Checkbox, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ExternalLink from '~/components/ExternalLink';
import translate from '~/services/locale';
import { TERMS_URL } from '~/utils/constants';

const CheckboxTerms = (props) => {
  return (
    <FormControlLabel
      checked={props.checked}
      control={<Checkbox />}
      label={<CheckboxTermsLabel />}
      onChange={props.onChange}
    />
  );
};

const CheckboxTermsLabel = () => (
  <Fragment>
    {translate('CheckboxTerms.checkboxLabel')}{' '}
    <ExternalLink href={TERMS_URL}>
      {translate('CheckboxTerms.checkboxLink')}
    </ExternalLink>
  </Fragment>
);

CheckboxTerms.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxTerms;
