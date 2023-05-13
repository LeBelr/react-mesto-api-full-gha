import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description
        });
    }

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input id="profile-name-input" type="text" className="popup__input popup__input_type_edit-profile-name"
                name="name" placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
            <span className="popup__input-error profile-name-input-error"></span>
            <input id="profile-about-input" type="text" className="popup__input popup__input_type_edit-profile-about"
                name="about" placeholder="О себе" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
            <span className="popup__input-error profile-about-input-error"></span>
        </PopupWithForm >
    )
}