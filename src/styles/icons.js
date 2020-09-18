import React from 'react';
import { SvgIcon } from '@material-ui/core';

import alert from '%/images/alert.svg';
import arrow from '%/images/arrow.svg';
import check from '%/images/check.svg';
import circles from '%/images/circles.svg';
import close from '%/images/close.svg';
import facebook from '%/images/facebook.svg';
import mail from '%/images/mail.svg';
import menu from '%/images/menu.svg';
import notification from '%/images/notification.svg';
import qr from '%/images/qr.svg';
import scan from '%/images/scan.svg';
import search from '%/images/search.svg';
import send from '%/images/send.svg';
import share from '%/images/share.svg';
import telegram from '%/images/telegram.svg';
import trust from '%/images/trust.svg';
import trustActive from '%/images/trust-active.svg';
import trustMutual from '%/images/trust-mutual.svg';
import twitter from '%/images/twitter.svg';

export const IconBack = (props) => {
  return <SvgIcon component={arrow} {...props} viewBox="0 0 12 18" />;
};

export const IconCheck = (props) => {
  return <SvgIcon component={check} viewBox="0 0 512 512" {...props} />;
};

export const IconCircles = (props) => {
  return <SvgIcon component={circles} viewBox="0 0 24 34" {...props} />;
};

export const IconClose = (props) => {
  return <SvgIcon component={close} {...props} viewBox="0 0 20 20" />;
};

export const IconFacebook = (props) => {
  return <SvgIcon component={facebook} {...props} viewBox="0 0 11 20" />;
};

export const IconMail = (props) => {
  return <SvgIcon component={mail} {...props} viewBox="0 0 21 18" />;
};

export const IconMenu = (props) => {
  return <SvgIcon component={menu} {...props} />;
};

export const IconNotification = (props) => {
  return <SvgIcon component={notification} {...props} viewBox="0 0 29 34" />;
};

export const IconAlert = (props) => {
  return <SvgIcon component={alert} {...props} viewBox="0 0 20 20" />;
};

export const IconQR = (props) => {
  return <SvgIcon component={qr} viewBox="0 0 18 18" {...props} />;
};

export const IconSearch = (props) => {
  return <SvgIcon component={search} {...props} viewBox="0 0 23 22" />;
};

export const IconSend = (props) => {
  return <SvgIcon component={send} {...props} viewBox="0 0 36 36" />;
};

export const IconScan = (props) => {
  return <SvgIcon component={scan} {...props} viewBox="0 0 21 21" />;
};

export const IconShare = (props) => {
  return <SvgIcon component={share} {...props} viewBox="0 0 26 28" />;
};

export const IconTelegram = (props) => {
  return <SvgIcon component={telegram} {...props} viewBox="0 0 21 20" />;
};

export const IconTrust = (props) => {
  return <SvgIcon component={trust} {...props} viewBox="0 0 27 29" />;
};

export const IconTrustActive = (props) => {
  return <SvgIcon component={trustActive} {...props} viewBox="0 0 25 27" />;
};

export const IconTrustMutual = (props) => {
  return <SvgIcon component={trustMutual} {...props} viewBox="0 0 25 29" />;
};

export const IconTwitter = (props) => {
  return <SvgIcon component={twitter} {...props} viewBox="0 0 21 18" />;
};