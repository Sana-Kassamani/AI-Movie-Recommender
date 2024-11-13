<?php

include "connection.php";

$row = [];
$avg_clicks=0;
$avg_time = 0;

$get_avg_query=$connection->prepare("SELECT AVG(nb_of_clicks) as avg_clicks ,AVG(time_spent) as avg_time FROM movies as m LEFT JOIN user_activities as ua ON m.movie_id = ua.movie_id;" );
$get_avg_query->execute();
$get_avg_result = $get_avg_query->get_result();
if($get_avg_result){
    $row = $get_avg_result->fetch_assoc();
    $avg_clicks = $row["avg_clicks"];
    $avg_time= $row["avg_time"];
}
else{
    echo json_encode([
        "message"=>"No avg of clicks and time on movies"
    ]);
}

function get_average($movie, $avg_clicks,$avg_time)
{
    if($avg_clicks){
        $movie["nb_of_clicks"]= round(($movie["nb_of_clicks"]/$avg_clicks),2);
    }
    if($avg_time){
        $movie["time_spent"]= round(($movie["time_spent"]/$avg_time),2) ;
    }

    return $movie; 

}


$query=$connection->prepare("SELECT m.title,m.avg_rating,m.image_src,ua.nb_of_clicks,ua.time_spent FROM movies as m LEFT JOIN user_activities as ua ON m.movie_id = ua.movie_id;" );
$query->execute();
$result = $query->get_result();
if($result->num_rows>0){
    $movies = [];
    while($movie =$result->fetch_assoc())
    {
        $movies[]=$movie;
    }

    $movies_with_avg = array_map(function($movie) use ($avg_clicks, $avg_time) {
        return get_average($movie, $avg_clicks, $avg_time);
    }, $movies);
    echo json_encode([
         "movies"=> $movies_with_avg
       ,]
    );
}
else{
    echo json_encode([
        "message"=>"No movies"
    ]);

}
