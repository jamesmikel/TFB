import Heading from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Authcontent";
import { useAuth3 } from "./AuthContent3";
import { useAuth4 } from "./AuthContent4";
import { Sidebar } from "./account";
function Plan(props) {
  return (
    <div className="plan-box">
      <img src={props.img} alt={props.alt} className="btc-img" />

      <div className="row">
        <div
          className="plan-top "
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="Column">
            <div className="percent">{props.No}</div>
          </div>
          <div className="Column2">
            <p>{props.p}</p>
            <div style={{ padding: "20px" }}></div>
          </div>
          <div
            style={{
              background: "#07091a",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <p>
              {props.text}:<span style={{ marginLeft: "" }}>{props.no2}</span>
            </p>
          </div>
          <Link
            to="/account"
            style={{
              padding: "20px",
              background: "#07091a",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <span>{props.button}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
function User(props) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "95px",
          background: "#07091a",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <div>
          <h3>{props.h3}</h3>
          <p style={{ color: "silver" }}>{props.text}</p>
        </div>
        <div>
          <img src={props.img} />
        </div>
      </div>
    </div>
  );
}
export default function Dashboard() {
  const { user, ip } = useAuth();
  const { miningPlan } = useAuth3();
  const { transactions } = useAuth4();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const filteredWithdrawals = transactions.filter(
    (tx) => tx.type.toLowerCase() === "withdrawal"
  );

  const filteredDeposits = transactions.filter(
    (tx) => tx.type.toLowerCase() === "deposit"
  );
  console.log(filteredWithdrawals);

  const totalAmount = filteredWithdrawals.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  );
  const totalAmount2 = filteredDeposits.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  );

  const date = new Date(user.created_at);
  return (
    <div>
      <Heading />
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
      <div style={{ paddingBottom: "20px" }}> </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "72%",
          margin: "auto",
          paddingBottom: "20px",
          color: "#fff",
          fontFamily: "Montserrat",
        }}
      >
        {" "}
        <User
          h3={user.username.toUpperCase()}
          text="Your Username"
          img="https://i.imgur.com/h9hrWnF.png"
        />
        <User
          h3={date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          text="Registration Date"
          img="https://i.imgur.com/RqXqPHW.png"
        />
        <User
          h3={ip}
          text="Current IP Address"
          img="https://i.imgur.com/iQDXqJY.png"
        />
      </div>
      <div
        className="plan-box-div plan-box-div2"
        style={{ margin: "auto", gap: "20px", width: "72%" }}
      >
        {" "}
        <Plan
          No={`$${
            parseFloat(miningPlan?.totalBalance).toFixed(2)
              ? parseFloat(miningPlan?.totalBalance).toFixed(2)
              : "0"
          }`}
          p="Account Balance"
          img="https://i.imgur.com/IAGWm1J.png"
          text="Total Deposit"
          no2={`$${miningPlan?.deposit ? miningPlan?.deposit : "0"}`}
          button="Make Deposit"
        />
        <Plan
          No={`$${
            parseFloat(miningPlan?.currentProfit).toFixed(2)
              ? parseFloat(miningPlan?.currentProfit).toFixed(2)
              : "0"
          }`}
          p="Earned Total"
          text="Total Withdrew"
          no2={`$${totalAmount ? totalAmount.toFixed(2) : 0.0}`}
          button="Withdraw"
          img="https://i.imgur.com/5oU4ELa.png"
        />
        <Plan
          No={`$${
            parseFloat(miningPlan?.totalBalance).toFixed(2)
              ? parseFloat(miningPlan?.totalBalance).toFixed(2)
              : "0"
          }`}
          p="Active Deposit"
          text="Last Deposits"
          no2={`$${totalAmount2 ? totalAmount2 : 0.0}`}
          img="https://i.imgur.com/7sgckG2.png"
        />
      </div>
      <div className="affiliate-link">
        <p>Referral Link:</p>
        <p className="h2">
          <a
            href={`http://trusted-finance.biz/?ref=${user.username}`}
            target="_blank"
          >
            http://trusted-finance.biz/signup?ref={user.username}
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

