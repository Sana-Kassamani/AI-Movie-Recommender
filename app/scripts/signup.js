const signup = document.getElementById('signupButton');
const signedUsername = document.getElementById('signedUsername');
const signedPassword = document.getElementById('signedPassword');
const signError = document.getElementById('signErrorMessage');
const login = document.getElementById('loginButton');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginErrorMessage');

signup.addEventListener('click', () => {

  const formData = new FormData();
  formData.append("username", signedUsername.value);
  formData.append("password", signedPassword.value);

  fetch("http://localhost/AI-Movie-Recommender/server-side/signup.php", {
    method: "POST",
    body: formData
  }).then(response => {
    return response.json();
  })
    .then(data => {

      if (data['message'] == 'Created') {
        console.log(data['user_id']);
        localStorage.setItem('user_id', data['user_id']);
        window.location.href = "./pages/displayMovies.html";
      }
      else if (data['message'] == 'Name is already registered') {
        console.log("Name is already registered");
        signError.innerText = "Name is already registered";

      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

})


login.addEventListener('click', () => {

  const formData = new FormData();
  formData.append("username", loginUsername.value);
  formData.append("password", loginPassword.value);

  fetch("http://localhost/AI-Movie-Recommender/server-side/login.php", {
    method: "POST",
    body: formData
  }).then(response => {
    return response.json();
  })
    .then(data => {
      console.log(data);
      if (data['status'] == 'Login Successful!') {
        console.log(data['user']);
        const user = data['user'];
        localStorage.setItem('user_id', user['user_id']);
        window.location.href = "./pages/displayMovies.html";
      }
      else if (data['status'] == 'You are banned!') {
        console.log("You are banned!");
        loginError.innerText = "You are banned!";

      }
      else if (data['status'] == 'Invalid Credentials!') {
        console.log("Invalid Credentials!");
        loginError.innerText = "Invalid Credentials!";

      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

})
