import React, { useState, useEffect } from "react";

const CookieBanner = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // always on
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setIsVisible(true);
    } else if (onConsentChange) {
      onConsentChange(consent === "accepted");
    }
  }, [onConsentChange]);

  const saveConsent = (accepted, customPrefs = null) => {
    const consentValue = accepted ? "accepted" : "declined";
    localStorage.setItem("cookieConsent", consentValue);

    if (customPrefs) {
      localStorage.setItem("cookiePreferences", JSON.stringify(customPrefs));
    }

    setIsVisible(false);
    setShowPreferences(false);

    // Notify parent component (e.g., enable/disable login)
    if (onConsentChange) {
      onConsentChange(accepted);
    }
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleDeclineAll = () => {
    saveConsent(false);
  };

  const handleSavePreferences = () => {
    // Only allow login if necessary cookies are accepted (they always are)
    const accepted = preferences.necessary;
    saveConsent(accepted, preferences);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%) ",
        width: "90%",
        maxWidth: "600px",
        background: "#1a1a2e",
        color: "#fff",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
        border: "1px solid #333",
        zIndex: 10000,
      }}
    >
      <h3 style={{ margin: "0 0 12px", fontSize: "20px" }}>We use cookies</h3>

      <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
        We use cookies to make your experience better, keep your account secure,
        and provide analytics. Essential cookies are always on. You can choose
        others below.
      </p>

      {!showPreferences ? (
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleAcceptAll}
            style={{
              background: "#00d4ff",
              color: "#000",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "140px",
            }}
          >
            Accept All
          </button>

          <button
            onClick={() => setShowPreferences(true)}
            style={{
              background: "transparent",
              color: "#00d4ff",
              border: "1px solid #00d4ff",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "140px",
            }}
          >
            Manage Preferences
          </button>

          <button
            onClick={handleDeclineAll}
            style={{
              background: "transparent",
              color: "#aaa",
              border: "1px solid #555",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Decline All
          </button>
        </div>
      ) : (
        <div>
          <h4 style={{ margin: "0 0 16px", fontSize: "16px" }}>
            Customize your preferences
          </h4>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <input type="checkbox" checked disabled />
              <span>
                <strong>Necessary</strong> – Required for the site to work
              </span>
            </label>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    analytics: e.target.checked,
                  })
                }
              />
              <span>
                <strong>Analytics</strong> – Helps us improve the app
              </span>
            </label>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    marketing: e.target.checked,
                  })
                }
              />
              <span>
                <strong>Marketing</strong> – Personalized offers (optional)
              </span>
            </label>
          </div>

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              onClick={handleSavePreferences}
              style={{
                background: "#00d4ff",
                color: "#000",
                border: "none",
                padding: "12px 28px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Save Preferences
            </button>

            <button
              onClick={() => setShowPreferences(false)}
              style={{
                background: "transparent",
                color: "#aaa",
                border: "1px solid #555",
                padding: "12px 28px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p
        style={{
          marginTop: "20px",
          fontSize: "13px",
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        Read our{" "}
        <a href="/privacy" style={{ color: "#00d4ff" }}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms" style={{ color: "#00d4ff" }}>
          Terms of Service
        </a>
      </p>
    </div>
  );
};

export default CookieBanner;
