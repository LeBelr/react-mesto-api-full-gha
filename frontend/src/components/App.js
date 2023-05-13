import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js"


function App() {
  // Хуки состояния для открытия  попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // Хуки состояния для выбранной карточки, пользователя и карточек
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Хуки состояния для входа, регистрации, почты, загрузки
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegOk, setIsRegOk] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Хук для переадресации
  const navigate = useNavigate();

  // Переменная для отслеживания открытия попапов
  const isOpen = isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isImagePopupOpen || isInfoTooltipOpen;

  //Функции для смены состояния открытия попапов

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card)
  }

  // Функция изменения состояний для закрытия любого попапа

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  // Функция установки и удаления лайка

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Функция удаления карточки

  function handleCardDelete(card) {
    api.handleDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Функция изменения данных профиля

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.editProfile(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция изменения аватара

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api.changeAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция добавления карточки

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция для входа
  function handleLogin(data) {
    setIsLoading(true);
    setEmail(data.email);
    auth.login(data)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(() => {
        setIsRegOk(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция для регистрации
  function handleRegister(data) {
    setIsLoading(true);
    auth.register(data)
      .then(() => {
        setIsRegOk(true);
      })
      .catch(() => {
        setIsRegOk(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      })
  }
  // Функция для выхода
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  // Функция для автоматического входа
  function checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/', { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  // Хук для получения и установки данных пользователя и карточек

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  // Хук для автоматического входа
  useEffect(() => {
    checkToken();
  }, [])

  // Хук для закрытия попапов при нажатии Escape
  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              email={email}
              onLogout={handleLogout}
            />}
          />
          <Route path="sign-up" element={<Register onRegister={handleRegister} isLoading={isLoading}/>} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isLoading={isLoading}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!loggedIn && <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegOk={isRegOk} />}

        {loggedIn && <Footer />}

        {loggedIn && <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />}

        {loggedIn && <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />}

        {loggedIn && <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />}

        {loggedIn && <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
