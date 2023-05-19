import { useContext } from "react";
import AppContext from "../Context/app-context";
import s from "./Preview.module.scss";
import { Table } from "react-bootstrap";
import Card from "../UI/Card";
import { toAlpha } from "../../utils/utils";

function Preview() {
  const ctx = useContext(AppContext);
  const d = ctx.raceData;

  const splitsAsTable = (s) => {
    return ( <tr><td>{s.split}</td><td>{s.elapsed_time}</td></tr>)
  }

  const goalsAsTable = (g) => {
    return (<tr><td>Goal {toAlpha(g.name)}</td><td>{g.value}</td><td>
        {g.completed ? 'yes' : 'no'}
      </td></tr> )
  }

  const textSectionsOutput = (t) => {
    return (
      <>
        <h2 className={s['preview__title']}>{t}</h2>
        <p className={s['preview__value']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod sapien quis massa dignissim, nec fermentum est scelerisque. Suspendisse eget porttitor dolor. Donec mollis augue luctus odio cursus mollis. Maecenas condimentum odio sed felis ornare pharetra. In hac habitasse platea dictumst. Nullam id molestie ex, sed pellentesque turpis. Aliquam consectetur massa in dictum cursus.</p>
      </>
    )
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
            {d.textSections.map(textSectionsOutput)}
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
               {d.goals.map(goalsAsTable)}
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