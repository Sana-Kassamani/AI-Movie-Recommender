<?php
include "connection.php";

$query= $connection->prepare("SELECT * FROM users");

$query->execute();

$result= $query->get_result();

if($result->num_rows > 0)
{
    $array=[];
    while($user = $result->fetch_assoc())
    {
        $array[]=$user;

    }
    echo json_encode([
        "users"=> $array
    ]);
}
else{
    echo json_encode([
        "message"=> "No users"
    ]);
}