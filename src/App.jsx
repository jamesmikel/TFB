import "./styles.css";
import { useState } from "react";
import { Route, Routes, Router } from "react-router-dom";
import About from "./about";
import Home from "./home";
import FAQ from "./faq";
import Affiliate from "./affiliate";
import Terms from "./terms";
import Support from "./support";
import Signup from "./signup";
import Login from "./login";
import CookieBanner from "./cookiebanner";
import Account from "./account";
import TopMovers from "./topmovers";
import Investors from "./Investors";
import PopularTokens from "./populartokens";
import ProfilePicUploader from "./profilepicuploader";
import PrivacyPolicy from "./privacy";
import ForgotPassword from "./forgotpassword";
import ResetPassword from "./resetpassword";
import Deposit from "./Deposit";
import Withdrawal from "./withdraw";
import ConfirmDeposit from "./confirmation";
import ConfirmWithdrawal from "./confirmation2";
import CoinPage from "./coinPage";
import Dashboard from "./dashboard";
import DepositHistory from "./deposits-history";
import WithdrawalHistory from "./withdrawals-history";
import Programs from "./programs";
import TransactionHistory from "./Transactions";
import Edit_Account from "./settings";
import { useAuth } from "./Authcontent";

export default function App() {
  const { isLoggedIn } = useAuth();

  const [canUseCookies, setCanUseCookies] = useState(
    localStorage.getItem("cookieConsent") === "accepted"
  );

  return (
    <div>
      {" "}
      <CookieBanner onConsentChange={setCanUseCookies} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/affiliate" element={<Affiliate />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<ProfilePicUploader />} />
        <Route path="/topmovers" element={<TopMovers />} />
        <Route path="/populartokens" element={<PopularTokens />} />
        <Route path="/contact" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path={isLoggedIn ? "/account" : "/"} element={<Account />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path={isLoggedIn ? "/investors" : "/"} element={<Investors />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path={isLoggedIn ? "/account/deposit" : "/"}
          element={<Deposit />}
        />
        <Route path="/confirmation" element={<ConfirmDeposit />} />
        <Route path="/confirmation2" element={<ConfirmWithdrawal />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route
          path={isLoggedIn ? "/account/withdraw" : "/"}
          element={<Withdrawal />}
        />
        <Route
          path={isLoggedIn ? "/settings" : "/"}
          element={<Edit_Account />}
        />
        <Route
          path={isLoggedIn ? "/history" : "/"}
          element={<TransactionHistory />}
        />

        <Route path={isLoggedIn ? "/programs" : "/"} element={<Programs />} />
        <Route
          path={isLoggedIn ? "/withdrawals-history" : "/"}
          element={<WithdrawalHistory />}
        />
        <Route
          path={isLoggedIn ? "/deposits-history" : "/"}
          element={<DepositHistory />}
        />

        <Route path={isLoggedIn ? "/dashboard" : "/"} element={<Dashboard />} />
      </Routes>
    </div>
  );
}
