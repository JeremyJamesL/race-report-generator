import AppContext from '../Context/app-context';
import s from './Input.module.scss';
import { Fragment, useEffect, useState, useContext, useCallback } from 'react';

function Input(props) {
  const [inputValue, updateInputValue] = useState(props.value);
  const ctx = useContext(AppContext);

  useCallback(() => {
    const debounce = setTimeout(() => {
      ctx.updateInputVal(inputValue);
    }, 200);

    return () => {
      clearTimeout(debounce);
    }
  }, [inputValue])

  // useCallback(() => )

  return (
    <Fragment>
        <div className={s.input}>
            <label htmlFor={props.name} className={s['input__label']}>{props.label}</label>
            <input type="text" name={props.name} value={inputValue} className={s['input__field']} onChange={(e) => updateInputValue(e.target.value)}/>
        </div>
    </Fragment>
  )
}
export default Input