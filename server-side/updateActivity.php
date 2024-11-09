<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];
$movie_id = $_POST["movie_id"];
$nb_of_clicks = $_POST["nb_of_clicks"];
$time_spent = $_POST["time_spent"];

$query = $connection->prepare("UPDATE user_activities SET nb_of_clicks = ?, time_spent=? WHERE user_id = ? AND movie_id=?");
$query->bind_param("iiii",$nb_of_clicks,$time_spent, $user_id,$movie_id,);
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    echo json_encode([
        "status" => "Updated successfully",
        "message" => "$result added to activities table"
    ]);
}else{
    echo json_encode([
        "status" => "Failed to add activity"
    ]);
}
