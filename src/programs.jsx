import { useState } from "react";
import { useAuth } from "./Authcontent";
import Footer from "./Footer";
import Heading from "./Header";
import { Sidebar } from "./account";
import { useAuth4 } from "./AuthContent4";
export default function Programs() {
  const { user } = useAuth();
  const { transactions } = useAuth4();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const filteredTransactions = transactions.filter(
    (tx) => tx.type === "referral_bonus"
  );
  const referralTx = transactions.find((tx) => tx.type === "referral_bonus");

  const level = referralTx?.metadata?.level;
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  );
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
        <div className="dashboard">Affiliates</div>
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
      <table className="affiliate-table" cellpadding="4">
        <tbody>
          <tr>
            <td width="50%" class="item">
              Referrals:
            </td>
            <td width="50%" class="item">
              {user?.referrals || 0}
            </td>
          </tr>
          <tr>
            <td class="item">Active referrals:</td>
            <td class="item">{level ? level : 0}</td>
          </tr>
          <tr>
            <td class="item">Total referral commission:</td>
            <td class="item">${totalAmount ? totalAmount : 0.0}</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}
