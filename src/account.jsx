import "./styles.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Heading from "./Header";
import PopularTokens from "./populartokens";
import Investors from "./Investors";
import TopMovers from "./topmovers";
import Footer from "./Footer";
import { useToken } from "./TokenDetails";
import { useAuth } from "./Authcontent";
import { useAuth3 } from "./AuthContent3";
export function Sidebar({ open }) {
  const [clicked, setClicked] = useState(false);
  const { isLoggedIn, loading, user, logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate, confirm]);

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          {" "}
          <Link to="/deposits-history">Deposits</Link>
        </li>
        <li>
          <Link to="/withdrawals-history">Withdrawals</Link>
        </li>
        <li>
          <Link to="/programs">Affiliates</Link>
        </li>
        <li>
          <Link to="/history">Transactions</Link>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <div className={`acct-popup ${clicked && open ? "show" : ""}`}>
        <p
          className="edit"
          onClick={() => {
            navigate("/settings");
          }}
        >
          Edit Account
        </p>
        <p className="log" onClick={logout}>
          Log out
        </p>
      </div>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 text-gray-900"
        style={{
          display: `${clicked && open ? "" : "none"}`,
          position: "absolute",
          left: "130px",
          bottom: "180px",
          height: "40px",
        }}
      >
        <g>
          <path d="M2 7h20L12 18 2 7z" fill="#02030b" />
        </g>
      </svg>
      <div
        className="acct-profile"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <img src={user.profile_pic} alt="profile-img" />
        <div>
          <p>{user.full_name}</p>
          <p>@{user.username}</p>
        </div>

        <div className="svg">...</div>
      </div>
    </div>
  );
}

export default function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, loading } = useAuth();
  const { miningPlan } = useAuth3();

  const navigate = useNavigate();
  useEffect(() => {
    if (miningPlan?.profitComplete === true) {
      alert("Operation concluded!");
      return;
    }
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);
  // Redirect if not logged in

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div>
      <Heading />{" "}
      <svg
        className="hamburger"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 80"
        width="30"
        height="30"
        fill="#ffff"
        onClick={toggleSidebar}
        style={{ marginTop: "", cursor: " pointer" }}
      >
        <rect width="100" height="20" rx="10" />
        <rect y="30" width="100" height="20" rx="10" />
        <rect y="60" width="100" height="20" rx="10" />
      </svg>
      <div className="dashboard-ctn" style={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} />{" "}
        <div className="dashboard">Dashboard</div>
      </div>
      <div className="Money-box">
        $<CountUp end={miningPlan?.totalBalance} duration={1.5} decimals={2} />
        <br />
        <span className="Money-box2 text-green-400 ">
          ${miningPlan?.currentProfit} (+{miningPlan?.profitPercentage}%)
        </span>
      </div>
      <div className="dashboard-section">
        <ul>
          <li>
            <Link to="/account/deposit">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8L12 13L17 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 13V3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Deposit
            </Link>
          </li>
          <li>
            <Link to="/account/withdraw">
              <svg
                className="svg2"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 16L12 11L17 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 11V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Withdraw
            </Link>
          </li>
        </ul>
      </div>
      <TopMovers>
        <Investors />
      </TopMovers>
      <div style={{ marginBottom: "100px" }}></div>
      <PopularTokens />
      <div className="top" style={{ marginBottom: "100px" }}></div>
      <Footer />
    </div>
  );
}

