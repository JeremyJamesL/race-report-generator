import s from "./Footer.module.scss";
const date = new Date();
const year = date.getFullYear()

function Footer() {

  return (
    <footer className={s.footer}>
        <div className={`row-util ${s['footer__inner']}`}>
            <span>@Jeremy Luscombe {year}</span>
              <ul className={s['footer__socials']}>
                <li><a href="https://github.com/JeremyJamesL">Github</a></li>
                <li><a href="https://twitter.com/JJDEV6">Twitter</a></li>
              </ul>
        </div>
    </footer>
  )
}
export default Footer