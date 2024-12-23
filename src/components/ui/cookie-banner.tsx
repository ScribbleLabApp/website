'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { applyConsent } from '@/lib/cookies/cookies';

export const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const [consent, setConsent] = useState({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setIsVisible(false);
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      applyConsent(parsedConsent);
    }
  }, []);

  const handleAccept = () => {
    const allConsent = {
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    };

    setConsent(allConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    applyConsent(allConsent);
    setIsVisible(false);
  };

  const handleSelection = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    applyConsent(consent);
    setIsVisible(false);
  };

  const handleDecline = () => {
    const noConsent = {
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    };

    setConsent(noConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(noConsent));
    applyConsent(noConsent);
    setIsVisible(false);
  };

  const handleSwitchChange = (key: keyof typeof consent, value: boolean) => {
    setConsent((prev) => ({ ...prev, [key]: value }));
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 dark:text-white bg-white dark:bg-black p-4 rounded-2xl shadow-lg max-w-xs w-full border-2 border-black dark:border-white">
        <p className="text-sm text-black dark:text-white">
          We use cookies to analyze site performance and deliver personalized
          content. By clicking <strong>“Allow all”</strong> or “Allow
          selection,” you consent to the storing of cookies. You can revoke your
          consent at any time. Learn more about this in our{' '}
          <a
            href="/privacy-policy"
            className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 underline"
          >
            <strong>privacy policy</strong>
          </a>
          .
        </p>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsOptionsVisible(!isOptionsVisible)}
              className="bg-white dark:bg-transparent text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 border-2 border-black dark:border-white hover:border-orange-500 dark:hover:border-orange-500 px-4 py-2 rounded-3xl text-sm flex-1"
            >
              <strong>{isOptionsVisible ? 'Hide options' : 'Options'}</strong>
            </button>

            <button
              onClick={handleAccept}
              className="bg-orange-500 hover:bg-black dark:hover:bg-white text-white dark:hover:text-black px-4 py-2 rounded-3xl text-sm border-2 border-black dark:border-white flex-1"
            >
              <strong>Allow all</strong>
            </button>
          </div>

          {isOptionsVisible && (
            <div className="mt-4">
              <div className="mb-4">
                <h4 className="font-semibold">Select</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Switch checked={true} disabled={true} />
                    <span className="ml-2">Necessary</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch
                      checked={consent.preferences}
                      onChange={(e) =>
                        handleSwitchChange(
                          'preferences',
                          (e.target as HTMLInputElement).checked
                        )
                      }
                    />
                    <span className="ml-2">Preferences</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch
                      checked={consent.statistics}
                      onChange={(e) =>
                        handleSwitchChange(
                          'statistics',
                          (e.target as HTMLInputElement).checked
                        )
                      }
                    />
                    <span className="ml-2">Statistics & Analytics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch
                      checked={consent.marketing}
                      onChange={(e) =>
                        handleSwitchChange(
                          'marketing',
                          (e.target as HTMLInputElement).checked
                        )
                      }
                    />
                    <span className="ml-2">Marketing</span>
                  </label>
                </div>
              </div>
              <button
                onClick={handleSelection}
                className="w-full border-2 border-black dark:border-white hover:border-orange-500 dark:hover:border-orange-500 text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 px-4 py-2 rounded-3xl text-sm"
              >
                <strong>Allow selection</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};