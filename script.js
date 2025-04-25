const apiKey = 'df78b1d0'; // Tu clave de la API

function mostrarInfoAPI() {
  setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
  }, 3000); // El splash screen desaparece después de 3 segundos
}

// Mostrar/Pase de pestañas
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Buscar películas
function searchMovies() {
  const query = document.getElementById('searchInput').value;
  
  if (query.length > 2) { // Solo buscar si el texto tiene más de 2 caracteres
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (data.Response === "True") {
          data.Search.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
              <img src="${movie.Poster}" alt="${movie.Title} Poster">
              <h4>${movie.Title}</h4>
              <button onclick="saveFavorite({title: '${movie.Title}', poster: '${movie.Poster}'})">Guardar como Favorito</button>
            `;
            resultsContainer.appendChild(movieElement);
          });
        } else {
          resultsContainer.innerHTML = `<p>No se encontraron películas.</p>`;
        }
      })
      .catch(error => {
        console.error("Error al obtener datos de la API:", error);
      });
  }
}

// Guardar favoritos en almacenamiento local
function saveFavorite(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

// Mostrar favoritos
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favoritosList');
  favoritesContainer.innerHTML = '';

  favorites.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} Poster">
      <h4>${movie.title}</h4>
      <button onclick="removeFavorite('${movie.title}')">Eliminar</button>
    `;
    favoritesContainer.appendChild(movieElement);
  });
}

// Eliminar favorito
function removeFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(movie => movie.title !== title);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

// Filtrar películas por género
function filterMovies() {
  const genre = document.getElementById('genreFilter').value;
  const resultsContainer = document.getElementById('peliculasList');
  resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(genre)}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h4>${movie.Title}</h4>
          `;
          resultsContainer.appendChild(movieElement);
        });
      } else {
        resultsContainer.innerHTML = `<p>No se encontraron películas con ese género.</p>`;
      }
    })
    .catch(error => {
      console.error("Error al obtener datos de la API:", error);
    });
}

// Mostrar todas las películas (por ejemplo, "Batman")
function fetchMovies() {
  fetch(`https://www.omdbapi.com/?s=Batman&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('peliculasList');
      resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h4>${movie.Title}</h4>
          `;
          resultsContainer.appendChild(movieElement);
        });
      }
    })
    .catch(error => {
      console.error("Error al obtener datos de la API:", error);
    });
}

// Cargar películas al iniciar la app
window.onload = () => {
  fetchMovies();
};


