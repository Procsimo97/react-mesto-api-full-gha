import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
 
    function handleLinkPlace(evt) {
        setLink(evt.target.value);
    }

    function handleNamePlace(evt) {
        setName(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
   }

    useEffect(() => {
        if(props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen])

    return (
        <PopupWithForm name={"add-cards"}
            title={"Новое место"}
            button={props.isLoading ? 'Создание...' : 'Создать'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
           
                <input id="placeName" required minLength="2" maxLength="30"
                    name="placeName" className="popup__input-container popup__input-container_type_name-place"
                    type="text" placeholder="Название" value={name} onChange={handleNamePlace}/>
                <span className="placeName-error popup__span popup__span_error-message"></span>
                <input id="placeLink" required name="placeLink" className="popup__input-container popup__input-container_type_link"
                    type="url" placeholder="Ссылка на картинку" value={link} onChange={handleLinkPlace}/>
                <span className="placeLink-error popup__span popup__span_error-message"></span>
            
        </PopupWithForm>
    )
}

export default AddPlacePopup;