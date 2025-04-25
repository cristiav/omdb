const apiKey = 'df78b1d0';  // Clave API de OMDb
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

// Función para abrir las pestañas
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll(".tabcontent");
    const tabLinks = document.querySelectorAll(".tablink");

    tabContents.forEach(content => content.classList.remove("active"));
    tabLinks.forEach(link => link.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Función para cargar películas desde la API
async function loadMovies(searchTerm = 'Marvel') {
    try {
        const response = await fetch(`${apiUrl}&s=${searchTerm}`);
        const data = await response.json();

        if (data.Response === "True") {
            const movieList = document.getElementById("movieList");
            movieList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

            // Iterar sobre las películas y mostrarlas
            data.Search.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie");
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>Año: ${movie.Year}</p>
                    <button onclick="addToFavorites('${movie.imdbID}')">Agregar a Favoritos</button>
                `;
                movieList.appendChild(movieElement);
            });
        } else {
            alert("No se encontraron películas.");
        }
    } catch (error) {
        console.error("Error al cargar las películas:", error);
        alert("Hubo un error al cargar las películas.");
    }
}

// Función para agregar película a favoritos
function addToFavorites(imdbID) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// Función para cargar los favoritos
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ''; // Limpiar la lista de favoritos antes de cargar nuevas películas

    favorites.forEach(imdbID => {
        fetch(`${apiUrl}&i=${imdbID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    const movieElement = document.createElement("div");
                    movieElement.classList.add("movie");
                    movieElement.innerHTML = `
                        <img src="${data.Poster}" alt="${data.Title}">
                        <h3>${data.Title}</h3>
                        <p>Año: ${data.Year}</p>
                    `;
                    favoritesList.appendChild(movieElement);
                }
            });
    });
}

// Llamar a la función de carga de películas al cargar la página
loadMovies();

// Cuando cambie la búsqueda, actualizar las películas mostradas
function searchMovies() {
    const searchTerm = document.getElementById("searchInput").value;
    loadMovies(searchTerm);
}
function filtrarPorAnio() {
  const year = document.getElementById("filterYear").value;
  const apiKey = "df78b1d0";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=Guardians&type=movie&y=${year}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const filteredMovies = document.getElementById("filteredMovies");
      filteredMovies.innerHTML = "";
      if (data.Search) {
        data.Search.forEach(movie => {
          const div = document.createElement("div");
          div.classList.add("movie");
          div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button onclick="agregarAFavoritos('${movie.imdbID}')">Agregar a Favoritos</button>
          `;
          filteredMovies.appendChild(div);
        });
      } else {
        filteredMovies.innerHTML = "<p>No se encontraron resultados para ese año.</p>";
      }
    });
}
