const stars = document.querySelectorAll(".stars i");

const bookmarkBtn = document.getElementById("bookmark");

const user_id = 1;
const movie_id = 1;

let rating_scale=0;
//const user_id = localStorage.getItem("user_id")
//const movie_id = localStorage.getItem("movie_id")

fetchMovieDetails()
function fetchMovieDetails(){

    const data = new FormData();
    data.append("movie_id",movie_id);

    axios(`http://localhost/movie_recommenderdb/AI-Movie-Recommender/server-side/getMovieDetails.php`,{
        method: "POST",
        data:data
    }).then((response)=>{

        console.log("Movie Id: ", response.data.response.movie_id);
        console.log("Average Rating: ", response.data.response.avg_rating);

    }).catch((error)=>{
        console.log("Error fetchin data",error)
    })

}

bookmarkBtn.addEventListener("click", async () => {
    const data= new FormData();

    data.append("user_id", user_id);
    data.append("movie_id", movie_id);

    const response = await axios
    ("http://localhost/movie_recommenderdb/AI-Movie-Recommender/server-side/insertToBookmark.php",
        {
            method: "POST",
            data:data,
    }).then((response) => {
        console.log("Bookmark added: ", response.data)
    }).catch(()=>console.log("Error Bookmarking"))
    
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

    axios("http://localhost/movie_recommenderdb/AI-Movie-Recommender/server-side/addRatingOnMovie.php",
        {
        method: "POST",
        data:data,
    }).then((response) => {
        console.log("Rating added: ",response.data)
    }).catch(()=>console.log("Error Rating"))
    

});
});