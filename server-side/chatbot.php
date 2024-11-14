<?php
include "getUsersActivity.php";
include "getAllMovies.php";
// OpenAI API endpoint
$url = "https://api.openai.com/v1/chat/completions";

// Your OpenAI API Key
$apiKey = "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";

function getLastMessages($messages) {
    $messagesLength = count($messages);
    return ($messagesLength <= 5) ? $messages : array_slice($messages, $messagesLength - 5);
}

$userMessage = $_POST["userMessage"]; //from user, messages should be a message


// $messagesBox[] = [$userMessage];  //populate the messages box that will preserve the last 5 messages

// $chats = getLastMessages($messagesBox);

// Prepare the request payload
$data = [
    "model" => "gpt-3.5-turbo",
    "messages" => [
        [
            "role" => "system",

            "content"=>"You are going to answer questions of a user in a movie recommender system. Questions may range between summarize plots and other questions about the movies, you may be asked questions outside the scope of the movies list, feel free to answer 
            if  you have any relevant information. also you will be asked to give
            recommendations of movies, stick to recommendations from this list" . json_encode($movies) . 
            "Base your recommendations for the user on his/her activity provided in the following list"  . json_encode($userActivity) . " This means find movies that are related to those with user activity 
            and recommend them BUT DO NOT recommend the movies in the user activity. Be polite and concise in your answers. Mind that we are in 2024 now "
        ],
        [
            "role" => "user",
            "content" => $userMessage
        ]
    ]
];

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response
curl_setopt($ch, CURLOPT_POST, true); // POST request
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json",
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Attach the JSON payload

// Execute the API request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo "cURL Error: " . curl_error($ch);
} else {
    // Decode the JSON response
    $responseData = json_decode($response, true);

    // Extract and display the assistant's reply
    $assistantReply = $responseData['choices'][0]['message']['content'] ?? "No reply found";
    echo json_encode(
        [
            "reply" => $assistantReply
        ]
        );
}

// Close the cURL session
curl_close($ch);
