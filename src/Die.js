import "./App.css";
export default function Die(props) {
  return (
    <div
      className={props.isHeld ? "die-face-green" : "die-face"}
      onClick={props.holdDice}
    >
      <h4 className="die-num">{props.value}</h4>
    </div>
  );
}
