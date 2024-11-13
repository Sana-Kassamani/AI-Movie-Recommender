const sendMessageButton = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.getElementById("messages");

function displayUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "user-message");
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayApiMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "api-response");
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
  const userMessage = messageInput.value.trim();
  console.log(userMessage);

  if (userMessage) {
    console.log(userMessage);
    displayUserMessage(userMessage);

    const body = new FormData();
    body.append("userMessage", userMessage);
    body.append("user_id", 3);
    console.log(userMessage);

    // const response = await axios.post(
    //   "http://localhost/AI-Movie-Recommender/server-side/chatbot.php",
    //   {
    //     data: body,
    //   }
    // );

    axios
      .post("http://localhost/AI-Movie-Recommender/server-side/chatbot.php", {
        method: "POST",
        data: body,
      })
      .then((response) => {
        console.log(response.data.reply);
      })
      .catch((error) => {
        console.log("Error fetchin data", error);
      });
  }
  if (data) {
    let message = data.message;
    console.log(message);
    displayApiMessage(data.message);
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ userMessage, message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  } else {
    displayApiMessage("Sorry, I didn't understand that.");
  }
}
messageInput.value = "";

sendMessageButton.addEventListener("click", async () => {
  await sendMessage();
});
