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
// $userMessage = "Tell more about this movie Riddle of Fire?";


// $userActivity = [
//     ["name"=>"Monkey Man", "genre" => "Action", "nb_of_clicks"=>1, "time_spent(ms)"=>27119, "bookmarked"=>"no","rating_scale(/5)"=>4],
//     ["name"=>"The Avengers", "genre" => "Action", "nb_of_clicks"=>3, "time_spent(ms)"=>28919, "bookmarked"=>"yes","rating_scale(/5)"=>3],
// ];

// $messagesBox[] = [$userMessage];  //populate the messages box that will preserve the last 5 messages

// $chats = getLastMessages($messagesBox);

// Prepare the request payload
$data = [
    "model" => "gpt-3.5-turbo",
    "messages" => [
        [
            "role" => "system",
            // "content" => "You are generally very smart and specifically a movie expert on a movie recommender website, you should be able to talk with customers nicely and welcome them and say hello. when you are asked to recommend movies,
            // you provide them a set of movies from this list" . json_encode($movies) . "you recommend them to watch according to
            // several critera user activity critera like their movie bookmarks
            // (yes if they bookmakred, no if they didnt), time spent on movie (which is time_spent in milliseconds), and clicks on certain movies (how many time they inspected it)" . json_encode($userActivity) .
            // "Provide the response as a parsable JSON object having the following criteria: movie name, genre, release date, small information. you recommend up to 3 movies. and tell me why you chose them at the end. remember you should take all the user activities into consideration  but
            // dont recommend movies that the user has activity in.
            // dont remember to welcome customers"

            "content"=>"You are going to answer questions of a user in a movie recommender system. Questions may range between summarize plots and other questions about the movies, you may be asked questions outside the scope of the movies list, feel free to answer 
            if  you have any relevant information. also you ill be asked to give
            recommendations of movies, stick to recommendations from this list" . json_encode($movies) . "and user may ask you to summarize plots and other questions about the movies, you may be asked questions outside the scope of the movies list, feel free to answer 
            if  you have any relevant information.
            Base your recommendations for the user on his/her activity provided in the following list"  . json_encode($userActivity) . " This means find movies that are related to those with user activity 
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
