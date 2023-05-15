import Card from "../UI/Card";
import Input from "../Input/Input";

function RaceInfo(props) {
  const d = props.raceData;
  return (
    <Card className="add-your-own" title="Race information">
        <Input type="text" name="race-name" label="Race name" value={d.name}/>
        <Input type="text" name="date" label="Date" value={d.date}/>
        <Input type="text" name="distance" label="Distance" value={d.distance}/>
        <Input type="text" name="location" label="Location" value={d.location}/>
        <Input type="text" name="finish time" label="Finish time" value={d.finishTime}/>
        <Input type="text" name="elevation" label="Elevation gain" value={d.elevation}/>
    </Card>
  )
}
export default RaceInfo