
class Movie {
  constructor(title, rating, year, poster) {
    this.title = title;
    this.rating = rating;
    this.year = year;
    this.poster = poster;
  }
}

const movies = [];

document.getElementById("addMovie").addEventListener("click", function () {
  const title = document.getElementById("movieTitle").value.trim();
  const rating = document.getElementById("movieRating").value;
  const year = document.getElementById("movieYear").value;

  if (!title || !rating || !year) {
    alert("Please fill in all fields to add a movie.");
    return;
  }

  if (movies.length >= 10) {
    alert("Maximum of 10 movies reached.");
    return;
  }

  const apiKey = "d5cbdad223e5b1e1144067dce71cc719";

  const query = encodeURIComponent(title);

  // TMDB endpoint for searching movies
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let posterUrl;
    if (data.results.length > 0 && data.results[0].poster_path) {
      const firstMovie = data.results[0];
      posterUrl = `https://image.tmdb.org/t/p/original${firstMovie.poster_path}`;
    } else {
      posterUrl = './images/empty.png' 
    }
    const movie = new Movie(title, parseInt(rating), parseInt(year), posterUrl);
    movies.push(movie);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });


  document.getElementById("movieTitle").value = "";
  document.getElementById("movieRating").value = "";
  document.getElementById("movieYear").value = "";
});

document.getElementById("showMovies").addEventListener("click", function () {
  const moviesList = document.getElementById("movieList");
  moviesList.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("div");
    const info = document.createElement("h2");

    card.className = 'movie-card';
    img.src = movie.poster;
    img.alt = 'Movie poster';
    title.textContent = movie.title[0].toUpperCase() + movie.title.slice(1);
    title.className = 'movie-title';
    info.textContent = `Rating: ${movie.rating}, Year: ${movie.year}`;
    

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(info);
  
   

    moviesList.appendChild(card);
  });
});