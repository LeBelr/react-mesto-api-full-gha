export default function ImagePopup({card, onClose, isOpen}) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-box">
        <img src={card.link} alt={card.name} className="popup__image" />
        <button type="button" className="popup__close popup__close_type_image" onClick={onClose}></button>
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  )
}