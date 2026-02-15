import "./styles.css";

export default function Offers(props) {
  return (
    <div className="offer-box">
      <img src={props.src} />
      <h3>{props.h3}</h3>
    </div>
  );
}
