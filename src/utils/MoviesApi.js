import { MOVIES_URL } from './MovieConstants';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  };

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  async takeMovies() {
    const res = await fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return this._getResponseData(res);
  }
};

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
