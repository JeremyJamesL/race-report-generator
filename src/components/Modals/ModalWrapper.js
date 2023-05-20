import { useContext } from 'react';
import {AiFillCloseCircle} from "react-icons/ai";
import AppContext from '../Context/app-context';
import s from './ModalWrapper.module.scss';

function ModalWrapper(props) {
  const ctx = useContext(AppContext);

  const handleModalClose = () => {
    if(ctx.showMarkdown) {
        ctx.updateShowMarkdown(false);
    } else if(ctx.showHelp) {
        ctx.updateShowHelp(false);
    } else if(ctx.showRaceInput) {
      ctx.updateShowRaceInput(false);
    }
  }

  return (
    <div className={s['modal']}>
            <div className={s['modal__inner']}>
            <div className={s['modal__close']} onClick={handleModalClose}><AiFillCloseCircle/></div>
                {props.children}
            </div>
    </div>
  )
}
export default ModalWrapper