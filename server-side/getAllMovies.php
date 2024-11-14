<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$movie_id=$_POST['movie_id']??NULL;


  $query=$connection->prepare("SELECT title,genre, avg_rating, release_year,details FROM movies Group By title");
  $query->execute();

  $result=$query->get_result();

  $movies=[];
  if($result->num_rows>0){

    
    while($movie=$result->fetch_assoc())
    {
      $movies[]=$movie;

    }
  } else {

    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }
 ?>
