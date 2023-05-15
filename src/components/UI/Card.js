import s from "./Card.module.scss";
import SwitchMetric from "../Input/SwitchMetrics";

function Card(props) {

  return (
    <div className={`${s.card} ${props.className}`}>
        <div className={s['card__actions']}>
          {props.title === "Splits" ? <SwitchMetric handleSwitchToMiles={props.handleSwitchToMiles}/> : ''}
        </div>
        <h2 className={s["card__title"]}>{props.title}</h2>
        {props.children}
    </div>
  )
}
export default Card