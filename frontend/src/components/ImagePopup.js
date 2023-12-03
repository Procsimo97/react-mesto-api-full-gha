function ImagePopup(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onCloseClick}>
      <figure className="popup__image-box">
        <button type="button" className={`link popup__exit popup__exit_type_${props.name}`} onClick={props.onClose}></button>
        <img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <figcaption className="popup__caption">{props.card && props.card.name}</figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup;