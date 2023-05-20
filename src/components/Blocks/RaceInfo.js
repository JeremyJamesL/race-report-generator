import Card from "../UI/Card";
import Input from "../Input/Input";

function RaceInfo(props) {
  const d = props.raceData;

  return (
    <Card className="add-your-own" title="Race information">
        <Input type="text" name="name" label="Race name" value={d.name} dataType="race-info"/>
        <Input type="text" name="date" label="Date" value={d.date} dataType="race-info"/>
        <Input type="text" name="distance" label="Distance" value={d.distance} dataType="race-info"/>
        <Input type="text" name="location" label="Location" value={d.location} dataType="race-info"/>
        <Input type="text" name="finishTime" label="Finish time" value={d.finishTime} dataType="race-info"/>
        <Input type="text" name="elevation" label="Elevation gain" value={d.elevation} dataType="race-info"/>
        <Input type="text" name="gear" label="Gear" value={d.gear} dataType="race-info"/>
        <Input type="url" name="stravaURL" label="StravaURL" value={d.stravaURL} dataType="race-info"/>
    </Card>
  )
}
export default RaceInfo