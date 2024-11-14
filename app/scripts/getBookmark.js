const user_id = localStorage.getItem("user_id");
const bookmarkContainer = document.getElementById("bookmarkContainer");
const backBtn = document.getElementById("back-button");
// const imgSrc = document.getElementById("img_src");
// const movieName = document.getElementById("movie-name");
backBtn.addEventListener("click", () => {
  window.location.href = "./home.html";
});

const formData = new FormData();
formData.append("user_id", user_id);
fetch(
  "http://localhost/AI-Movie-Recommender/server-side/getBookmarksOfUsers.php",
  {
    method: "POST",
    body: formData,
  }
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    data.forEach((movie) => {
      console.log(movie["movie_id"]);
      let movie_id = movie["movie_id"];

      const movieFormData = new FormData();
      movieFormData.append("movie_id", movie_id);

      fetch(
        "http://localhost/AI-Movie-Recommender/server-side/getMovieDetails.php",
        {
          method: "POST",
          body: movieFormData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data["response"]["title"]);
          console.log(data["response"]["image_src"]);

          const container = document.createElement("div");
          container.className = "bookmarkContainer";

          const movieImage = document.createElement("img");
          movieImage.src = data["response"]["image_src"];

          const movieTitle = document.createElement("p");
          movieTitle.textContent = data["response"]["title"];

          container.appendChild(movieImage);
          container.appendChild(movieTitle);

          bookmarkContainer.appendChild(container);
        })
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    });
  })
  .catch((error) =>
    console.error("There was a problem with the fetch operation:", error)
  );
