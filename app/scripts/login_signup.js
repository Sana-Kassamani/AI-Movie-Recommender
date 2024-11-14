const signup = document.getElementById("signupButton");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("errorMessage");
const login = document.getElementById("loginButton");
const shiftMessage = document.getElementById("shiftMessage");

signup.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);

  fetch("http://localhost/AI-Movie-Recommender/server-side/signup.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data["message"] == "Created") {
        console.log(data["user_id"]);
        localStorage.setItem("user_id", data["user_id"]);
        window.location.href = "./pages/home.html";
      } else if (data["message"] == "Name is already registered") {
        console.log("Name is already registered");
        error.innerText = "Name is already registered";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

login.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);

  fetch("http://localhost/AI-Movie-Recommender/server-side/login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data["status"] == "Login Successful!") {
        console.log(data["user"]);
        const user = data["user"];
        localStorage.setItem("user_id", user["user_id"]);
        if (user.user_type_id === 2) {
          window.location.href = "./pages/home.html";
        } else if (user.user_type_id === 1) {
          window.location.href = "./pages/adminPanel.html";
        }
      } else if (data["status"] == "You are banned!") {
        console.log("You are banned!");
        error.innerText = "You are banned!";
      } else if (data["status"] == "Invalid Credentials!") {
        console.log("Invalid Credentials!");
        error.innerText = "Invalid Credentials!";
      } else if (data["status"] == "Username doesnt exist, Please register") {
        error.innerText = "Username doesnt exist Please register";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
shiftMessage.addEventListener("click", () => {
  if (loginButton.style.display === "none") {
    loginButton.style.display = "inline-block";
    signupButton.style.display = "none";
    shiftMessage.textContent = "Don't have an account yet? Signup";
  } else {
    signupButton.style.display = "inline-block";
    loginButton.style.display = "none";
    shiftMessage.textContent = "Do you already have an account? Login";
  }
});
