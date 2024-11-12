const stars = document.querySelectorAll(".stars i");
const movieTitle = document.getElementById("movie-title");
const movieDescription = document.getElementById("movie-description");
const bookmarkBtn = document.getElementById("bookmark");
const backBtn = document.getElementById("back-button")

const user_id = 1;
const movie_id = 5;

let rating_scale=0;
//const user_id = localStorage.getItem("user_id")
//const movie_id = localStorage.getItem("movie_id")

fetchMovieDetails()

let startTime; 
let elapsedTime = 0; 
let isRunning = false; 

window.addEventListener("load", () => {
    startStopwatch();
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
backButton.addEventListener("click", backStopwatch);

function fetchMovieDetails(){

    const data = new FormData();
    data.append("movie_id",movie_id);

    axios(`http://localhost/AI-Movie-Recommender/server-side/getMovieDetails.php`,{
        method: "POST",
        data:data
    }).then((response)=>{

        console.log("Movie Id: ", response.data.response.movie_id);
        console.log("Average Rating: ", response.data.response.avg_rating);

    }).catch((error)=>{
        console.log("Error fetchin data",error)
    })

}


let isBookmarked = false;
bookmarkBtn.addEventListener("click", async () => {
    const data= new FormData();

    data.append("user_id", user_id);
    data.append("movie_id", movie_id);
    if (!isBookmarked){
        const response = await axios
        ("http://localhost/AI-Movie-Recommender/server-side/insertToBookmark.php",
            {
                method: "POST",
                data:data,
        }).then((response) => {
            console.log("Bookmark added: ", response.data)
            isBookmarked=true;
            bookmarkBtn.textContent="un-Bookmark"
        }).catch(()=>console.log("Error Bookmarking"))
}   else{
    const response = await axios
    ("http://localhost/AI-Movie-Recommender/server-side/unBookmark.php",
        {
        method:"POST",
        data:data,
    }).then((response)=>{
        console.log("Bookmark removed")
        isBookmarked=false;
        bookmarkBtn.textContent("Bookmark");
    }).catch(()=> console.log("Error unBookmarking"))
}
})



stars.forEach((star, index1) => {
star.addEventListener("click",async () => {
    stars.forEach((star, index2) => {
    // Add the "active" class to the clicked star and any stars with a lower index
    // and remove the "active" class from any stars with a higher index
    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
    
    });
    const data = new FormData();
    rating_scale = index1 + 1;

    data.append("user_id", user_id);
    data.append("movie_id", movie_id);
    data.append("rating_scale", rating_scale);

    axios("http://localhost/AI-Movie-Recommender/server-side/addRatingOnMovie.php",
        {
        method: "POST",
        data:data,
    }).then((response) => {
        console.log("Rating added: ",response.data)
    }).catch(()=>console.log("Error Rating"))
    

});
});