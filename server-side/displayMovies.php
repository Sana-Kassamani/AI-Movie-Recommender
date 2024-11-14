<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$movie_id=$_POST['movie_id']??NULL;


  $query=$connection->prepare("SELECT movie_id,title,genre, image_src FROM movies");
  $query->execute();

  $result=$query->get_result();

  $movies=[];
  if($result->num_rows>0){


    while($movie=$result->fetch_assoc())
    {
      $movies[]=$movie;

    }

    echo json_encode($movies);
  } else {

    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }
