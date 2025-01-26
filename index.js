const movieTitle = document.getElementById("movieTitle");
const searchButton = document.querySelector(".search-wrapper");
const searchResultText = document.querySelector(".search-info span:last-child");
const loading = document.querySelector(".loading-state");
const filterSection = document.getElementById("filter");

async function onSearchChange(event) {
  const query = event.target.value.trim();
  const movieResults = document.getElementById("movieResults");

  if (!query) {
    filterSection.style.display = "none";

    return;
  }

  filterSection.style.display = "flex";

  searchResultText.textContent = `"${query}"`;
  loading.style.display = "flex";
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=536c8bf5&s=${query}`
  );
  const moviesData = await movies.json();
  loading.style.display = "none";

  if (moviesData.Response === "True") {
    movieResults.innerHTML = moviesData.Search.map((movie) =>
      movieHTML(movie)
    ).join("");
  } else {
    movieResults.innerHTML = `<span class="white"><p>No results found for : "${query}"</p></span>`;
  }
}

function movieHTML(movie) {
  return `<div class="movie-card">
    
     <div class="movie-card__container">
    
     <h3>${movie.Title}</h3>
    
     <p><b>Year:</b>${movie.Year}</p>
    
     <img src="${movie.Poster}" alt="${movie.Title}" />
    
     </div>
    
     </div>`;
}

function getMovies() {
  const query = document.getElementById("movieTitle").value.trim();
  onSearchChange({ target: { value: query } });
}


movieTitle.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getMovies();
  }
});

searchButton.addEventListener("click", getMovies);
