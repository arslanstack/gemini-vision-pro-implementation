import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

import * as dotenv from "dotenv";
dotenv.config();

const template = `Task: Analyze image.

Step 1: Image Recognition and Verification

Analyze photo provided to you and determine if there is a thing, place or person(s) in the photo.

Step 2: Data Extraction

Analyze if there is a thing, place or person(s) in the photo. Give information about that particular thing, place or person(s) in the photo.

Step 3: Reporting in a Strict Three-Sentence Format

First Sentence: What is the thing, place or person(s) in the photo?
Second Sentence: Give name of the person(s) in the image or name of the brand of thing or name of the place in the image?
Third Sentence: Any other relevant information.
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
