const users = document.getElementById("all-users");
const movies = document.getElementById("all-movies");

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
        <h3>${user.username}</h3>
        <h3 class="ban-header">${user.banned ? "Banned" : "Approved"}</h3>
    `;
  const div_user = document.createElement("div");
  div_user.setAttribute("class", "flex user align-center");
  div_user.innerHTML = inner_html;
  const banBtn = document.createElement("button");
  const unbanBtn = document.createElement("button");
  banBtn.innerHTML = "Ban";
  unbanBtn.innerHTML = "Unban";
  banBtn.setAttribute("class", "ban-btn");
  banBtn.disabled = user.banned ? true : false;
  unbanBtn.disabled = user.banned ? false : true;
  unbanBtn.setAttribute("class", "unban-btn");
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

document.addEventListener("DOMContentLoaded", async () => {
  await showAllUsers();
});
