import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onCardDelete(props.card);
    }

    return  (
        <PopupWithForm name={"delete-card"}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          title={"Вы уверены?"}
          button={props.isLoading ? 'Удаление...' : 'Да'} />
    )
}
export default DeleteCardPopup;