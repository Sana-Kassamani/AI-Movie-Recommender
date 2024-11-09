<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];

$query = $connection->prepare("SELECT 
                                b.movie_id AS bookmarked,
                                r.rating_scale AS rated,
                                u.nb_of_clicks,
                                u.time_spent
                                FROM 
                                (SELECT * FROM bookmarks b
                                RIGHT JOIN ratings r ON b.user_id = r.user_id)
                                INNER JOIN user_activities u ON br.user_id = u.user_id
                                WHERE 
                                    u.user_id = ?;
                                ");
$query->bind_param("i",$user_id);
$query->execute();

$result = $query->get_result();
if($result){
    $array=[];
    while($movie = $result->fetch_assoc())
    {
        $array[]= $movie;
    }
    echo json_encode([
        "movies"=>$array,
    ]);
}
else{
    echo json_encode([
        "message"=>"No movies"
    ]);
}