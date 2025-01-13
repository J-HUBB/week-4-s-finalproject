const movieTitle = document.getElementById('movieTitle');


async function onSearchChange(event) {
    const query = event.target.value.trim();
    const movieResults = document.getElementById('movieResults')
    const movies = await fetch(`https://www.omdbapi.com/?apikey=536c8bf5&s=${query}`);
    const moviesData = await movies.json();
    
    if (moviesData.Response === "True") {
    
     movieResults.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
    
     } else {
    
     movieResults.innerHTML = <p>`No results found for ${query}'</p>;
     
     
    }
}   
    
    function movieHTML(movie) {
    
    return ` <div class="movie">
    
     <div class="movie-card">
    
     <div class="movie-card__container">
    
     <h3>${movie.Title}</h3>
    
     <p><b>Year:</b>${movie.Year}</p>
    
     <img src="${movie.Poster}" alt="${movie.Title}" />
    
     </div>
    
     </div>`;
    
    }
    
    function getMovies() {
        const query = document.getElementById('movieTitle').value.trim();
        onSearchChange({ target: { value: query } });
    }

    movieTitle.addEventListener("input", onSearchChange);