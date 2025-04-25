// Definir la URL de la API y la clave
const apiKey = 'df78b1d0';
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
async function loadMovies() {
    const response = await fetch(`${apiUrl}&s=Marvel`);
    const data = await response.json();

    if (data.Response === "True") {
        const movieList = document.getElementById("movieList");
        movieList.innerHTML = '';
        data.Search.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p> Año: ${movie.Year}</p>
                <button onclick="addToFavorites('${movie.imdbID}')">Agregar a Favoritos</button>
            `;
            movieList.appendChild(movieElement);
        });
    } else {
        console.error("No se encontraron películas");
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
    favoritesList.innerHTML = '';
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

// Cargar las películas al abrir la pestaña "Menu"
document.getElementById("menu").addEventListener("click", loadMovies);

// Cargar los favoritos al abrir la pestaña "Favoritos"
document.getElementById("favorites").addEventListener("click", loadFavorites);

