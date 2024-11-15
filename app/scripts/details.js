const stars = document.querySelectorAll(".stars i");
const movieTitle = document.getElementById("movie-title");
const movieDescription = document.getElementById("movie-description");
const bookmarkBtn = document.getElementById("bookmark");
const backBtn = document.getElementById("back-button");
const imgSrc1 = document.getElementById("img_src1");
const imgSrc2 = document.getElementById("img_src2");
const movieGenre = document.getElementById("movie-genre");
const movieReleaseYear = document.getElementById("movie-release-year");

const user_id = localStorage.getItem("user_id");
const movie_id = localStorage.getItem("movie_id");

let rating_scale = 0;

fetchMovieDetails();

let startTime;
let elapsedTime = 0;
let isRunning = false;
let isBookmarked;

window.addEventListener("load", () => {
  startStopwatch();
  isBookmarkedFXN();
});

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime();
    isRunning = true;
    console.log("Stopwatch started.");
  }
}

function backStopwatch() {
  if (isRunning) {
    const now = new Date().getTime();
    elapsedTime = now - startTime;
    isRunning = false;
    console.log(`Stopwatch stopped. Total time: ${elapsedTime} ms`);

    const data = new FormData();
    data.append("user_id", user_id);
    data.append("movie_id", movie_id);
    data.append("time_spent", elapsedTime);

    axios(
      "http://localhost/AI-Movie-Recommender/server-side/updateActivity.php",
      {
        method: "POST",
        data: data,
      }
    )
      .then((response) => {
        console.log("time and clicks updated");
      })
      .catch((error) => {
        console.log("error getting insidghts");
      });
  }
}

// Add event listener to the button
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
  backStopwatch();
  window.location.href = "./home.html";
});

function fetchMovieDetails() {
  const data = new FormData();
  data.append("movie_id", movie_id);

  axios(
    `http://localhost/AI-Movie-Recommender/server-side/getMovieDetails.php`,
    {
      method: "POST",
      data: data,
    }
  )
    .then((response) => {
      const movie_details = response.data.response;
      movieTitle.textContent = movie_details.title;
      imgSrc1.src = movie_details.image_src;
      imgSrc2.src = movie_details.image_src;
      movieGenre.textContent = movie_details.genre;
      movieReleaseYear.textContent = movie_details.release_year;
      movieDescription.textContent = movie_details.details;
    })
    .catch((error) => {
      console.log("Error fetchin data", error);
    });
}

function isBookmarkedFXN() {
  const data = new FormData();
  data.append("user_id", user_id);
  data.append("movie_id", movie_id);

  axios("http://localhost/AI-Movie-Recommender/server-side/checkBookmark.php", {
    method: "POST",
    data: data,
  })
    .then((response) => {
      if (response.data.status === true) {
        bookmarkBtn.textContent = "un-Bookmark";
        isBookmarked = true;
      } else {
        bookmarkBtn.textContent = "Bookmark";
        isBookmarked = false;
      }
    })
    .catch(() => {
      console.log("Error checking if bookmarked or not");
    });
}

bookmarkBtn.addEventListener("click", async () => {
  const data = new FormData();
  data.append("user_id", user_id);
  data.append("movie_id", movie_id);

  if (!isBookmarked) {
    await axios(
      "http://localhost/AI-Movie-Recommender/server-side/insertToBookmark.php",
      {
        method: "POST",
        data: data,
      }
    )
      .then((response) => {
        console.log("Bookmark added: ", response.data);
        isBookmarked = true;
        bookmarkBtn.textContent = "un-Bookmark";
      })
      .catch(() => {
        console.log("Error bookmarking");
      });
  } else {
    await axios(
      "http://localhost/AI-Movie-Recommender/server-side/unBookmark.php",
      {
        method: "POST",
        data: data,
      }
    )
      .then((response) => {
        console.log("Bookmark removed");
        isBookmarked = false;
        bookmarkBtn.textContent = "Bookmark";
      })
      .catch(() => {
        console.log("Error unbookmarking");
      });
  }
});

stars.forEach((star, index1) => {
  star.addEventListener("click", async () => {
    stars.forEach((star, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
    const data = new FormData();
    rating_scale = index1 + 1;

    data.append("user_id", user_id);
    data.append("movie_id", movie_id);
    data.append("rating_scale", rating_scale);

    axios(
      "http://localhost/AI-Movie-Recommender/server-side/addRatingOnMovie.php",
      {
        method: "POST",
        data: data,
      }
    )
      .then((response) => {
        console.log("Rating added: ", response.data);
      })
      .catch(() => console.log("Error Rating"));
  });
});
