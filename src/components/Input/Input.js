import AppContext from '../Context/app-context';
import s from './Input.module.scss';
import { useState, useContext, useEffect, useRef } from 'react';

function Input(props) {
  const ctx = useContext(AppContext);

  const handleCheckboxChange = (e) => {
    const goal = {
      name: e.target.name,
      newVal: e.target.checked 
    }
    ctx.updateGoalCompleted(goal);
  }

  const changeHandler = (e) => {
    ctx.updateInputVal(e.target.value, props.name, props.dataType);
  }

  return (
      <div className={`${s.input} ${props.className}`}>
          <label htmlFor={props.name} className={s['input__label']}>{props.label}</label>
          <div className={`${s['input__group']}`}>
            <input type="text" name={props.name} value={props.value} className={s['input__field']} onChange={changeHandler}/>

            {props.dataType === 'goal' &&
            <div className={s['input__checkbox-container']}>
              <input type='checkbox' name={props.name} className={s['input__checkbox']} onChange={handleCheckboxChange}/>
            </div>
            }
          </div>
      </div>

  )
}
export default Input