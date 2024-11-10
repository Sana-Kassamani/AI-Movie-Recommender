<?php

// OpenAI API endpoint
$url = "https://api.openai.com/v1/chat/completions";

// Your OpenAI API Key
$apiKey = "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";

// Prepare the request payload
$data = [
    "model" => "gpt-4",
    "messages" => [
        [
            "role" => "system",
            "content" => "You are a helpful assistant."
        ],
        [
            "role" => "user",
            "content" => "Say hello world"
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
