const searchBar = document.getElementById("searchBar");
const results = document.getElementById("searchResults");

async function onSearchChange(event) {
  const fast = event.target.value;
  const movies = await fetch(`https://www.omdbapi.com/?apikey=536c8bf5&s=fast`);
  const moviesData = await movies.json();
  const movieCardEl = document.querySelector(".movie-card");
  movieCardEl.innerHTML = moviesData.map(movie => movieHTML(movie)).join("");
}

async function showSearchResults(fast) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=536c8bf5&s=fast`);
  const moviesData = await movies.json();
  const movieCardEl = document.querySelector(".movie-card");
  movieCardEl.innerHTML = moviesData.map(movie => movieHTML(movie)).join("");
}

function movieHTML(movie) {
  `<div class="movie-card">
        <div class="movie-card__container">
        <h3>${movie.Title}</h4>
        <p><b>${movie.Year}</b></p>
        <p><b>${movie.Poster}</b></p>
        </div>
        </div>`;
}

onSearchChange();
