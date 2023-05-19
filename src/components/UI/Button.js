import s from "./Button.module.scss"
import { useContext } from "react";
import AppContext from "../Context/app-context";

function Button(props) {
  const ctx = useContext(AppContext);

  const handleBtnClick = (e) => {
    if(e.target.textContent === 'Add Strava race') {
      props.authorize();
    }
    else if(e.target.textContent === 'Generate markdown') {
      ctx.updateShowMarkdown(true);
    }
    else if(e.target.textContent === 'Start again') {
      ctx.resetRace();
      ctx.updateShowBlocks(false);
    }
    else if(e.target.textContent === 'Enter manually') {
      ctx.setEnterMode('manual');
      ctx.updateShowBlocks(true);
    }
    else if(e.target.textContent === 'Help') {
      ctx.updateShowHelp(true);
    }
  }

  return (
    <button className={`${s.button} ${props.className}`} onClick={handleBtnClick}>
        <span className={s['button__icon']}>{props.icon}</span>
        {props.text}
    </button>
  )
}
export default Button