import { useContext } from 'react';
import s from './AddDeleteGoals.module.scss';
import AppContext from '../Context/app-context';

function AddDeleteGoals(props) {
  const ctx = useContext(AppContext)

  const handleBtnClick = (e) => {
    if(e.target.name === 'add') {
        ctx.deleteOrAddGoal('add');
    } else {
        ctx.deleteOrAddGoal('delete');
    }
  }

  return (
    <div className={props.className}>
        <button name='add' onClick={handleBtnClick}>Add</button> / <button name="delete" onClick={handleBtnClick}>Del</button>
    </div>
  )
}
export default AddDeleteGoals