<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (replace "*" with specific domains for better security)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

// Handle preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
