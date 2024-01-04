// app.js

import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import dotenv from "dotenv";
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(data, mimeType) {
    return {
        inlineData: {
            data: data.toString('base64'),
            mimeType,
        },
    };
}

app.post('/generate-content', upload.single('image'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const imageFile = req.file;

        if (!prompt || !imageFile) {
            return res.status(400).json({ error: 'Missing prompt or image file in the request body' });
        }

        console.log('Received request with prompt:', prompt);
        console.log('Received image file:', imageFile);

        const template = prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const image = [fileToGenerativePart(imageFile.buffer, imageFile.mimetype)];

        const result = await model.generateContent([template, ...image]);
        const response = await result.response;
        const text = response.text();

        console.log('Generated text:', text);

        res.json({ result: text });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
