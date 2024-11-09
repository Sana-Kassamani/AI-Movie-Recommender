const moviesContainer = document.getElementById("allMovies");
const movieDetails = document.getElementById("movieDetails");


function displayALlMovies() {
  fetch("http://localhost/AI-Movie-Recommender/server-side/getAllMovies.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(movieRow => {
        /*  moviesContainer.innerHTML += `
                    <div>
                     <p>${movieRow['title']}</p>
                     <img src="${movieRow['img']}" ">
                     </div>`;;*/

        const movieElement = document.createElement("div");

        const title = document.createElement("p");
        title.innerHTML = movieRow['title'];

        const movieImage = document.createElement("img");
        movieImage.src = movieRow['img'];
        movieImage.className = "max-width";



        movieElement.appendChild(title);
        movieElement.appendChild(movieImage);

        moviesContainer.appendChild(movieElement);

        movieElement.addEventListener('click', () => {
          const movie_id = movieRow['movie_id'];
          localStorage.setItem("movie_id", movie_id);

          document.getElementById("allMovies").style.display = 'none'
          displayMovieDetails();
        }
        )


      });
    });
}

function displayMovieDetails() {
  const movie_id = localStorage.getItem('movie_id');

  const formData = new FormData()
  formData.append("movie_id", movie_id);

  fetch("http://localhost/AI-Movie-Recommender/server-side/getMovieDetails.php",
    {
      "method": "POST",
      body: formData
    }
  )
    .then(response => response.json())
    .then(data => {

      const details = data['response'];
      const detailsContainer = document.createElement("div");

      detailsContainer.innerHTML += `
      <div>
       <p>${details['title']}</p>
       <img class="max-width" src="${details['img']}" ">
       </div>
       <button>back<button>`;
      movieDetails.appendChild(detailsContainer);



    })

}
displayALlMovies();
