

async function onSearchChange(event) {

    const query = event.target.value.trim();
    
    const movies = await fetch(`https://www.omdbapi.com/?apikey=536c8bf5&s=${query}`);
    
    const moviesData = await movies.json();
    
    console.log(moviesData.Search);
    
    if (moviesData.Response === "True") {
    
     results.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
    
     } else {
    
     results.innerHTML = <p>No results found for "${query}" </p>;
    
     
    }
}  
    
    
    function movieHTML(movie) {
    
    return `<div class="movie-card">
    
     <div class="movie-card__container">
    
     <h3>${movie.Title}</h3>
    
     <p><b>Year:</b> ${movie.Year}</p>
    
     <img src="https://${movie.Poster}" alt="${movie.Title}" />
    
     </div>
    
     </div>`;
    
    }
    
    movieTitle.addEventListener("input", onSearchChange);