import { useContext } from "react";
import AppContext from "../Context/app-context";
import s from "./Card.module.scss";
import SwitchMetric from "../Input/SwitchMetrics";
import AddDeleteSplits from "../Input/AddDeleteSplits";
import AddDeleteGoals from "../Input/AddDeleteGoals";
import AddDeleteTextSection from "../Input/AddDeleteTextSection";

function Card(props) {
  const ctx = useContext(AppContext);

  return (
    <div className={`${s.card} ${props.className}`}>
      <div className={s['card__header']}>
        <h2 className={s["card__title"]}>{props.title}</h2>
        <div className={s['card__actions']}>
          {props.title === "Splits" ? 
            <div className="flex">
              <SwitchMetric className={s['card__buttons']} handleSwitchToMiles={props.handleSwitchToMiles}/>
              <AddDeleteSplits className={s['card__buttons']} />
            </div>
          : ''}
          {props.title === 'Text sections' ? <AddDeleteTextSection className={s['card__buttons']}/> : ''}
          {props.title === 'Goals' ? <AddDeleteGoals className={s['card__buttons']} /> : ''}
        </div>
      </div>
        {props.children}
    </div>
  )
}
export default Card