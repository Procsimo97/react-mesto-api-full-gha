import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const userAvatar = useRef();
    
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(userAvatar.current.value);
    }

    useEffect(()=> {
      userAvatar.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm name={"avatar"}
          title={"Обновить аватар"}
          button={props.isLoading ? 'Сохранение...' : 'Сохранить'}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}>
          <>
            <input id="avatar"
              name="avatar" className="popup__input-container popup__input-container_type_avatar"
              type="url" placeholder="Новое изображение" ref={userAvatar} />
            <span className="avatar-error popup__span popup__span_error-message"></span>
          </>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;