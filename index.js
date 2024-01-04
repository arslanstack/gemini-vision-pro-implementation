import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

import * as dotenv from "dotenv";
dotenv.config();

const template = `Task: Image Analysis and Textual Description

Step 1: Image Recognition and Verification

Examine the provided image to identify and verify the presence of objects, locations, or individuals.

Step 2: Data Extraction

For identified elements in the photo, extract detailed information about the specific objects, places, or individuals present.

Step 3: Reporting in a Strict Three-Sentence Format

First Sentence: Describe the nature of the object, place, or person(s) captured in the photo.
Second Sentence: Provide names, including individuals, brands, or locations featured in the image.
Third Sentence: Include any additional pertinent details or relevant information associated with the identified elements.
`;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const image = [fileToGenerativePart("./messi.png", "image/jpeg")];

const result = await model.generateContent([template, ...image]);
const response = await result.response;
const text = response.text();
console.log(text);
