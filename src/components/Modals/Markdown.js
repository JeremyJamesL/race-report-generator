import { useState, useRef, useContext } from "react";
import AppContext from "../Context/app-context";
import { IoCopy } from "react-icons/io5";
import s from './Markdown.module.scss';
import bs from '../UI/Button.module.scss';
import ModalWrapper from "./ModalWrapper";

function Markdown() {
  const ctx = useContext(AppContext);
  const d = ctx.raceData;
  const [textIsCopied, updateTextIsCopied] = useState(false);
  const textAreaInput = useRef('');

  const handleCopyClick = () => {
      updateTextIsCopied(true);
      navigator.clipboard.writeText(textAreaInput.current.value);
      const timeout = setTimeout(() => {
        updateTextIsCopied(false);
      }, 500)
  }

  const splits = d.splits.map((split) => {
    return `| ${split.split} | ${split.elapsed_time} |\n`  
  })

  const goals = d.goals.map((goal) =>  {
    return `| ${goal.name} | ${goal.value} | ${goal.completed ? 'yes' : 'no'}\r\n`
  })

  const textSections = d.textSections.map((section) => {
    return `##${section}\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod sapien quis massa dignissim, nec fermentum est scelerisque. Suspendisse eget porttitor dolor. Donec mollis augue luctus odio cursus mollis. Maecenas condimentum odio sed felis ornare pharetra. In hac habitasse platea dictumst. Nullam id molestie ex, sed pellentesque turpis. Aliquam consectetur massa in dictum cursus.\r\n\r\n`
  })

  return (
    <ModalWrapper>
        <div className={s.markdown}>

          <div className={s['markdown__copy']} onClick={handleCopyClick}>
            <IoCopy className={bs['button__icon']} />
            <span>{!textIsCopied ? 'Copy markdown' : 'Copied!'}</span>
          </div>
          <textarea ref={textAreaInput} name="" rows="12" cols="30" className={s['markdown__textarea']}>
          {
            `#${d.name}\r\n## Race Information\r\n* **Name:** ${d.name}\r\n* **Date:** ${d.date}\r\n* **Distance:**${d.distance}\r\n* **Location:** ${d.location}\r\n* **Time:** ${d.finishTime}\r\n\r\n## Goals\r\n| Goal | Description | Completed? |\r\n|------|------|------|\r\n${goals.join('')}\r\n## Splits\r\n| Split | Time |\r\n|------|------|\r\n${splits.join('')}\r\n${textSections.join('')} Made with [Strava race report generator](https://race-report-gen.jezl.xyz/).`
          }
       
          </textarea>
        </div>
        </ModalWrapper>
  )
}
export default Markdown