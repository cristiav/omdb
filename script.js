function mostrarInfoAPI() {
  const contenedor = document.getElementById("informacion");

  // Tu clave de la OMDb API
  const apiKey = 'df78b1d0'; // Tu clave de API

  // Lista de títulos de películas
  const peliculas = [
    'Guardians of the Galaxy Vol. 2',
    'Avengers: Endgame',
    'The Matrix',
    'Inception',
    'Titanic'
  ];

  // Función para obtener información de cada película
  peliculas.forEach(titulo => {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          contenedor.innerHTML += `
            <div class="pelicula">
              <img src="${data.Poster}" alt="${data.Title} Poster" class="imagen-api">
              <div class="informacion-pelicula">
                <p><strong>Título:</strong> ${data.Title}</p>
                <p><strong>Género:</strong> ${data.Genre}</p>
                <p><strong>Año:</strong> ${data.Year}</p>
                <p><strong>Duración:</strong> ${data.Runtime}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Sinopsis:</strong> ${data.Plot}</p>
                <p><strong>Idioma:</strong> ${data.Language}</p>
                <p><strong>Premios:</strong> ${data.Awards}</p>
              </div>
            </div>
          `;
        } else {
          contenedor.innerHTML += '<p>No se pudo obtener la información de una película.</p>';
        }
      })
      .catch(error => {
        contenedor.innerHTML += '<p>Error al cargar la información de la película.</p>';
      });
  });
}
