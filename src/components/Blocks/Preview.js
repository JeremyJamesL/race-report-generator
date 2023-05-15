import s from "./Preview.module.scss";
import { Table } from "react-bootstrap";
import Card from "../UI/Card";

function Preview(props) {
  const d = props.raceData;

  const splitsAsTable = (s) => {
    return ( <tr><td>{s.name}</td><td>{s.time}</td></tr>)
  }

  return (
    <Card title="Preview">
        <section className={s.preview}>
          <div className={s['preview__section']}>
            <h2 className={s['preview__title']}>Race info</h2>
              <ul className={s['preview__list']}>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Name: </span>
                    <span className={s['preview__value']}>{d.name}</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Date: </span>
                    <span className={s['preview__value']}>{d.date}</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Distance: </span>
                    <span className={s['preview__value']}>{d.distance}</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Location: </span>
                    <span className={s['preview__value']}>{d.location}</span></li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Elevation: </span>
                    <span className={s['preview__value']}>{d.elevation}</span>
                  </li>
              </ul>
          </div>
          <div className={s['preview__section']}>
            <h2 className={s['preview__title']}>Goals</h2>
            <Table striped bordered variant="dark" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Goal</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sub 1:20</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Sub 1:30</td>
                  <td>No</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className={s['preview__section']}>
            <h2 className={s['preview__title']}>Splits</h2>
            <Table striped bordered variant="dark" size="sm">
              <thead>
                <tr>
                  <th>Split</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {d.splits.map(splitsAsTable)}
              </tbody>
            </Table>
          </div>
        </section>
    </Card>
  )
}
export default Preview;