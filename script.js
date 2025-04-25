function mostrarInfoAPI() {
  const contenedor = document.getElementById("contenedor");

  // Tu clave de la OMDb API
  const apiKey = 'df78b1d0'; // Tu clave de API
  const movieTitle = 'Guardians of the Galaxy Vol. 2'; // Título de la película
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        contenedor.innerHTML = `
          <h1>${data.Title}</h1>

          <div class="descripcion">
            <p><strong>Género:</strong> ${data.Genre}</p>
            <p><strong>Año:</strong> ${data.Year}</p>
            <p><strong>Duración:</strong> ${data.Runtime}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Escritores:</strong> ${data.Writer}</p>
            <p><strong>Sinopsis:</strong> ${data.Plot}</p>
            <p><strong>Idioma:</strong> ${data.Language}</p>
            <p><strong>País:</strong> ${data.Country}</p>
            <p><strong>Premios:</strong> ${data.Awards}</p>
          </div>

          <img src="${data.Poster}" alt="${data.Title} Poster" class="imagen-api">

          <p class="info-extra"><strong>Calificación IMDb:</strong> ${data.imdbRating}/10</p>
          <p class="info-extra"><strong>Calificación Rotten Tomatoes:</strong> ${data.Ratings ? data.Ratings[1]?.Value : 'No disponible'}</p>
          <p class="info-extra"><strong>Calificación Metacritic:</strong> ${data.Metascore}</p>

          <p class="info-extra"><strong>Box Office:</strong> ${data.BoxOffice}</p>
          <p class="info-extra"><strong>Versión de la app:</strong> V.1.0.0</p>

          <footer>
            Nombre del Estudiante: Tu Nombre
          </footer>
        `;
      } else {
        contenedor.innerHTML = '<p>No se pudo obtener la información de la película.</p>';
      }
    })
    .catch(error => {
      contenedor.innerHTML = '<p>Error al cargar la información.</p>';
    });
}
