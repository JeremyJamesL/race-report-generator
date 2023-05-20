import s from './Goals.module.scss';
import Card from "../UI/Card";
import Input from "../Input/Input";

function Goals(props) {
  const renderGoals = (goal) => {
    return (
        <Input type="text" name={goal.name} key={`Goal ${goal.name}`}  label={`Goal ${goal.name}`} value={goal.value} dataType="goal"/>
    )
  }

  return (
    <Card title="Goals">
      {props.raceData.goals.map(g => renderGoals(g))}
    </Card>
  )
}
export default Goals