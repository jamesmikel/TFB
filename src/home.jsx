import "./styles.css";
import { React, useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Heading from "./Header";
import Plan from "./Plans";
import Offers from "./offer";
import Info from "./info";
import Footer from "./Footer";
import { useAuth } from "./Authcontent";
export default function Home() {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [detail, setDetail] = useState({
    Days: 5536,
    Withdrawal: 460291961.41,
    Deposit: 3109112483.64,
    Members: 257685,
  });
  const Arr = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 100000),
  ];
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const lastdate = localStorage.getItem("lastIncrementedDate");
    const today = new Date().toDateString();

    if (lastdate !== today) {
      setDetail((prev) => ({
        ...prev,
        Days: prev.Days + 1,
      }));
      localStorage.setItem("lastIncrementedDate", today);
    }

    const randint = Math.floor(
      Math.random() * Arr[Math.floor(Math.random() * Arr.length)]
    );

    const randint2 = Math.floor(
      Math.random() * Arr[Math.floor(Math.random() * Arr.length)]
    );

    const rand_time = Math.floor(Math.random() * 10000);
    const rand_time2 = Math.floor(Math.random() * 10000);
    const rand_time3 = Math.floor(Math.random() * 100000);
    function Update_Deposit() {
      setDetail((prev) => ({
        ...prev,
        Deposit: prev.Deposit + randint,
      }));
    }

    function Update_Withdrawal() {
      setDetail((prev) => ({
        ...prev,
        Withdrawal: prev.Withdrawal + randint2,
      }));
    }
    function Update_Members() {
      setDetail((prev) => ({
        ...prev,
        Members: prev.Members + 1,
      }));
    }
    const interval = setInterval(Update_Deposit, rand_time);
    const interval2 = setInterval(Update_Withdrawal, rand_time2);
    const interval3 = setInterval(Update_Members, rand_time3);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  });

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          "https://api.coinlore.net/api/ticker/?id=90"
        );
        const data = await response.json();
        const data1 = data[0];

        setPrice(data1.price_usd);
        setChange(data1.percent_change_24h);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    }

    fetchPrice();

    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <Heading />

      <div className="first-section">
        <div className="bitcoin-price">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGL9XV-QqLNr9o_K1-MibRFn1Dk8MgNmUOtnNA9K6xikvqS80"
            alt="Bitcoin"
            height="58px"
          />
          <div className="price">
            <p>Bitcoin Price:</p>
            <span className="bitCoin">
              $
              {price ? (
                <>
                  <CountUp
                    end={parseFloat(price)}
                    decimals={5}
                    duration={1.5}
                    separator=","
                  />
                  <span
                    style={{
                      color: change >= 0 ? "limegreen" : "red",
                      marginLeft: "6px",
                    }}
                  >
                    ({change}%)
                  </span>
                </>
              ) : (
                "Loading..."
              )}
            </span>
          </div>
        </div>
        <div className="Title">
          <h1>
            BEST <span>crypto</span>
            <br />
            mining platform
          </h1>
          <p>Highest profit made from the crypto actives</p>
          {isLoggedIn ? (
            <>
              {" "}
              <Link to="/account" className="Access ">
                Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="Access">
                open account
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="plan-div">
        <h1>
          Investment <span> Plans </span>
        </h1>
        <div className="plan-box-div">
          <Plan
            img="https://i.imgur.com/UpKnHkY.png"
            alt="Bitcoin"
            No="4"
            hours="1"
            min="30"
            max="100"
          />
          <Plan
            img="https://i.imgur.com/FHopEbM.png"
            alt="Bitcoin"
            No="10"
            hours="6"
            min="100"
            max="1000"
          />
          <Plan
            img="https://i.imgur.com/aOBK9AG.png"
            alt="Bitcoin"
            No="20"
            hours="12"
            min="1000"
            max="10000"
          />
          <Plan
            img="https://i.imgur.com/UpKnHkY.png"
            alt="Bitcoin"
            No="20"
            hours="18"
            min="10000"
            max="100000"
          />
          <Plan
            img="https://i.imgur.com/FHopEbM.png"
            alt="Bitcoin"
            No="40"
            hours="24"
            min="50000"
            max="100000"
          />
          <Plan
            img="https://i.imgur.com/aOBK9AG.png"
            alt="Bitcoin"
            No="20"
            hours="1"
            min="1000"
            max="10000"
          />
        </div>
      </div>
      <div className="hero-section">
        <div className=" first-div">
          <div className="welcome-inner">
            <div className="container">
              <h1>Trusted-Finance.biz</h1>
              <hr />
              <p>
                This cryptocurrency platform is designed for individuals and
                institutions seeking a secure, transparent, and high-performing
                environment to grow their digital assets. With a focus on
                stability, real-time market analytics, and responsible
                investment strategies, we offer clients the opportunity to earn
                consistent returns through carefully managed cryptocurrency
                portfolios. Backed by experienced professionals and fortified by
                advanced security protocols, our platform ensures your capital
                works efficiently — around the clock. Whether you're new to
                digital finance or a seasoned investor, Trusted-Finance.biz
                provides a seamless, trustworthy experience that prioritizes
                your financial goals. Additionally, our platform features robust
                risk management tools to safeguard your investments,
                cutting-edge technology for enhanced trading efficiency, and a
                dedicated support team available 24/7 to assist you. We also
                offer educational resources to empower your decision-making,
                regular market insights to keep you informed, and flexible
                account options tailored to your unique investment needs.
              </p>
              <Link to="/about">More info</Link>
            </div>
          </div>
        </div>
        <div className="company-container">
          <div className="company">
            <div className="company-left">
              <div className="about-top">
                <h5>uk registered company:</h5>
                <h3>
                  Trusted-Finance.Biz <br />
                  <span>#12201592</span>
                </h3>
              </div>

              <div className="about-buttons">
                <a
                  href="https://i.imgur.com/xg8t0Nd.png"
                  className="cert"
                  target="_blank"
                >
                  <img src="https://i.imgur.com/3FMAM41.png" alt="" />
                  <font>
                    Download <br /> <span>Certificate</span>
                  </font>
                </a>
                <Link to="/about" className="cert" target="_blank">
                  <img src="https://i.imgur.com/ltlaYXu.png" alt="" />
                  <font>
                    view company <br />
                    <span>profile</span>
                  </font>
                </Link>
              </div>
            </div>
          </div>
          <div className="company2">
            <div className="company-right">
              <div className="contact-block-wrap">
                <div className="contact-block">
                  <img src="https://i.imgur.com/Mm4tV8j.png" alt="" />
                  <div className="contact-right">
                    <h1>Company Location:</h1>
                    <p>1 Holbein Place, London, England, SW1W 8NS</p>
                  </div>
                </div>
                <div className="contact-block contact-block2">
                  <img src="https://i.imgur.com/nB3IzKp.png` " alt="" />
                  <div className="contact-right">
                    <h1>E-mail Address:</h1>
                    <p>admin@trusted-finance.biz</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="B-Image"></div>
          </div>
        </div>
      </div>
      <div className="offer-ctn">
        <h1>
          What we provide to <span style={{ color: "" }}>investors</span>
        </h1>
        <div className="offers">
          <Offers
            src="https://i.imgur.com/777MH9D.png"
            h3="Comodo SSL Certificate"
          />
          <Offers
            src="https://i.imgur.com/UfKn4z4.png"
            h3="AntiDDoS
            Protection"
          />
          <Offers
            src="https://i.imgur.com/PjWweYk.png"
            h3="Dedicated
            Server"
          />
          <Offers
            src="https://i.imgur.com/LEghf8j.png"
            h3="Instant
            Withdrawals"
          />
        </div>
      </div>
      <div className="final-div">
        <div class="affiliate-wrap">
          <h3>
            <span>2 levels</span> referral commission
          </h3>
          <div class="affiliate">
            <div className="">
              <div class="affiliate-percent">
                <div class="number">
                  5<span>%</span>
                </div>
                <h4>
                  <span>Level1</span> Commission
                </h4>
              </div>
            </div>

            <div>
              <div class="affiliate-percent">
                <div class="number">
                  1<span>%</span>
                </div>
                <h4>
                  <span>Level2</span> Commission
                </h4>
              </div>
            </div>
          </div>

          <p>
            Trusted.finance.biz pays for the popularization of its investment
            program that provides individual rewards & benefits. To participate
            in this opportunity, we encourage you to inform your acquaintances,
            family members, or professional associates about our services. You
            may generate substantial supplemental income through the
            organization referral compensation structure we have established.
          </p>
        </div>
        <div className="info-pack">
          <Info
            src="https://i.imgur.com/EZXK3dM.png"
            h3={<CountUp end={detail.Members} duration={1.5} separator="," />}
            p="Total Members"
          />
          <Info
            src="https://i.imgur.com/wYbEG4k.png"
            h3={
              <>
                ${""}
                <CountUp end={detail.Deposit} duration={1.5} separator="," />
              </>
            }
            p="total deposited"
          />
          <Info
            src="https://i.imgur.com/LGs7pF2.png"
            h3={<CountUp end={detail.Days} duration={1.5} separator="," />}
            p="days online"
          />
          <Info
            src="https://i.imgur.com/dmuh6NE.png"
            h3={
              <>
                ${""}
                <CountUp end={detail.Withdrawal} duration={1.5} separator="," />
              </>
            }
            p="Total Withdrawal"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
