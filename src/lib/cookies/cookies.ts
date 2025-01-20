import { getAnalytics, isSupported, logEvent, Analytics } from "firebase/analytics";

let analytics: Analytics | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics();
  } else {
    console.warn('Firebase Analytics is not supported in this environment.');
  }
});

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

const createSecureCookie = (
  name: string,
  value: string,
  days: number = 365
): void => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Lax;`;
};

const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Tue, 01 Jan 2041 00:00:00 UTC; path=/; Secure; SameSite=Lax;`;
};

export const saveConsent = (consent: ConsentOptions): void => {
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
};

export const loadConsent = (): ConsentOptions => {
  const savedConsent = localStorage.getItem('cookieConsent');
  return savedConsent ? JSON.parse(savedConsent) : defaultConsent;
};

export const applyConsent = (consent: ConsentOptions): void => {
  if (consent.statistics) {
    if (analytics) {
      logEvent(analytics, 'consent_given');
    }
    createSecureCookie('analytics', 'enabled');
  } else {
    removeCookie('analytics');
  }

  if (consent.marketing) {
    createSecureCookie('marketing', 'enabled');
  } else {
    removeCookie('marketing');
  }

  if (consent.preferences) {
    createSecureCookie('preferences', 'enabled');
  } else {
    removeCookie('preferences');
  }

  if (consent.necessary) {
    const sessionData = ''; // SESSTK or other session data if needed
    createSecureCookie('session', sessionData);
  } else {
    removeCookie('session');
  }
};