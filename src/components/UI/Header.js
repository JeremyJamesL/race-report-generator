import stravaIcon from '../../assets/images/strava.png';
import s from "./Header.module.scss";
import Button from "./Button";

function Header(props) {
  return (
    <header className={s.header}>
        <div className={`${s['header__inner']} row-util`}> 
            <h1 className={s["header__site-title"]}>
              <a href="/">👟<span>Strava</span> Race Report Generator</a>
            </h1>
            {props.showBlocks &&
              <Button text="Add new race" icon={stravaIcon} className={s['header__btn']}/>
            }
        </div>
    </header>
  )
}
export default Header
