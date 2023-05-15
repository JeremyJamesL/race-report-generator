import Card from "../UI/Card";
import Input from "../Input/Input";

function Splits(props) {
  const splits = props.raceData.splits;

  const splitsList = splits.map((s, i) => {
    return <Input type="text" name={s.name} value={s.time} />
  })

  return (
    <Card title="Splits">
        {splitsList}
    </Card>
  )
}
export default Splits