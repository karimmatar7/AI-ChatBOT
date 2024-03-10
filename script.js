const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const openAIApiKey = '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'; 
const sendButton = document.getElementById('send-btn');

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage(userInput.value);
  }
}

sendButton.addEventListener('click', () => {
  sendMessage(userInput.value);
});

async function sendMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.innerText = message;
  chatOutput.appendChild(userMessage);

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: message,
        max_tokens: 100
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const botResponse = responseData.choices[0].text.trim();
    displayBotMessage(botResponse);
    userInput.value = ''; // Clear the input field after sending the message
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayBotMessage(message) {
  const botMessage = document.createElement('div');
  botMessage.className = 'message bot-message';
  botMessage.innerHTML = `${message}`; // Include bot logo in bot message
  chatOutput.appendChild(botMessage);
}
