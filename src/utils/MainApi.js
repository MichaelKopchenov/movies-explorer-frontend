import { BACKEND_URL } from './UrlConstants';

class ApiMain {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  };

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  async register(
    username,
    email,
    password
    ) {
      const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      })
    });
    return this._getResponseData(res);
  };

  async login(email, password) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    return this._getResponseData(res);
  };

  async dataOfUser(token) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return this._getResponseData(res);
  };


  async setNewDataOfUser(
    username,
    email,
    token
    ) {
      const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: username,
        email: email,
      })
    });
    return this._getResponseData(res);
  };

  async dataOfMovies(token) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return this._getResponseData(res);
  };

  async setNewMovie(data, token) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    });
    return this._getResponseData(res);
  };

  async deleteMovie(cardId, token) {
    const res = await fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return this._getResponseData(res);
  };
};

const mainApi = new ApiMain({
  baseUrl: BACKEND_URL,
});

export default mainApi;
