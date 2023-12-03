function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__header">{props.title}</h2>
                <button type="button" className={`link popup__exit popup__exit_type_${props.name}`} onClick={props.onClose} ></button>
                <form className={`popup__form popup__form_type_${props.name}`} name={`popupForm-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className={`link popup__save-btn popup__save-btn_type_${props.name}`}>{props.button}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;