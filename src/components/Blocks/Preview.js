import { useContext } from "react";
import AppContext from "../Context/app-context";
import s from "./Preview.module.scss";
import { Table } from "react-bootstrap";
import Card from "../UI/Card";
import { toAlpha } from "../../utils/utils";

function Preview() {
  const ctx = useContext(AppContext);
  const d = ctx.raceData;

  const splitsAsTable = (s, i) => {
    return ( <tr><td key={`first-row-${i}`}>{s.split}</td><td key={`second-row-${i}`}>{s.elapsed_time}</td></tr>)
  }

  const goalsAsTable = (g, i) => {
    return (<tr><td key={`first-row-${i}`}>Goal {toAlpha(g.name)}</td><td key={`second-row-${i}`}>{g.value}</td><td key={`third-row-${i}`}>
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
                  <li key="1" className={s['preview__item']}>
                    <span className={s['preview__key']}>Name: </span>
                    <span className={s['preview__value']}>{d.name}</span>
                  </li>
                  <li key="2" className={s['preview__item']}>
                    <span className={s['preview__key']}>Date: </span>
                    <span className={s['preview__value']}>{d.date}</span>
                  </li>
                  <li key="3" className={s['preview__item']}>
                    <span className={s['preview__key']}>Distance: </span>
                    <span className={s['preview__value']}>{d.distance}</span>
                  </li>
                  <li key="4" className={s['preview__item']}>
                    <span className={s['preview__key']}>Location: </span>
                    <span className={s['preview__value']}>{d.location}</span></li>
                  <li key="5" className={s['preview__item']}>
                    <span className={s['preview__key']}>Elevation: </span>
                    <span className={s['preview__value']}>{d.elevation}</span>
                  </li>
                  <li key="6" className={s['preview__item']}>
                    <span className={s['preview__key']}>Gear: </span>
                    <span className={s['preview__value']}>{d.gear}</span>
                  </li>
                  <li key="7" className={s['preview__item']}>
                    <span className={s['preview__key']}>Strava URL: </span>
                    <span className={s['preview__value']}><a href={d.stravaURL} target="_blank">{d.stravaURL}</a></span>
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
                  <th key={1}>#</th>
                  <th key={2}>Goal</th>
                  <th key={3}>Completed</th>
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
                  <th key={1}>Split</th>
                  <th key={2}>Time</th>
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