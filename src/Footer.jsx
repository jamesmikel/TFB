import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  var showtime = 5000;
  var hidetime = 3000;
  const [OnTime, setOnTime] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      // Show the footer
      setOnTime(true);

      // Hide the footer after hidetime
      const timeout = setTimeout(() => {
        setOnTime(false);
      }, hidetime);

      // Clean up the timeout when the component unmounts or interval runs again
      return () => clearTimeout(timeout);
    }, showtime);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  const openWhatsapp = () => {
    window.open("", "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>
            {new Date().getFullYear()} © TRUSTED-FINANCE.BIZ ALL RIGHTS
            RESERVED.
          </p>
        </div>

        <div className="footer-right">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT US</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/terms">TERMS</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="whatsapp-widget">
        <div className="whatsapp" onClick={openWhatsapp}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            width="30"
            height="30"
          />
        </div>
        <div
          className="chat-me"
          style={{ display: `${OnTime ? "block" : "none"} ` }}
        >
          <p>Need Help? Chat with us!</p>
        </div>
      </div>
      <div className="telegram-widget">
        <div className="telegram-icn">
          <a href="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
              alt="Telegram Icon"
              width="60px"
              height="60px"
            />
          </a>
        </div>
        <div
          className="chat-text"
          style={{ display: `${OnTime ? "block" : "none"}` }}
        >
          Need help? Chat with us!
        </div>
      </div>
    </footer>
  );
}
