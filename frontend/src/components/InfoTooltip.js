import iconSuccess from '../images/icon_success.svg';
import iconError from "../images/icon_error.svg";


function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__info">
                <button type="button" className="link popup__exit popup__exit_type_info" onClick={props.onClose} ></button>
                <img alt='Иконка статуса запроса' className="popup__img-status" src={props.isSuccess ? iconSuccess : iconError} />
                <h2 className="popup__message">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;