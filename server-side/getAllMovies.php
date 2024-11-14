<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$movie_id=$_POST['movie_id']??NULL;

// if($movie_id==NULL)
// {
  $query=$connection->prepare("SELECT title,genre, avg_rating, release_year,details FROM movies Group By title");
  $query->execute();

  $result=$query->get_result();

  $movies=[];
  if($result->num_rows>0){

    
    while($movie=$result->fetch_assoc())
    {
      $movies[]=$movie;

    }
    // echo json_encode($movies);
  } else {

    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }

// else {
//   $query = $connection->prepare("SELECT * FROM movies WHERE movie_id = ?");
//   $query->bind_param("i",$movie_id);

//   $query->execute();

//   $result = $query->get_result();

//   if($result->num_rows > 0) {
//     $user = $result->fetch_assoc();

//     echo json_encode($user);
//   } else {
//     echo json_encode([
//       "message" => "Not Found"
//     ]);
//   }
// }
// ?>
