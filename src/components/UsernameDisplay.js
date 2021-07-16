import PropTypes from 'prop-types';
import React from 'react';

import { useUserdata } from '~/hooks/username';

const UsernameDisplay = (props) => {
  const { username } = useUserdata(props.address);
  return `@${username}`;
};

UsernameDisplay.propTypes = {
  address: PropTypes.string.isRequired,
};

export default React.memo(UsernameDisplay);
