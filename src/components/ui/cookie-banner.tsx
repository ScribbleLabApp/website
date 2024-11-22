"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false); // For toggle options panel

  useEffect(() => {
    const consentGiven = localStorage.getItem("analyticsConsent");
    if (consentGiven === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("analyticsConsent", "true");
    setIsVisible(false);
    // Optionally, enable analytics or track initial event
    if (typeof window !== "undefined") {
      const { analytics } = require("../../lib/firebase");
      analytics.logEvent("consent_given");
    }
  };

  const handleDecline = () => {
    localStorage.setItem("analyticsConsent", "false");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 dark:text-white bg-white dark:bg-black p-4 rounded-2xl shadow-lg max-w-xs w-full border-2 border-black dark:border-white">
        <p className="text-sm text-black dark:text-white">
          We use cookies to analyze site performance and deliver personalized content. By clicking
          <strong> “Allow all” </strong> or “Allow selection” you consent to the storing of cookies. You can revoke your consent at any time. Learn more about this in our{" "}
          <a
            href="/privacy-policy"
            className="text-black hover:text-orange-500 underline"
          >
            <strong>privacy policy</strong>
          </a>
          .
        </p>
        
        {/* Toggle Buttons Container */}
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsOptionsVisible(!isOptionsVisible)}
              className="bg-white text-black hover:text-orange-500 border-2 border-black hover:border-orange-500 px-4 py-2 rounded-3xl text-sm flex-1"
            >
              <strong>{isOptionsVisible ? "Hide options" : "Options"}</strong>
            </button>

            <button
              onClick={handleAccept}
              className="bg-orange-500 hover:bg-black text-white px-4 py-2 rounded-3xl text-sm border-2 border-black flex-1"
            >
              <strong>Allow all</strong>
            </button>
          </div>

          {/* Options Panel */}
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
                    <Switch />
                    <span className="ml-2">Preferences</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch />
                    <span className="ml-2">Statistics & Analytics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Switch />
                    <span className="ml-2">Marketing</span>
                  </label>
                </div>
              </div>
              <button className="w-full border-2 border-black hover:border-orange-500 text-black hover:text-orange-500 px-4 py-2 rounded-3xl text-sm">
                <strong>Allow selection</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};