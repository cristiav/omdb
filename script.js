const apiKey = 'df78b1d0'; // Tu clave de la API

// Función para cambiar de pestaña
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

// Función para buscar películas
function searchMovies() {
    const query = document.getElementById('searchInput').value;
    const searchResultsContainer = document.getElementById('searchResults');

    // Solo realizar la búsqueda si el término tiene al menos 3 caracteres
    if (query.length > 2) {
        searchResultsContainer.innerHTML = '<p>Cargando...</p>'; // Indicador de carga

        // Construir la URL para la solicitud a la API de OMDb
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

        console.log("URL de la API:", apiUrl); // Para depurar y ver que estamos construyendo la URL correctamente

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Datos de la API:", data); // Para ver qué devuelve la API

                // Limpiar el contenedor de resultados
                searchResultsContainer.innerHTML = '';

                // Verificar si la respuesta es válida
                if (data.Response === "True") {
                    // Mostrar las películas obtenidas
                    data.Search.forEach(movie => {
                        const movieElement = document.createElement('div');
                        movieElement.classList.add('movie');
                        movieElement.innerHTML = `
                            <img src="${movie.Poster}" alt="${movie.Title} Poster" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x300?text=No+Image'">
                            <h4>${movie.Title}</h4>
                            <p>Released: ${movie.Year}</p>
                            <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Agregar a Favoritos</button>
                        `;
                        searchResultsContainer.appendChild(movieElement);
                    });
                } else {
                    searchResultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener las películas:', error);
                searchResultsContainer.innerHTML = '<p>Error al obtener los resultados.</p>';
            });
    } else {
        searchResultsContainer.innerHTML = ''; // Limpiar resultados si no hay suficiente texto para buscar
    }
}

// Función para agregar a favoritos
function addToFavorites(imdbID, title, poster) {
    // Crear un objeto para la película
    const movie = { imdbID, title, poster };

    // Obtener la lista de favoritos actual desde localStorage (si existe)
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Verificar si la película ya está en la lista de favoritos
    if (!favorites.some(fav => fav.imdbID === imdbID)) {
        favorites.push(movie); // Agregar la película a favoritos
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar la lista actualizada
        alert(`${title} ha sido agregado a tus favoritos!`);
    } else {
        alert(`${title} ya está en tus favoritos.`);
    }
}

// Función para ver los favoritos
function viewFavorites() {
    const favoritesContainer = document.getElementById('favoritesList');
    favoritesContainer.innerHTML = ''; // Limpiar contenedor de favoritos

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length > 0) {
        favorites.forEach(fav => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${fav.poster}" alt="${fav.title} Poster">
                <h4>${fav.title}</h4>
                <button onclick="removeFromFavorites('${fav.imdbID}')">Eliminar de Favoritos</button>
            `;
            favoritesContainer.appendChild(movieElement);
        });
    } else {
        favoritesContainer.innerHTML = '<p>No tienes favoritos aún.</p>';
    }
}

// Función para eliminar de favoritos
function removeFromFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.imdbID !== imdbID); // Eliminar la película por su imdbID
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar la lista actualizada
    viewFavorites(); // Actualizar la vista de favoritos
}

// Función de inicio (al cargar la página)
window.onload = () => {
    openTab(event, 'list'); // Mostrar la pestaña de lista al cargar la página
    viewFavorites(); // Mostrar favoritos al cargar la página
};
