import s from "./Header.module.scss";

function Header() {
  return (
    <header className={s.header}>
        <div className="row"> 
            <h1 className={s["header__site-title"]}>👟 <span>Strava</span> Race Report Generator</h1>
        </div>
    </header>
  )
}
export default Header