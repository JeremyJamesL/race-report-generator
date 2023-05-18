import { useContext } from "react";
import AppContext from "../Context/app-context";

function AddDeleteSplits(props) {
  const ctx = useContext(AppContext);

  const handleBtnClick = (e) => {
    if(e.target.name === 'delete') {
      ctx.deleteOrAddSplit('delete');
    } else ctx.deleteOrAddSplit('add');
  }
    
  return (
    <div className={props.className}>
        <button name='add' onClick={handleBtnClick}>Add</button> / <button name="delete" onClick={handleBtnClick}>Del</button>
    </div>
  )
}
export default AddDeleteSplits
