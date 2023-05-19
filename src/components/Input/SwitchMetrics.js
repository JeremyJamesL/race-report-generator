import { useContext } from "react";
import s from "./SwitchMetrics.module.scss";
import AppContext from "../Context/app-context";

function SwitchMetric(props) {
  const ctx = useContext(AppContext);

  const handleBtnClick = (e) => {
    if(e.target.name === 'miles') {
      ctx.changeMeasurement('miles');
    } else {
      ctx.changeMeasurement('km');
    }
  }

  return (
    <div className={props.className}>
        <button name='km' onClick={handleBtnClick} disabled={ctx.raceData.chosenMeasurementSystem === 'km'}>km</button> / <button name="miles" onClick={handleBtnClick} disabled={ctx.raceData.chosenMeasurementSystem === 'miles'}>miles</button>
    </div>
  )
}
export default SwitchMetric