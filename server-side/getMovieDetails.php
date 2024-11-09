<?php
include "connection.php";

$movie_id=$_POST['movie_id'];

$query=$connection->prepare("SELECT * FROM movies WHERE ?");
$query->bind_param("i",$movie_id);

$query->execute();

$result = $query->get_result();
$movie = $result->fetch_assoc();

if ($movie) {
  echo json_encode([
      "message" => "Get movie details successful",
      "movie" => $movie
  ]);
} else {
  echo json_encode([
      "message" => "Movie not found"
  ]);
}
?>
