const user_id = localStorage.getItem("user_id");
const bookmarkContainer = document.getElementById("bookmarkContainer");

const formData = new FormData();
formData.append("user_id", user_id);
fetch("http://localhost/AI-Movie-Recommender/server-side/getBookmark.php", {
  method: "POST",
  body: formData
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    data.forEach(movie => {
      console.log(movie['movie_id']);
      let movie_id = movie['movie_id'];

      const movieFormData = new FormData();
      movieFormData.append("movie_id", movie_id);

      fetch("http://localhost/AI-Movie-Recommender/server-side/getMovieDetails.php", {
        method: "POST",
        body: movieFormData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data['response']['title'])
          console.log(data['response']['img'])

          const movieElement = document.createElement("div");

          const title = document.createElement("p");
          title.innerHTML = data['response']['title'];

          const movieImage = document.createElement("img");
          movieImage.src = data['response']['img'];
          movieImage.className = "max-width";


          movieElement.appendChild(title);
          movieElement.appendChild(movieImage);

          bookmarkContainer.appendChild(movieElement);


        })
        .catch(error => console.error("Error fetching movie details:", error));
    });
  })
  .catch(error => console.error("There was a problem with the fetch operation:", error));
