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

// Función para filtrar por género
function filterMovies() {
    const genre = document.getElementById('genreFilter').value;
    const filterResultsContainer = document.getElementById('peliculasList');

    // Limpiar el contenedor de resultados
    filterResultsContainer.innerHTML = '<p>Cargando...</p>'; // Indicador de carga

    const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(genre)}&apikey=${apiKey}`;

    console.log("URL de la API para filtro:", apiUrl); // Para depurar y ver la URL construida

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Datos de la API con filtro:", data); // Ver la respuesta

            filterResultsContainer.innerHTML = ''; // Limpiar resultados anteriores

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x300?text=No+Image'">
                        <h4>${movie.Title}</h4>
                        <p>Released: ${movie.Year}</p>
                    `;
                    filterResultsContainer.appendChild(movieElement);
                });
            } else {
                filterResultsContainer.innerHTML = '<p>No se encontraron resultados para este género.</p>';
            }
        })
        .catch(error => {
            console.error('Error al filtrar las películas:', error);
            filterResultsContainer.innerHTML = '<p>Error al obtener los resultados.</p>';
        });
}

// Función de inicio (al cargar la página)
window.onload = () => {
    openTab(event, 'list'); // Mostrar la pestaña de lista al cargar la página
};

