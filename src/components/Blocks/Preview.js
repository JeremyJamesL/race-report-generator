import s from "./Preview.module.scss";
import { Table } from "react-bootstrap";
import Button from "../UI/Button";
import Card from "../UI/Card";

function Preview() {
  return (
    <Card title="Preview">
        <section className={s.preview}>
          <div className={s['preview__section']}>
            <h2 className={s['preview__title']}>Race info</h2>
              <ul className={s['preview__list']}>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Name: </span>
                    <span className={s['preview__value']}>Richmond Half</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Date: </span>
                    <span className={s['preview__value']}>Sunday November 6, 2022</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Distance: </span>
                    <span className={s['preview__value']}>21.37km</span>
                  </li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Location: </span>
                    <span className={s['preview__value']}>London, UK</span></li>
                  <li className={s['preview__item']}>
                    <span className={s['preview__key']}>Elevation: </span>
                    <span className={s['preview__value']}>520m</span>
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
                <tr>
                  <td>1</td>
                  <td>5:20</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>5:30</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>5:22</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>6:00</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>5:20</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>6:30</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>5:17</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>6:02</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
    </Card>
  )
}
export default Preview;