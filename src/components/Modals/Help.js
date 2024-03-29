import s from './Help.module.scss';
import ModalWrapper from "./ModalWrapper";
const embedId = 'CXQ9yHI3FHM';

function Help() {
  return (
    <ModalWrapper>
        <div className={s.help}>
            <h2 className={s['help__title']}>Help</h2>
            <p>Youtube video coming soon...</p>
            {/* <div className={s['help__video']}>
                <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
                <a href={`https://www.youtube.com/embed/${embedId}`} target='_blank'>Watch on Youtube</a>
            </div> */}
        </div>
    </ModalWrapper>
  )
}
export default Help