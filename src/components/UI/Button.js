import s from "./Button.module.scss"

function Button(props) {

  const handleBtnClick = (e) => {
    if(e.target.textContent === 'Add Strava race') {
      props.authorize();
      return;
    }
    if(e.target.textContent === 'Update race') {
      console.log('updating race');
      return;
    }
  }

  return (
    <button className={`${s.button} ${props.className}`} onClick={handleBtnClick}>
        <img src={props.icon} alt="" className={s['button__icon']}/>
        {props.text}
    </button>
  )
}
export default Button