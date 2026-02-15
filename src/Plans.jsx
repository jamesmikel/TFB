import "./styles.css";

export default function Plan(props) {
  return (
    <div className="plan-box">
      <img src={props.img} alt={props.alt} className="btc-img" />

      <div className="row">
        <div className="plan-top">
          <div className="Column">
            <div className="percent">
              {props.No}
              <span>%</span>
            </div>
          </div>
          <div className="Column2">
            <p>
              after
              <br />
              {props.hours} hours
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="">
          <ul>
            <li>
              <img src="https://i.imgur.com/U2pTs72.png" /> Minimum:{" "}
              <span>${props.min}</span>
            </li>
            <li>
              <img src="https://i.imgur.com/U2pTs72.png" /> Maximum:{" "}
              <span>${props.max}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
