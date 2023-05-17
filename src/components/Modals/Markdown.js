import { useState, useRef, useContext } from "react";
import AppContext from "../Context/app-context";
import { IoCopy } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import s from './Markdown.module.scss';
import bs from '../UI/Button.module.scss';

function Markdown(props) {
  const ctx = useContext(AppContext);
  const d = props.raceData;
  const [textIsCopied, updateTextIsCopied] = useState(false);
  const textAreaInput = useRef('');

  const handleCopyClick = () => {
      updateTextIsCopied(true);
      navigator.clipboard.writeText(textAreaInput.current.value);
      const timeout = setTimeout(() => {
        updateTextIsCopied(false);
      }, 500)
  }

  const handleModalClose = () => {
    ctx.updateShowMarkdown(false);
  }

  const splits = d.splits.map((split) => {
    return `| ${split.name} | ${split.time} |\n`  
  })

  const goals = d.goals.map((goal) =>  {
    return `| ${goal.name} | ${goal.value} | ${goal.completed ? 'yes' : 'no'}\r\n`
  })

  return (
    <div className='modal-bg'>

        <div className={s.markdown}>

          <div className={s['markdown__close']} onClick={handleModalClose}><AiFillCloseCircle/></div>

          <div className={s['markdown__copy']} onClick={handleCopyClick}>
            <IoCopy className={bs['button__icon']} />
            <span>{!textIsCopied ? 'Copy markdown' : 'Copied!'}</span>
          </div>
          <textarea ref={textAreaInput} name="" rows="12" cols="30" className={s['markdown__textarea']}>
          {
            `#${d.name}\r\n## Race Information\r\n* **Name:** ${d.name}\r\n* **Date:** ${d.date}\r\n* **Distance:**${d.distance}\r\n* **Location:**\r\n${d.location}\r\n* **Time:** ${d.finishTime}\r\n## Goals\r\n| Goal | Description | Completed? |\r\n|------|------|------|\r\n${goals.join('')}\r\n## Splits\r\n| Split | Time |\r\n|------|------|\r\n${splits.join('')}`
          }
       
          </textarea>
        </div>
    </div>
  )
}
export default Markdown