import s from "./Button.module.scss"
import { useContext } from "react";
import AppContext from "../Context/app-context";

function Button(props) {
  const ctx = useContext(AppContext);

  const handleBtnClick = (e) => {
    if(e.target.textContent === 'Add Strava race') {
      props.authorize();
    }
    if(e.target.textContent === 'Generate markdown') {
      ctx.updateShowMarkdown(true);
    }
    if(e.target.textContent === 'Start again') {
      ctx.updateShowBlocks(false);
    }
    if(e.target.textContent === 'Enter manually') {
      ctx.setEnterMode('manual');
      ctx.updateShowBlocks(true);
    }
  }

  return (
    <button className={`${s.button} ${props.className}`} onClick={handleBtnClick}>
        {props.icon}
        {props.text}
    </button>
  )
}
export default Button