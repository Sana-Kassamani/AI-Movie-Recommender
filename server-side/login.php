<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$username = $_POST["username"];
$password = $_POST["password"];

$query = $connection->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();

$result = $query->get_result();
if($result -> num_rows != 0){
    $user = $result->fetch_assoc(); //since 1 row

    $check_pass = password_verify($password, $user["password"]);
    if($check_pass){
        $check_ban = $user["banned"];
        if(!$check_ban){
            echo json_encode([
                "status" => "Login Successful!",
                "user" => $user,
            ]);
        }else{
            echo json_encode([
                "status" => "You are banned!",
            ]);
        };

    }else{
        echo json_encode([
            "status" => "Invalid Credentials!",
        ]);
    };
}else{
    echo json_encode([
        "status" => "Username doesnt exist, Please register"
    ]);
}


