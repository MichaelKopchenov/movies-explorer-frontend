class Main {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _demand(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._getResponseData)
  }

  register(username, email, password) {
    return this._demand('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      })
    })
  }

  login(email, password) {
    return this._demand('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  }

  dataOfUser() {
    return this._demand('/users/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }


  setNewProfileData(username, email) {
    return this._demand('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: username,
        email: email,
      })
    })
  }

  getMovies() {
    return this._demand('/movies', {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  setNewMovie(data) {
    return this._demand('/movies', {
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
    })
  }

  deleteMyMovie(cardId) {
    return this._demand(`/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }
}

const mainApi = new Main({
  baseUrl: 'https://kmv-movies-diplom.nomoredomainsicu.ru',
});

export default mainApi
