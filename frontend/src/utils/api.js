import React from "react";

class Api extends React.Component{
  constructor(props) {
    super(props);
    this._url = props.baseUrl;
    this._headers = props.headers;
  }

  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._getRes)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._getRes)
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(this._getRes)
  }

  createCard(item) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(item)
    })
      .then(this._getRes)
  }

  handleDeleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._getRes)
  }

  handleLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(this._getRes)
  }

  handleDeleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._getRes)
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(this._getRes)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.handleLikeCard(cardId);
    } else {
      return this.handleDeleteLikeCard(cardId);
    }
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '1dec9d07-98e5-4556-9436-d3b7e0a78948',
    'Content-Type': 'application/json'
  }
})

export default api