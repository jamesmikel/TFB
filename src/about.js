import "./styles.css";
import Heading from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <div>
      <Heading />
      <h1 className="about-head">
        ABOUT <span>TRUSTED-FINANCE.BIZ</span>
      </h1>

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
                <a href="" className="cert" target="_blank">
                  <img src="https://i.imgur.com/3FMAM41.png" alt="" />
                  <font>
                    Download <br /> <span>Certificate</span>
                  </font>
                </a>
                <a href="" className="cert" target="_blank">
                  <img src="https://i.imgur.com/ltlaYXu.png" alt="" />
                  <font>
                    view company <br />
                    <span>profile</span>
                  </font>
                </a>
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
                    <p>admin@Trusted-Finance.biz</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="B-Image"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
