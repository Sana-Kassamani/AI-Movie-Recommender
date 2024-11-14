const tryButton = document.getElementById("tryButton");
const logoutButton = document.getElementById("logoutButton");

function displayAllMovies() {
  fetch("http://localhost/AI-Movie-Recommender/server-side/displayMovies.php")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((movieRow) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        const title = document.createElement("p");
        title.innerHTML = movieRow["title"];

        const movieImage = document.createElement("img");
        movieImage.src = movieRow["image_src"];
        movieImage.className = "max-width";

        movieElement.appendChild(movieImage);
        movieElement.appendChild(title);

        const genre = movieRow["genre"];
        let genreSection;

        if (genre.includes("Action")) {
          genreSection = document.getElementById("actionGenre");
        }
        // else if (genre.includes("Comédie")) {
        //   genreSection = document.getElementById("comedyGenre");}
        else if (genre.includes("Drame")) {
          genreSection = document.getElementById("dramaGenre");
        } else if (genre.includes("Horreur")) {
          genreSection = document.getElementById("horrorGenre");
        } else if (genre.includes("Western")) {
          genreSection = document.getElementById("westernGenre");
        } else if (genre.includes("Science-fiction")) {
          genreSection = document.getElementById("scienceFictionGenre");
        } else {
          genreSection = document.getElementById("otherGenre");
        }

        if (genreSection) {
          genreSection.appendChild(movieElement);
        }

        movieElement.addEventListener("click", () => {
          const movie_id = movieRow["movie_id"];
          localStorage.setItem("movie_id", movie_id);
          window.location.href = "./details.html";
        });
      });
    })
    .catch((error) => console.error("Error fetching movies:", error));
}
document.getElementById("genre").addEventListener("change", function () {
  var selectedGenre = this.value;
  var targetSection = document.getElementById(selectedGenre);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

const scrollAmount = 200;

function setupScroll(sectionId, prevButtonId, nextButtonId) {
  const genreSection = document.getElementById(sectionId);
  const prevButton = document.getElementById(prevButtonId);
  const nextButton = document.getElementById(nextButtonId);

  prevButton.addEventListener("click", () => {
    genreSection.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    genreSection.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
}

setupScroll("actionGenre", "prevButtonAction", "nextButtonAction");
// setupScroll("comedyGenre", "prevButtonComedy", "nextButtonComedy");
setupScroll("dramaGenre", "prevButtonDrama", "nextButtonDrama");
setupScroll("horrorGenre", "prevButtonHorror", "nextButtonHorror");
setupScroll("westernGenre", "prevButtonWestern", "nextButtonWestern");
setupScroll("scienceFictionGenre", "prevButtonFiction", "nextButtonFiction");
setupScroll("otherGenre", "prevButtonOther", "nextButtonOther");

displayAllMovies();
tryButton.addEventListener("click", () => {
  window.location.href = "./../pages/chatbot.html";
});
logoutButton.addEventListener("click", () => {
  window.location.href = "./../index.html";
  // localStorage.setItem("userId", 0);
});
