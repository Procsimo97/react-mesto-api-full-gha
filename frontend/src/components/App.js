import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useState, useEffect, useCallback } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProctectedRoute from './ProtectedRoute';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import apiAuth from '../utils/AuthApi';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const isSomePopupOpen = (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeleteCardPopupOpen || isInfoTooltipOpen || isImgPopupOpen);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  /*Для попапа подтверждения удаления карточки */
  const [cardDelete, setCardDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState('');
  /*для изменения состояния клопки отправки*/
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isDeleteCardLoading, setIsDeleteCardLoading] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardPopupClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  function handleImgPopupClick(card) {
    setSelectedCard(card);
    setIsImgPopupOpen(true);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsImgPopupOpen(false);
  }

  /*проверка токена и переадресация при повторном входе*/
  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log("Ошибка проверки токена:", err))
    }
  }, [navigate])

  /*лайк/дизлайк */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => c._id === card._id ? newCard : c)
          })
        }
        )
        .catch((err) => console.log(`Ошибка постановки лайка ${err}`))
    } else {
      api.dislikeCard(card)
        .then((newCard) => {
          setCards((state) => { return state.map((c) => c._id === card._id ? newCard : c) })
        })
        .catch((err) => console.log(`Ошибка удаления лайка ${err}`))
    }
  }

  /*функция удаления карточки */
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (!isOwn) return;
    setIsDeleteCardLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => { return cards.filter((c) => c._id !== card._id) })
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
      .finally(() => setIsDeleteCardLoading(false))
  }

  /*обновление данных пользователя */
  function handleUpdateUser(data) {
    setIsEditProfileLoading(true);
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка сохранения информации о пользователе ${err}`))
      .finally(() => setIsEditProfileLoading(false))
  }

  /* обновление аватара */
  function handleUpdateAvatar(link) {
    setIsEditAvatarLoading(true);
    api.sendUserAvatar(link)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка изменения аватара: ${err}`))
      .finally(() => setIsEditAvatarLoading(false))
  }

  /*добавление новой карточки*/
  function handleAddPlace(data) {
    setIsAddPlaceLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка создания карточки ${err}`))
      .finally(() => setIsAddPlaceLoading(false))
  }

  /*регистрация и присвоение данных пользователю*/
  function handleRegister(dataRegister) {
    apiAuth.register(dataRegister)
      .then((res) => {
        if (res) {
          navigate("/sign-in");
          setIsInfoTooltipOpen(true);
          setIsSuccessInfoTooltipStatus(true);
        }
      })
      .catch(err => {
        console.log(`Ошибка регистрации пользователя ${err}`);
        setIsInfoTooltipOpen(true);
        setIsSuccessInfoTooltipStatus(false);
      })
  }

  /*авторизация*/
  function handleLogin(dataLogin) {
    apiAuth.login(dataLogin).then(() => {
      setIsLoggedIn(true)
      navigate("/");
      setUserEmail(dataLogin.email);
    })
      .catch(err => {
        console.log(`Ошибка авторизации пользователя ${err}`)
        setIsInfoTooltipOpen(true);
        setIsSuccessInfoTooltipStatus(false);
      })
  }


  /*выход из системы*/
  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    setUserEmail('');
    navigate("/sign-in", { replace: true });
  }

  /*получение данных о пользователе */
  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка подрузки данных пользователя: ${err}`)
        })
    }
  }, [isLoggedIn])

  /*получение карточек с сервера*/
  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(`Ошибка подрузки карточек: ${err}`)
        })
    }
  }, [isLoggedIn])

  /*реализация закрытия попапа через esc */
  useEffect(() => {
    function handleEscClosePopup(evt) {
      if (evt.key === 'Escape') {
        closeAllPopup();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener('keydown', handleEscClosePopup);
      return () => {
        document.removeEventListener('keydown', handleEscClosePopup);
      }
    }
  }, [isSomePopupOpen])

  /*реализация закрытия попапа через оверлей */
  useEffect(() => {
    function handleCloseOverlayPopup(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopup();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener('click', handleCloseOverlayPopup);
      return () => {
        document.removeEventListener('click', handleCloseOverlayPopup);
      }
    }
  }, [isSomePopupOpen])

  /*проверка токена*/
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>


      <div className="page">
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login onLogin={handleLogin} />
            </>
          } />

          <Route path='/sign-up' element={
            <>
              <Header title="Вход" route="/sign-in" />
              <Register onRegister={handleRegister} />
            </>
          } />

          <Route path='/' element={
            <>
              <Header title="Выйти"
                route="/sign-in"
                onClick={signOut}
                email={userEmail}
              />
              <ProctectedRoute path="/" isLogged={isLoggedIn} component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleImgPopupClick}
                onDeleteClick={handleDeleteCardPopupClick}
                onCardLike={handleCardLike}
              />
              <Footer />

              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopup}
                onUpdateUser={handleUpdateUser}
                isLoading={isEditProfileLoading}
              />

              <AddPlacePopup isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopup}
                onAddPlace={handleAddPlace}
                isLoading={isAddPlaceLoading}
              />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopup}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isEditAvatarLoading}

              />

              <DeleteCardPopup isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopup}
                onCardDelete={handleCardDelete}
                card={cardDelete}
                onCardClick={handleDeleteCardPopupClick}
                isLoading={isDeleteCardLoading}
              />

              <ImagePopup name={"image"}
                card={selectedCard}
                onClose={closeAllPopup}
                isOpen={isImgPopupOpen}
              />

            </>
          }
          />

        </Routes>

        <InfoTooltip isOpen={isInfoTooltipOpen}
          isSuccess={isSuccessInfoTooltipStatus}
          onClose={closeAllPopup}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;