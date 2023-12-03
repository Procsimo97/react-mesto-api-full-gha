import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__overlay">
                    <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля"/>
                    <div className="profile__change-btn" onClick={props.onEditAvatar} ></div>
                </div>
                <div className="profile__full-info">
                    <div className="profile__container-name">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__info">{currentUser.about}</p>
                </div>

                <button type="button" className="profile__button" onClick={props.onAddPlace}></button>
            </section>

            <section className="photos">
            {props.cards.map((card) => {
                return (
                <Card key={card._id}
                      card={card}
                      onCardClick={props.onCardClick}
                      onCardLike={props.onCardLike}
                      onCardDelete={props.onCardDelete}
                      onDeleteClick={props.onDeleteClick}
                />)
            })}
            </section>

        </main>
    )
}

export default Main;