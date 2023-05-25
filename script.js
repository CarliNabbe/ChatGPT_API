// Get the necessary HTML elements
const inputElement = document.getElementById('input');
const generateButton = document.getElementById('generateBtn');
const outputElement = document.getElementById('output');

// Add event listener to the generate button
generateButton.addEventListener('click', generateText);

// Function to generate text using the OpenAI API
function generateText() {
  const prompt = inputElement.value;
  const apiKey = "APIKEY_HERE";

  // Make a request to the OpenAI API
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 50,
      temperature: 0.5,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("API request failed");
      }
      return response.json();
    })
    .then((data) => {
      const choices = data.choices;
      if (choices.length > 0) {
        const generatedText = choices[0].message.content;
        outputElement.textContent = generatedText;
      } else {
        outputElement.textContent = "No response from the model.";
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      outputElement.textContent =
        "An error occurred. Please check the console for more details.";
    });
}
