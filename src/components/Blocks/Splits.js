import { useContext } from "react";
import Card from "../UI/Card";
import Input from "../Input/Input";
import AppContext from "../Context/app-context";

function Splits(props) {
  const splits =  props.raceData.splits;

  const renderSplits = (s) => {
    return <Input type="text" name={s.split} key={s.split} value={s.elapsed_time} label={`Lap ${s.split}`} dataType="split"/>
  }

  return (
    <Card title="Splits">
        {splits.map(renderSplits)}
    </Card>
  )
}
export default Splits