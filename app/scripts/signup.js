const signup = document.getElementById('signup');
const username = document.getElementById('username');
const password = document.getElementById('password');

signup.addEventListener('click', () => {

  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value)

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
        window.location.href = "./../index.html";
      }
      else if (data['message'] == 'Name is already registered') {
        console.log("Name is already registered");
      }

    })


    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

})
