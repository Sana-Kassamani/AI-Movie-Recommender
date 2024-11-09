<?php
include "connection.php";

$movie_id=$_POST['movie_id'];

$query=$connection->prepare("SELECT * FROM movies WHERE movie_id=?");
$query->bind_param("i",$movie_id);

$query->execute();
$result = $query->get_result();

if($result->num_rows>0){
  $movie = $result->fetch_assoc();
  echo json_encode([
      "message" => "Get movie details successful",
      "response" => $movie
  ]);

}else {
  echo json_encode([
      "message" => "Movie not found"
  ]);
}

?>
