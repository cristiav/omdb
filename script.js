// script.js
const API_KEY = 'df78b1d0';
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const moviesContainer = document.getElementById('moviesContainer');

function fetchMovies(query, type = '') {
  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  if (type) url += `&type=${type}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      moviesContainer.innerHTML = '';
      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          const movieEl = document.createElement('div');
          movieEl.classList.add('movie');
          movieEl.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick='guardarFavorito(${JSON.stringify(movie)})'>Agregar a Favoritos</button>
          `;
          moviesContainer.appendChild(movieEl);
        });
      } else {
        moviesContainer.innerHTML = '<p>No se encontraron resultados.</p>';
      }
    })
    .catch(err => {
      console.error(err);
      moviesContainer.innerHTML = '<p>Error al obtener datos.</p>';
    });
}

function guardarFavorito(movie) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (!favoritos.some(fav => fav.imdbID === movie.imdbID)) {
    favoritos.push(movie);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert('Película añadida a favoritos');
  } else {
    alert('Esta película ya está en tus favoritos');
  }
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  const type = typeFilter.value;
  if (query.length > 2) fetchMovies(query, type);
});

typeFilter.addEventListener('change', () => {
  const query = searchInput.value.trim();
  const type = typeFilter.value;
  if (query.length > 2) fetchMovies(query, type);
});
