const moviesContainer = document.getElementById("allMovies");
const movieDetails = document.getElementById("movieDetails");
const chatbotButton = document.getElementById("chatbotButton");
const bookmarkButton = document.getElementById("bookmarkButton");

function displayALlMovies() {
  fetch("http://localhost/AI-Movie-Recommender/server-side/getAllMovies.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(movieRow => {

        const movieElement = document.createElement("div");

        const title = document.createElement("p");
        title.innerHTML = movieRow['title'];

        const movieImage = document.createElement("img");
        movieImage.src = movieRow['img'];
        movieImage.className = "max-width";



        movieElement.appendChild(title);
        movieElement.appendChild(movieImage);

        moviesContainer.appendChild(movieElement);

        movieElement.addEventListener('click', () => {// to be implemented based on jeanpierre html
          const movie_id = movieRow['movie_id'];
          localStorage.setItem("movie_id", movie_id);

          //window.location.href = "./../";
        }
        )
      });
    });
}

chatbotButton.addEventListener('click', () => window.location.href = './chatbot.html');
bookmarkButton.addEventListener('click', () => window.location.href = './displayBookmarks.html');
displayALlMovies();
