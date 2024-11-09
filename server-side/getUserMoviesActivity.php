<?php
include "connection.php";

$user_id=$_POST['user_id'];

$query=$connection->prepare("SELECT *
FROM movies
JOIN user_activities ON movies.movie_id = user_activities.movie_id
WHERE user_activities.user_id = ?");

$query->bind_param("i",$user_id);

$query->execute();

$result=$query->get_result();

if($result->num_rows>0)
{
  $moviesActivities=[];

  while($row=$result->fetch_assoc())
  {
    $moviesActivities[]=$row;
  }

  echo json_encode([
     "status"=>"successfull",
     "message"=>$moviesActivities]);


}else{
  echo json_encode([
    "status"=>"failed",
    "message"=> "no activity for this user"]);
}
