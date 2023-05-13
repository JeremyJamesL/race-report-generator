import s from "./Preview.module.scss";
import Card from "../UI/Card";

function Preview() {
  return (
    <Card title="Preview">
        <div className={s.preview}>
          <h2 className={s['preview__title']}>Race info</h2>
            <ul className={s['preview__list']}>
                <li>Name: Richmond half</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </Card>
  )
}
export default Preview;