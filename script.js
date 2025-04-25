const API_KEY = 'df78b1d0';

function openTab(evt, tabName) {
  const contents = document.querySelectorAll(".tabcontent");
  const links = document.querySelectorAll(".tablink");
  contents.forEach(c => c.classList.remove("active"));
  links.forEach(l => l.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function mostrarPeliculas() {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=Guardians&type=movie`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("movieList");
      container.innerHTML = "";
      if (data.Search) {
        data.Search.forEach(movie => {
          const div = document.createElement("div");
          div.className = "movie";
          div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button onclick="agregarAFavoritos('${movie.imdbID}')">Agregar a Favoritos</button>
          `;
          container.appendChild(div);
        });
      }
    });
}

function buscarPeliculas() {
  const query = document.getElementById("searchInput").value;
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("searchResults");
      container.innerHTML = "";
      if (data.Search) {
        data.Search.forEach(movie => {
          const div = document.createElement("div");
          div.className = "movie";
          div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button onclick="agregarAFavoritos('${movie.imdbID}')">Agregar a Favoritos</button>
          `;
          container.appendChild(div);
        });
      } else {
        container.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    });
}

function filtrarPorAnio() {
  const year = document.getElementById("filterYear").value;
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=Guardians&type=movie&y=${year}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("filteredMovies");
      container.innerHTML = "";
      if (data.Search) {
        data.Search.forEach(movie => {
          const div = document.createElement("div");
          div.className = "movie";
          div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button onclick="agregarAFavoritos('${movie.imdbID}')">Agregar a Favoritos</button>
          `;
          container.appendChild(div);
        });
      } else {
        container.innerHTML = "<p>No se encontraron películas para ese año.</p>";
      }
    });
}

function agregarAFavoritos(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Agregado a favoritos");
    mostrarFavoritos();
  }
}

function mostrarFavoritos() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const container = document.getElementById("favoritesList");
  container.innerHTML = "";
  favoritos.forEach(id => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <button onclick="eliminarFavorito('${movie.imdbID}')">Eliminar</button>
        `;
        container.appendChild(div);
      });
  });
}

function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(fav => fav !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  mostrarPeliculas();
  mostrarFavoritos();
});
