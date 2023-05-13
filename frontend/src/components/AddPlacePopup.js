import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink
    }) 
  }

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input id="card-name-input" type="text" className="popup__input popup__input_type_add-card-name" name="name"
        placeholder="Название" required minLength="2" maxLength="30" value={cardName} onChange={handleChangeCardName} />
      <span className="popup__input-error card-name-input-error"></span>
      <input id="card-link-input" type="url" className="popup__input popup__input_type_add-card-link" name="link"
        placeholder="Ссылка на картинку" required value={cardLink} onChange={handleChangeCardLink} />
      <span className="popup__input-error card-link-input-error"></span>
    </PopupWithForm>
  )
}