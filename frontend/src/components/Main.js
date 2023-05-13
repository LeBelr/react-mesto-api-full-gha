import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";
import Header from "./Header.js";

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, email, onLogout }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <p className="header__email">{email}<button className="header__button" onClick={onLogout}>Выйти</button></p>
      </Header>

      <main>
        <section className="profile">
          <div className="profile__element">
            <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}><img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" /></button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="places">
          <ul className="cards">
            {cards.map((item) => (
              <Card card={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}