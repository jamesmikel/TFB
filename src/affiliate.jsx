import "./styles.css";
import Heading from "./Header";
import Footer from "./Footer";
export default function Affiliate() {
  return (
    <div>
      <Heading />
      <h1 className="affiliate-h1">AFFILIATE PROGRAM</h1>
      <div className="affiliate-js">
        <div className="affiliate-wrap-affiliate">
          <h3>
            <span>3 levels</span> referral commission
          </h3>
          <div class="affiliate">
            <div className="">
              <div class="affiliate-percent">
                <div class="number">
                  8<span>%</span>
                </div>
                <h4>
                  <span>Level1</span> Commission
                </h4>
              </div>
            </div>

            <div className="">
              <div class="affiliate-percent">
                <div class="number">
                  4<span>%</span>
                </div>
                <h4>
                  <span>Level2</span> Commission
                </h4>
              </div>
            </div>
            <div className="">
              <div class="affiliate-percent">
                <div class="number">
                  2<span>%</span>
                </div>
                <h4>
                  <span>Level3</span> Commission
                </h4>
              </div>
            </div>
          </div>

          <p>
            Trusted.finance.biz pays for the popularization of its investment
            program and anyone can be rewarded.To participate in this
            opportunity, we encourage you to inform your acquaintances, family
            members, or professional associates about our organization. You may
            generate substantial supplemental income through the referral
            compensation structure we have established.
          </p>
        </div>
      </div>
      <div className="program-div">
        <h3 className="affiliate-js-h3">
          HOW TO EARN MONEY THROUGH AFFILIATES
        </h3>
        <div className="program-wrap">
          <div className="program">
            <img src="https://i.imgur.com/3ODScLD.png" />
            <div className="program-ctn">
              <h2>Promote Trusted-finance.biz</h2>
              <p>
                Present our project to your friends, family, or any other
                community, advertise &amp; promote it everywhere and enjoy the
                financial benefits. You don't even need an active deposit to
                receive affiliate commission.
              </p>
            </div>
          </div>
          <div className="program">
            <img src="https://i.imgur.com/583Tpws.png" />
            <div className="program-ctn">
              <h2>Get Referrals & Earn</h2>
              <p>
                Once someone registers through your referral link, he
                automatically becomes your referral! You will receive 8%
                commission for every deposit that your direct referral makes
                from his wallet. We also offer a second level referral
                commission 4% and third level referral commission 2%.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer className="affiliate-footer" />
    </div>
  );
}
