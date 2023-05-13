import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick(){
    onCardDelete(card)
  }

  return (
    <li className="cards__item">
      <img src={card.link} alt={card.name} className="cards__image" onClick={handleClick} />
      {isOwn && <button type="button" className="cards__delete-button" onClick={handleDeleteClick}></button>}
      <div className="cards__box-title">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__box-like">
          <button type="button" className={isLiked ? "cards__like-button cards__like-button_active" : "cards__like-button"} onClick={handleLikeClick}></button>
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}