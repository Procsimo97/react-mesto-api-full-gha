import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `photos__like ${isLiked ? 'photos__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    }

    function handleLike() {
        props.onCardLike(props.card);
    }

    return (
        <div className="photo-template">
            <article className="photos__box">
                {isOwn && <button type="button" className="photos__delete" onClick={handleDeleteClick} />}
                <img className="photos__element" src={props.card.link} alt={props.card.name} onClick={handleClick} />
                <div className="photos__info">
                    <h2 className="photos__name">{props.card.name}</h2>
                    <div className="photos__likes">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
                        <p className="photos__like-score">{props.card.likes.length}</p>
                    </div>
                </div>
            </article>
        </div>)

}

export default Card;