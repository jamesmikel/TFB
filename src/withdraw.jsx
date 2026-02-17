import Footer from "./Footer";
import Heading from "./Header";
import { Sidebar } from "./account";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontent";
import { useToken } from "./TokenDetails";
export default function Withdrawal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chosenWallet, setChosenWallet } = useToken();
  const navigate = useNavigate();

  const { user } = useAuth();
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleWalletChange = (e) => {
    const value = e.target.value;
    setChosenWallet(value);

    return;
  };
  const handleSubmit = (e) => {
    if (!chosenWallet) {
      alert("Please select a wallet to proceed.");
      return;
    }
    navigate("/confirmation2");
  };

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
        <div className="dashboard">Make Withdrawal</div>
      </div>
      <div className="Signup-form" style={{ marginTop: "100px" }}>
        <table
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "100px",
          }}
        >
          <tr>
            <td>
              <div>
                <select
                  name="type"
                  id="wallet-select"
                  onChange={handleWalletChange}
                  className="select"
                  required
                  class="select"
                >
                  <option>Choose Wallet</option>
                  {Object.entries(user?.address)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
                      <option key={key} value={value}>
                        {key.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <button className="proceed-btn" onClick={handleSubmit}>
                  Proceed
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <Footer />
    </div>
  );
}

