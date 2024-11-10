const stars = document.querySelectorAll(".stars i");

const bookmarkBtn = document.getElementById("bookmark");

const user_id = 1;
const movie_id = 1;

let currentRating=0;
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
    star.addEventListener("click", async () => {
        // Update the "active" class for the stars
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });

        const newRating = index1 + 1; // Calculate the new rating

        if (newRating !== currentRating) {
            currentRating = newRating; // Update the current rating
            console.log(`New Rating: ${currentRating}`); // Log the rating change

            // Call the appropriate API
            const data = new FormData();
            data.append("user_id", user_id);
            data.append("movie_id", movie_id);
            data.append("rating_scale", currentRating);

            // API call for changing the rating
            axios.post("http://localhost/movie_recommenderdb/AI-Movie-Recommender/server-side/updateRating.php", data)
                .then((response) => {
                    console.log("Rating updated: ", response.data);
                })
                .catch(() => {
                    console.error("Error updating rating");
                });
        }
    });
});