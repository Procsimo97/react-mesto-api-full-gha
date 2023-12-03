import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm name={"change"}
          isOpen={props.isOpen}
          onClose={props.onClose}
          title={"Редактировать профиль"}
          button={props.isLoading ? 'Сохранение...' : 'Сохранить'}
          onSubmit={handleSubmit}>
            <>
              <input id="name" required minLength="2" maxLength="40"
                name="name" className="popup__input-container popup__input-container_type_name"
                type="text" placeholder="Ваше имя" value={name || ''} onChange={handleNameChange}/>
              <span className="name-error popup__span popup__span_error-message"></span>
              <input id="about" required minLength="2" maxLength="200"
                name="about" className="popup__input-container popup__input-container_type_info"
                type="text" placeholder="Краткое описание" value={description || ''} onChange={handleDescriptionChange}/>
              <span className="about-error popup__span popup__span_error-message"></span>
            </>
        </PopupWithForm>
    )
}
export default EditProfilePopup;