<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$query=$connection->prepare("SELECT title,img from movies");
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
