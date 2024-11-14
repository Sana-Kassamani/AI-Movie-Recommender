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

    const data = new FormData();
    data.append("userMessage", userMessage);
    data.append("user_id", 1);
    console.log(userMessage);

    axios
      ("http://localhost/AI-Movie-Recommender/server-side/chatbot.php", {
        method:"POST",
        data:data,
      })
      .then((response) => {
        console.log(response.data.reply);
        displayApiMessage(response.data.reply)
      })
      .catch((error) => {
        console.log("Error fetchin data", error);
      });
    }
    messageInput.value = "";
}


sendMessageButton.addEventListener("click", async () => {
  await sendMessage();
});
