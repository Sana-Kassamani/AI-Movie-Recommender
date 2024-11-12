const moviesContainer = document.getElementById("allMovies");
const movieDetails = document.getElementById("movieDetails");
const chatbotButton = document.getElementById("chatbotButton");
const bookmarkButton = document.getElementById("bookmarkButton");

function displayAllMovies() {
  fetch("http://localhost/AI-Movie-Recommender/server-side/getAllMovies.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(movieRow => {

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        const title = document.createElement("p");
        title.innerHTML = movieRow['title'];

        const movieImage = document.createElement("img");
        movieImage.src = movieRow['image_src'];
        movieImage.className = "max-width";

        movieElement.appendChild(title);
        movieElement.appendChild(movieImage);

        const genre = movieRow['genre'];
        let genreSection;

        if (genre.includes("Action")) {
          genreSection = document.getElementById("actionGenre");
        } else if (genre.includes("Comédie")) {
          genreSection = document.getElementById("comedyGenre");
        } else if (genre.includes("Drame")) {
          genreSection = document.getElementById("dramaGenre");
        }

        if (genreSection) {
          genreSection.appendChild(movieElement);
        }

        movieElement.addEventListener('click', () => {
          const movie_id = movieRow['movie_id'];
          localStorage.setItem("movie_id", movie_id);
        });
      });
    })
    .catch(error => console.error('Error fetching movies:', error));
}
// Listen for change in the dropdown
document.getElementById('genre').addEventListener('change', function () {
  var selectedGenre = this.value; // Get selected genre
  var targetSection = document.getElementById(selectedGenre); // Get the target section by ID
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the selected section
  }
});

chatbotButton.addEventListener('click', () => window.location.href = './../pages/chatbot.html');
bookmarkButton.addEventListener('click', () => window.location.href = './../pages/displayBookmarks.html');
displayAllMovies();
