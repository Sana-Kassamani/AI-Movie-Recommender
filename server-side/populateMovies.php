<?php

include "connection.php";

$json = file_get_contents('/scraping/data.json');
$data = json_decode($json, true);

$values = [];
foreach ($data as $movie) {
    $values[] = "('" . $connection->real_escape_string($movie['img']) . "', '" . 
                       $connection->real_escape_string($movie['title']) . "', '" . 
                       $connection->real_escape_string($movie['year']) . "', '" . 
                       $connection->real_escape_string($movie['genre']) . "', '" . 
                       $connection->real_escape_string($movie['info']) . "')";
}

$query = "INSERT INTO movies (image_src, title, release_year, genre, details) VALUES " . implode(", ", $values);
$connection->query($query);

if ($connection->affected_rows > 0) {
    echo "Rows inserted/updated successfully.";
} else {
    echo "No rows affected.";
}

