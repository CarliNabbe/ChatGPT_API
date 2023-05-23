// Get the necessary HTML elements
const inputElement = document.getElementById('input');
const generateButton = document.getElementById('generateBtn');
const outputElement = document.getElementById('output');

// Add event listener to the generate button
generateButton.addEventListener('click', generateText);

// Function to generate text using the OpenAI API
function generateText() {
  const prompt = inputElement.value;
  const apiKey = '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';
  const org = 'org-Qey69HyoEbF6K1YAA7iDKa9r';

  // Make a request to the OpenAI API
  fetch(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Organization': org
    },
    body: JSON.stringify({
      'prompt': prompt,
      'temperature': 0.7,
      'max_tokens': 100
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return response.json();
    })
    .then(data => {
      const generatedText = data.choices[0].text.trim();
      outputElement.textContent = generatedText;
    })
    .catch(error => {
      console.error('Error:', error.message);
      outputElement.textContent = 'An error occurred. Please check the console for more details.';
    });
}
