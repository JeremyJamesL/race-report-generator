import Card from "../UI/Card";
import Input from "../Input/Input";

function RaceInfo(props) {
  return (
    <Card className="add-your-own" title="Race information">
        <Input type="text" name="race-name" label="Race name" value="Richmond Half"/>
        <Input type="text" name="date" label="Date" value="Sunday, Nov 22"/>
        <Input type="text" name="distance" label="Distance" value="21.37km"/>
        <Input type="text" name="location" label="Location" value="London, UK"/>
        <Input type="text" name="finish time" label="Finish time" value="01:41:55"/>
        <Input type="text" name="elevation" label="Elevation gain" value="520"/>
    </Card>
  )
}
export default RaceInfo