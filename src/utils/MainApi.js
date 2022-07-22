const BASE_URL = "https://api.storm.nomoredomains.work"

export function login(input) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  })
    .then(handleResponse)
}

export function registration(input) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  })
    .then(handleResponse)
}

export function getCurrentUser(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then(handleResponse)
}

export function editCurrentUser(jwt, user) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email
    })
  })
    .then(handleResponse)
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then(handleResponse)
}

export function getSavedFilms(jwt) {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
  })
    .then(handleResponse)
}

export function saveMovie(movie, jwt) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      trailerLink: movie.trailerLink
        ? movie.trailerLink
        : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
      year: movie.year,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    })
  })
    .then(handleResponse)
}

export function deleteMovie(movie, jwt) {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
}


function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}