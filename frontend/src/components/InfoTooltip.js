import okRegImage from '../images/ok-reg.svg';
import notRegImage from '../images/not-reg.svg'

export default function InfoTooltip({isOpen, onClose, isRegOk}) {
  return (
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : '' }`}>
      <div className="info-tooltip__content">
        <button type="button" className="info-tooltip__close" onClick={onClose}/>
        <img src={isRegOk ? okRegImage : notRegImage } alt={isRegOk ? "Успешно" : "Не получилось"} className="info-tooltip__image"/>
        <p className="info-tooltip__text">{isRegOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}