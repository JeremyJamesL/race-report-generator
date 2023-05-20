import Card from "../UI/Card";
import Input from "../Input/Input";

function TextSections(props) {
    const renderTextSections = (section, index) => {

    return (
        <Input type="text" name={index} value={section} key={`Section ${index + 1}`} label={`Section ${index + 1}`} dataType="section"/>
    )
  }

  return (
    <Card title="Text sections">
      {props.raceData.textSections.map((s, i) => renderTextSections(s, i))}
    </Card>
  )
}
export default TextSections