import "./styles.css";

export default function Info(props) {
  return (
    <div className="info-wrap">
      <img src={props.src} />
      <div className="Info-ctn">
        <h3>{props.h3}</h3>
        <p>{props.p}</p>
      </div>
    </div>
  );
}
