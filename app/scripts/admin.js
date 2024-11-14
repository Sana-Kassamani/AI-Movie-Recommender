const users = document.getElementById("all-users");
const moviesSection = document.getElementById("all-movies");

const toggleBan = (user, isBanned) => {
  let data = new FormData();
  data.append("userId", user.user_id);
  data.append("isBanned", isBanned ? 1 : 0);
  axios("http://localhost/AI-Movie-Recommender/server-side/toggleBanUser.php", {
    method: "POST",
    data: data,
  })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log("Error banning/ unbanning user");
    });
};
const showAllUsers = () => {
  axios("http://localhost/AI-Movie-Recommender/server-side/getAllUsers.php", {
    method: "GET",
  })
    .then((response) => {
      response.data.users.forEach((user) => {
        const div_user = displayUser(user);
        users.appendChild(div_user);
      });
    })
    .catch((error) => {
      console.log("Error showing all users", error);
    });
};

function displayUser(user) {
  inner_html = `
        <div class="flex user align-center justify-center">
        <p>${user.username}</p>
        </div>
        <div class="flex user align-center justify-center">
        <p class="ban-header">${user.banned ? "Banned" : "Approved"}</p>
        </div>
        
    `;
  const div_user = document.createElement("div");
  div_user.setAttribute("class", "flex user align-center space-around");
  div_user.innerHTML = inner_html;
  const banBtn = document.createElement("button");
  const unbanBtn = document.createElement("button");
  banBtn.innerHTML = "Ban";
  unbanBtn.innerHTML = "Unban";
  banBtn.setAttribute("class", "primary-btn");
  banBtn.disabled = user.banned ? true : false;
  unbanBtn.disabled = user.banned ? false : true;
  unbanBtn.setAttribute("class", "primary-btn");
  banBtn.addEventListener("click", async () => {
    await toggleBan(user, true); // 2nd parameter: isBanned
    div_user.querySelector(".ban-header").innerHTML = "Banned";
    banBtn.disabled = true;
    unbanBtn.disabled = false;
  });
  unbanBtn.addEventListener("click", async () => {
    await toggleBan(user, false); // 2nd parameter: isBanned
    div_user.querySelector(".ban-header").innerHTML = "Approved";
    unbanBtn.disabled = true;
    banBtn.disabled = false;
  });
  div_user.appendChild(banBtn);
  div_user.appendChild(unbanBtn);
  return div_user;
}

const showAllMovies = () => {
  axios(
    "http://localhost/AI-Movie-Recommender/server-side/getMovieActivity.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      console.log(response.data.movies);
      response.data.movies.forEach((movie) => {
        const div_movie = displayMovie(movie);

        moviesSection.appendChild(div_movie);
        addStars(div_movie, movie);
      });
    })
    .catch((error) => {
      console.log("Error showing all movies", error);
    });
};

function displayMovie(movie) {
  const div_movie = document.createElement("div");
  div_movie.setAttribute("class", "flex movie space-around");
  div_movie.innerHTML = "";
  div_movie.innerHTML = `
    <div class="img-div">
      <img  src="${movie.image_src}" alt="" />
    </div>
    <div class="flex column space-around align-center">
      <p>Movie Title</p>
      <p>${movie.title}</p>
      <div class="stars">
        
      </div>
    </div>
    <div class="flex column space-around align-center">
      <p>Ratio of Total Clicks</p>
      <p>${movie.nb_of_clicks}</p>
    </div>
    <div class="flex column space-around align-center">
      <p>Ratio of Total Time</p>
      <p>${movie.time_spent}</p>
    </div>
  `;

  return div_movie;
}
const addStars = (div_movie, movie) => {
  const stars = div_movie.querySelector(".stars");
  stars.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    stars.innerHTML += `
      <i class="fa-solid fa-star ${i <= movie.avg_rating ? "active" : ""} "></i>
      `;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await showAllUsers();
  await showAllMovies();
});
