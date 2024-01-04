# AI-powered Nutrition Fact Explainer

This project uses the Gemini Pro Vision LLM (Google Generative AI) library to generate nutrition facts and insights from an image.

## Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Oyemade/ai-nutrition-fact-explainer-using-gemini-pro-vision-llm
   ```
2. Install the dependencies
   ```sh
   npm install
   ```

## Usage

1. Add your Google API key to the `.env` file
   ```env
   GOOGLE_API_KEY=your_google_api_key
   ```
2. Run the script with Node.js
   ```sh
   node index.js
   ```

## Functionality

The main function in this project is [`fileToGenerativePart`](index.js) which reads a file, encodes it to base64, and returns an object with the encoded data and its MIME type.

The script uses the Google Generative AI library to generate content based on a template and an image. The `model.generateContent` function is used to generate the content. It takes an array as an argument, which includes the template and the image data. The generated content is then logged to the console.

The `response` object is a result of the `model.generateContent` function. It contains the response from the Google Generative AI library. The `text` method is called on the `response` object to extract the generated text.

The generated content is then logged to the console.

## Dependencies

- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [dotenv](https://www.npmjs.com/package/dotenv)
