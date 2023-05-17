import s from "./Button.module.scss"
import { useContext } from "react";
import AppContext from "../Context/app-context";

function Button(props) {
  const ctx = useContext(AppContext);

  const handleBtnClick = (e) => {
    if(e.target.textContent === 'Add Strava race') {
      props.authorize();
      return;
    }
    if(e.target.textContent === 'Generate markdown') {
      ctx.updateShowMarkdown(true);
      return;
    }
    if(e.target.textContent === 'Start again') {
      ctx.updateShowBlocks(false);
    }
  }

  return (
    <button className={`${s.button} ${props.className}`} onClick={handleBtnClick}>
        {props.icon}
        {/* <img src={props.icon} alt="" className={s['button__icon']}/> */}
        {props.text}
    </button>
  )
}
export default Button