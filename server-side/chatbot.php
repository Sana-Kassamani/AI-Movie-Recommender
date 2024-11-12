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

$movies = [
    ["id" => 1, "name" => "Inception", "genre" => "sci-fi", "release_date" => "2010", "info" => "A sci-fi thriller about dreams."],
    ["id" => 2, "name" => "The Matrix", "genre" => "sci-fi", "release_date" => "1999", "info" => "A cyberpunk story of AI and humanity."],
    ["id" => 3, "name" => "The Godfather", "genre" => "crime", "release_date" => "1972", "info" => "A classic crime drama."],
    ["id" => 4, "name" => "The Dark Knight", "genre" => "action", "release_date" => "2008", "info" => "A superhero film featuring Batman's battle against the Joker."],
    ["id" => 5, "name" => "Pulp Fiction", "genre" => "crime", "release_date" => "1994", "info" => "A nonlinear story about crime, redemption, and twists."],
    ["id" => 6, "name" => "Forrest Gump", "genre" => "drama", "release_date" => "1994", "info" => "The journey of a kind-hearted man through life's challenges."],
    ["id" => 7, "name" => "Fight Club", "genre" => "drama", "release_date" => "1999", "info" => "A dark story exploring consumerism and identity."],
    ["id" => 8, "name" => "Interstellar", "genre" => "sci-fi", "release_date" => "2014", "info" => "A space exploration film about love and survival."],
    ["id" => 9, "name" => "The Shawshank Redemption", "genre" => "drama", "release_date" => "1994", "info" => "A story of hope and friendship in a prison setting."],
    ["id" => 10, "name" => "Schindler's List", "genre" => "historical", "release_date" => "1993", "info" => "A historical drama about the Holocaust."],
    ["id" => 11, "name" => "Gladiator", "genre" => "action", "release_date" => "2000", "info" => "A tale of revenge and honor in ancient Rome."],
    ["id" => 12, "name" => "Titanic", "genre" => "romance", "release_date" => "1997", "info" => "A romantic tragedy set aboard the ill-fated Titanic."],
    ["id" => 13, "name" => "The Avengers", "genre" => "action", "release_date" => "2012", "info" => "A team of superheroes saving the world."],
    ["id" => 14, "name" => "Avatar", "genre" => "sci-fi", "release_date" => "2009", "info" => "A visually stunning story of an alien world and human conflict."],
    ["id" => 15, "name" => "The Silence of the Lambs", "genre" => "thriller", "release_date" => "1991", "info" => "A chilling thriller about a serial killer and an FBI agent."]
];

$userActivity = [
    ["name"=>"Monkey Man", "genre" => "Action", "nb_of_clicks"=>1, "time_spent(ms)"=>27119, "bookmarked"=>"no","rating_scale(/5)"=>4],
    ["name"=>"The Avengers", "genre" => "Action", "nb_of_clicks"=>3, "time_spent(ms)"=>28919, "bookmarked"=>"yes","rating_scale(/5)"=>3],
];

$messagesBox[] = [$userMessage];  //populate the messages box that will preserve the last 5 messages

$chats = getLastMessages($messagesBox);
// Prepare the request payload
$data = [
    "model" => "gpt-3.5-turbo",
    "messages" => [
        [
            "role" => "system",
            "content" => "You are generally very smart and specifically a movie expert on a movie recommender website, you should be able to talk with customers nicely and welcome them and say hello. when you are asked to recommend movies, 
            you provide them a set of movies from this list" . json_encode($movies) . "you recommend them to watch according to 
            several critera user activity critera like their movie bookmarks (yes if they bookmakred, no if they didnt), time spent on movie (which is time_spent in milliseconds), and clicks on certain movies (how many time they inspected it)" . json_encode($userActivity) .
            "Provide the response as a parsable JSON object having the following criteria: movie name, genre, release date, small information. you recommend up to 3 movies. and tell me why you chose them at the end. remember you should take all the user activities into consideration.
            dont remember to welcome customers"
        ],
        [
            "role" => "user",
            "content" => json_encode($chats)
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
    echo "Assistant's Reply: " . $assistantReply;
}

// Close the cURL session
curl_close($ch);
