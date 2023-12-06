class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
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
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this))
    }
    //изменение информации пользователя
    setUserInfo(data) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
      })
    })
      .then(this._validateQuery.bind(this))
    }

    //получение карточек с сервера
    getInitialCards() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this))
    }
    
    //добавление новой карточки
    addNewCard({name, link}) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          link: link
        }),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this));
    }

    //удаление карточки
    deleteCard(cardId) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE', 
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this))
    }

    likeCard(card) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this));
    }

    dislikeCard(card) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._validateQuery.bind(this));
    }

    //смена аватара
    sendUserAvatar(link) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      }),
    })
    .then(this._validateQuery.bind(this));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
}); 
export default api;