import s from "./Card.module.scss";
import bs from '../UI/Button.module.scss';
import { IoIosCreate } from "react-icons/io";
import SwitchMetric from "../Input/SwitchMetrics";
import AddDeleteGoals from "../Input/AddDeleteGoals";
import Button from "./Button";

function Card(props) {

  return (
    <div className={`${s.card} ${props.className}`}>
        <div className={s['card__actions']}>
          {props.title === "Splits" ? <SwitchMetric className={s['card__buttons']} handleSwitchToMiles={props.handleSwitchToMiles}/> : ''}
          {props.title === 'Goals' ? <AddDeleteGoals className={s['card__buttons']} /> : ''}
          {props.title === 'Preview' ? <Button text="Generate markdown" icon={<IoIosCreate className={bs['button__icon']}/>}/> : ''}
        </div>
        <h2 className={s["card__title"]}>{props.title}</h2>
        {props.children}
    </div>
  )
}
export default Card