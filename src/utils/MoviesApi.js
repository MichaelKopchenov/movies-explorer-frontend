class MoviesApi {
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

  takeMovies() {
    return this._demand('/')
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi
