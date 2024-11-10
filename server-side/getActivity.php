<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];
$movie_id = $_POST["movie_id"];



$query = $connection->prepare("SELECT nb_of_clicks, time_spent FROM user_activities WHERE user_id = ? AND movie_id = ?");
$query->bind_param("ii", $user_id, $movie_id);
$query->execute();

$result = $query->get_result();
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "data" => $user,
    ]);
} else {
    // Return default values if no row exists
    echo json_encode([
        "status" => "success",
        "data" => [
            "nb_of_clicks" => 0,
            "time_spent" => 0,
        ],
    ]);
}