import { IoIosExit, IoIosCreate } from "react-icons/io";
import { BsFillInfoCircleFill } from "react-icons/bs";
import s from "./Header.module.scss";
import bs from "./Button.module.scss";
import Button from "./Button";

function Header(props) {
  return (
    <header className={s.header}>
        <div className={`${s['header__inner']} row-util`}> 
            <h1 className={s["header__site-title"]}>
              <a href="/">👟<span>Strava</span> Race Report Generator</a>
            </h1>
                {props.showBlocks && !props.error &&
                <div className={s['header__buttons']}>
                  <Button text="Generate markdown" icon={<IoIosCreate className={bs['button__icon']}/>}/>
                  <Button text="Start again" icon={<IoIosExit className={`${bs['button__icon']} ${bs['button__icon--start-again']}`}/>} className={s['header__btn']}/> 
                  <Button text="Help" icon={<BsFillInfoCircleFill className={bs['button__icon']}/>}/>
                </div>
                }
        </div>
    </header>
  )
}
export default Header
