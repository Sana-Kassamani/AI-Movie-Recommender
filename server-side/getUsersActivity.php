<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];

// $query = $connection->prepare("SELECT 
//                                 b.movie_id AS bookmarked,
//                                 r.rating_scale AS rated,
//                                 u.nb_of_clicks,
//                                 u.time_spent
//                                 FROM 
//                                 (SELECT * FROM bookmarks b
//                                 RIGHT JOIN ratings r ON b.user_id = r.user_id)
//                                 INNER JOIN user_activities u ON br.user_id = u.user_id
//                                 WHERE 
//                                     u.user_id = ?;
//                                 ");

$query = $connection->prepare("SELECT m.title,m.genre,ua.nb_of_clicks,ua.time_spent, b.movie_id as bookmarked, r.rating_scale 
                                FROM movies as m INNER JOIN user_activities as ua ON m.movie_id = ua.movie_id 
                                LEFT JOIN bookmarks as b ON ua.movie_id= b.movie_id 
                                LEFT JOIN ratings as r ON ua.movie_id= r.movie_id
                                WHERE ua.user_id = ?;");
$query->bind_param("i",$user_id);
$query->execute();

$result = $query->get_result();
$array=[];
if($result){
    
    while($movie = $result->fetch_assoc())
    {
        $array[]= $movie;
    }
}
else{
    echo json_encode([
        "message"=>"No movies"
    ]);
}