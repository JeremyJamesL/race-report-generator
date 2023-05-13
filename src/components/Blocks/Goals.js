import Card from "../UI/Card";
import Input from "../Input/Input";

function Goals() {
  return (
    <Card title="goals">
        <Input type="text" name="goal-1" label="Goal 1"/>
        <Input type="text" name="goal-2" label="Goal 2"/>
    </Card>
  )
}
export default Goals