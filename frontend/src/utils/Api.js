class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
    //метод вывода запроса
    _validateQuery(res) {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }
    //получение инфы о пользователе с сервера
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      })
      .then(this._validateQuery.bind(this))
    }
    //изменение информации пользователя
    setUserInfo(data) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
      })
    })
      .then(this._validateQuery.bind(this))
    }

    //получение карточек с сервера
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
      .then(this._validateQuery.bind(this))
    }
    
    //добавление новой карточки
    addNewCard({name, link}) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          link: link
        }),
        headers: this.headers
      })
      .then(this._validateQuery.bind(this));
    }

    //удаление карточки
    deleteCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE', 
        headers: this.headers,
      })
      .then(this._validateQuery.bind(this))
    }

    likeCard(card) {
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(this._validateQuery.bind(this));
    }

    dislikeCard(card) {
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._validateQuery.bind(this));
    }

    //смена аватара
    sendUserAvatar(link) {
      return fetch(`${this.baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      }),
        
      headers: this.headers
    })
    .then(this._validateQuery.bind(this));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
}); 
export default api;