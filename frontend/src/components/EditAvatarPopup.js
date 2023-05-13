import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })
  }

  useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Обновить Аватар'
      name='avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input id="avatar-input" type="url" className="popup__input popup__input_type_avatar" name="avatar"
        placeholder="Ссылка на картинку" required ref={avatarInputRef} />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}