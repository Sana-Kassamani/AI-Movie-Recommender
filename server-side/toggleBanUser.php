<?php 

include "connection.php";

$user_id= $_POST["userId"];
$banned = $_POST["isBanned"];

$query = $connection->prepare("UPDATE users SET banned=? WHERE user_id = ?;");

$query->bind_param("ii",$banned,$user_id);

$query->execute();

if($query->affected_rows !=0)
{
    echo json_encode([
        "message"=> "User banned updated"
    ]);
}
else{
    echo json_encode([
        "message"=> "error updating banned in user"
    ]);
}


