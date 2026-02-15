import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "./Authcontent";
import "./styles.css";

function Heading() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout, loading } = useAuth();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Header">
      {" "}
      <Link to="/">
        <img
          src="https://i.imgur.com/897L614.png"
          alt="Trusted Finance"
          to="/home"
          height="80px"
          style={{ cursor: "pointer" }}
        />
      </Link>
      <button className="menu-toggle" onClick={handleToggle}>
        Menu
      </button>
      <div className={`Header-div ${isOpen ? "show" : ""}`}>
        <ul className="nav-links">
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
            <Link to="/affiliate">AFFILIATES</Link>
          </li>
          <li>
            <Link to="/support">SUPPORT</Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <>
            {" "}
            <Link to="/account" className="Account">
              Account
            </Link>
            <Link onClick={logout} to="/" className="Log-out">
              Logout
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/signup" className="Sign-up">
              Signup
            </Link>
            <Link to="/login" className="Log-in">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Heading;
