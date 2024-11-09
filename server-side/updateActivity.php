<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];
$movie_id = $_POST["movie_id"];
$nb_of_clicks = $_POST["nb_of_clicks"];
$time_spent = $_POST["time_spent"];

$query = $connection->prepare("INSERT INTO user_activities (user_id, movie_id, nb_of_clicks, time_spent) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE nb_of_clicks = ?, time_spent=?");
$query->bind_param("iiidid", $user_id,$movie_id, $nb_of_clicks,$time_spent, $nb_of_clicks,$time_spent);
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    echo json_encode([
        "status" => "Updated successfully",
    ]);
}else{
    echo json_encode([
        "status" => "Failed to add activity"
    ]);
}
