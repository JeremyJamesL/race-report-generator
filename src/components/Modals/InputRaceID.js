import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import s from './InputRaceID.module.scss';
import bs from '../UI/Button.module.scss';
import ModalWrapper from "./ModalWrapper";

function InputRaceID(props) {
  const [id, updateID] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.authorize(id);
  }

  return (
    <ModalWrapper>
        <div className={s['race-input']}>
            <form action="" onSubmit={handleSubmit}>
                <div className={s['race-input__group']}>
                <span className={s['race-input__pre-text']}>https://strava.com/activities/</span><input type="number" placeholder='add your race id' className={s['race-input__input']} onChange={(e) => updateID(e.target.value)}/>
                </div>
                <button type='submit' className={bs.button}>Submit
                    <span className={bs['button__icon']}>
                        <AiOutlineEnter/>
                    </span>
                </button>
            </form>
        </div>
    </ModalWrapper>
  )
}
export default InputRaceID

