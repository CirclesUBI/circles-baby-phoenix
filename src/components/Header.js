import { AppBar, Toolbar, useScrollTrigger } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    minHeight: theme.custom.components.appBarHeight,
    justifyContent: 'space-between',
  },
}));

const Header = ({ children, className, ...props }) => {
  const classes = useStyles();

  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      className={clsx(classes.appBar, className)}
      color="transparent"
      elevation={isScrolled ? 2 : 0}
      position="fixed"
      {...props}
    >
      <Toolbar className={classes.toolbar}>{children}</Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Header;
