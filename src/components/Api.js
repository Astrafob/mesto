export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }

  getPersonInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }

  editProfileImage(objectInputs) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: objectInputs.link
      })
    }).then(this._checkResponse);
  }

  editProfile(objectInputs) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: objectInputs.name,
        about: objectInputs.about
      })
    }).then(this._checkResponse);
  }

  addCard(objectInputs) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: objectInputs.name,
        link: objectInputs.link
      })
    }).then(this._checkResponse);
  }

  addLikeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse);
  }

  deleteLikeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Получили ошибку: ${res.status} ${res.statusText}`);
  }
}