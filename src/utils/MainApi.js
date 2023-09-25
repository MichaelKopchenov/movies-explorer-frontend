class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async register(username, email, password) {
    const res = await fetch(`${this._url}/signup`, {
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
  }

  async login(email, password) {
    const res = await fetch(`${this._url}/signin`, {
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
  }

  async dataOfUser() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return this._getResponseData(res);
  }


  async setNewProfileData(username, email) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: username,
        email: email,
      })
    });
    return this._getResponseData(res);
  }

  async getMovies() {
    const res = await fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return this._getResponseData(res);
  }

  async setNewMovie(data) {
    const res = await fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }

  async deleteMyMovie(cardId) {
    const res = await fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return this._getResponseData(res);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://kmv-movies-diplom.nomoredomainsicu.ru',
});

export default mainApi
