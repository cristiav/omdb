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
  if (query.length > 2) {
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

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
  localStorage.set
