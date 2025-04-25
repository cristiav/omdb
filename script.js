const apiKey = 'df78b1d0'; // Clave de la API

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

// Buscar películas
function searchMovies() {
    const query = document.getElementById('searchInput').value;

    if (query.length > 2) {
        console.log(`Buscando: ${query}`); // Depuración: Ver que estamos buscando correctamente

        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Depuración: Ver la respuesta de la API
                const resultsContainer = document.getElementById('searchResults');
                resultsContainer.innerHTML = '';

                if (data.Response === "True") {
                    data.Search.forEach(movie => {
                        const movieElement = document.createElement('div');
                        movieElement.classList.add('movie');
                        movieElement.innerHTML = `
                            <img src="${movie.Poster}" alt="${movie.Title} Poster" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x300?text=No+Image'">
                            <h4>${movie.Title}</h4>
                            <p>Released: ${movie.Year}</p>
                        `;
                        resultsContainer.appendChild(movieElement);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No se encontraron películas.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener las películas:', error);
            });
    }
}

// Filtrar por género
function filterMovies() {
    const genre = document.getElementById('genreFilter').value;

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(genre)}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('peliculasList');
            resultsContainer.innerHTML = '';

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x300?text=No+Image'">
                        <h4>${movie.Title}</h4>
                        <p>Released: ${movie.Year}</p>
                    `;
                    resultsContainer.appendChild(movieElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>No se encontraron películas de este género.</p>';
            }
        })
        .catch(error => console.error('Error al filtrar las películas:', error));
}

// Cargar las pestañas y películas al iniciar
window.onload = () => {
    openTab(event, 'list'); // Mostrar la primera pestaña (lista)
};
