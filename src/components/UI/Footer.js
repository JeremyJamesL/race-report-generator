import s from "./Footer.module.scss";
const date = new Date();
const year = date.getFullYear()

function Footer() {

  return (
    <footer className={s.footer}>
        <div className={`row ${s['footer__inner']}`}>
            <p>@Jeremy Luscombe {year}</p>
            <p>
                <a href="#">Github</a>  
                <a href="#">Twitter</a>
            </p>
        </div>
    </footer>
  )
}
export default Footer