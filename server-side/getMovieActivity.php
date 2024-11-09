<?php

include "connection.php";


$query=$connection->prepare("SELECT m.*,SUM(nb_of_clicks) as sum_of_clicks ,SUM(time_spent) as total_time FROM movies as m LEFT JOIN user_activities as ua ON m.movie_id = ua.movie_id GROUP BY m.movie_id;" );
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