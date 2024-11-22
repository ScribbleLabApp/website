export type ConsentOptions = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

const defaultConsent: ConsentOptions = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
};

export const saveConsent = (consent: ConsentOptions): void => {
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
};

export const loadConsent = (): ConsentOptions => {
  const savedConsent = localStorage.getItem('cookieConsent');
  return savedConsent ? JSON.parse(savedConsent) : defaultConsent;
};

export const createCookie = (
  name: string,
  value: string,
  days: number = 365
): void => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
};

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const applyConsent = (consent: ConsentOptions): void => {
  if (consent.statistics) {
    const { analytics } = require('../firebase');
    analytics.logEvent('consent_given');
  } else {
    removeCookie('analytics');
  }

  if (consent.marketing) {
    createCookie('marketing', 'enabled');
  } else {
    removeCookie('marketing');
  }

  if (consent.preferences) {
    createCookie('preferences', 'enabled');
  } else {
    removeCookie('preferences');
  }
};
