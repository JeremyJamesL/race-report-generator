import s from "./Card.module.scss";

function Card(props) {
  return (
    <div className={`${s.card} ${props.className}`}>
        <h2 className={s["card__title"]}>{props.title}</h2>
        {props.children}
    </div>
  )
}
export default Card