const movieTitle = document.getElementById('movieTitle');
const searchButton = document.querySelector('.search-wrapper');
const searchResultText = document.querySelector('.search-info span:last-child');
let movieList;

async function onSearchChange(event) {
    const query = event.target.value.trim();
    const movieResults = document.getElementById('movieResults')
    searchResultText.textContent = query;
    const movies = await fetch(`https://www.omdbapi.com/?apikey=536c8bf5&s=${query}`);
    const moviesData = await movies.json();
    const movieWrapper = document.querySelector('.movie-list');
    
    movieWrapper.classList += ' loading-state' 
    
    if (!movies) {
        movies = await getMovies();
    
    }
    
    movieWrapper.classList.remove('loading-state');
    
    if (moviesData.Response === "True") {
    
     movieResults.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
    
     } else {
    
     movieResults.innerHTML = `<p>No results found for ${query}</p>`;
     
     
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
    
    setTimeout(() => {
        getMovies();
        });

    function getMovies() {
        const query = document.getElementById('movieTitle').value.trim();
        onSearchChange({ target: { value: query } });
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve([onSearchChange])
            }, 1000); 
        })
    }

    movieTitle.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getMovies();
        }
    });

    searchButton.addEventListener('click', getMovies);