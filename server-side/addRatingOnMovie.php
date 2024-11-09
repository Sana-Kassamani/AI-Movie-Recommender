<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";


$user_id = $_POST["user_id"];
$movie_id = $_POST["movie_id"]
$rating_scale = $_POST["rating_scale"];



$query = $connection->prepare("INSERT INTO  ")