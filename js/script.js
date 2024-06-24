document.addEventListener('DOMContentLoaded', function() {
    const catalogElement = document.getElementById('catalog');

    // Replace 'YOUR_API_KEY' with your actual OMDb API key
    const apiKey = ' 64980296';
    const apiUrl = `http://www.omdbapi.com/?s=action&type=movie&apikey=${apiKey}`;

    // Fetch movie data from OMDb API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the response contains data and search results
            if (data.Response === "True" && data.Search) {
                // Iterate over each movie in the search results
                data.Search.forEach(movie => {
                    // Create a movie card element
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('col-md-4', 'movie-card');

                    // Construct the HTML for the movie card
                    const movieHTML = `
                        <div class="movie-details">
                            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'img/placeholder.png'}" alt="${movie.Title}" class="movie-poster">
                            <h3 class="movie-title">${movie.Title}</h3>
                            <p class="movie-year">Year: ${movie.Year}</p>
                            <p class="movie-director">Type: ${movie.Type}</p>
                        </div>
                    `;
                    
                    // Assign the constructed HTML to the movie card element
                    movieCard.innerHTML = movieHTML;

                    // Append the movie card to the catalog element
                    catalogElement.appendChild(movieCard);
                });
            } else {
                // Display an error message if no results were found
                catalogElement.innerHTML = '<p class="error">No movies found</p>';
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error fetching data:', error);
            catalogElement.innerHTML = '<p class="error">Failed to fetch movies</p>';
        });
});
