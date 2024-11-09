<?php

include "connection.php";

$query=$connection->prepare("SELECT movie_id,title,img from movies");
$query->execute();

$result=$query->get_result();

if($result->num_rows>0){

  $movies=[];
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
?>
