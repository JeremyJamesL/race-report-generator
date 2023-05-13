import s from './Input.module.scss';
import { Fragment } from 'react';

function Input(props) {
  return (
    <Fragment>
        <div className={s.input}>
            <label htmlFor={props.name} className={s['input__label']}>{props.label}</label>
            <input type="text" name={props.name} className={s['input__field']} />
        </div>
    </Fragment>
  )
}
export default Input