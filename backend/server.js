import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configration);

console.log(process.env.OPENAI_KEY);

const app = express();
app.use(cors());
app.use(express.json());


app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(prompt)
    let params = {
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot."},
        ...message
      ],
      }
    const response = await openai.createChatCompletion(params);
    console.log(response)
    // console.log(context)
    res.status(200).send({
      bot: response.data.choices[0].message,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});


app.listen(8000, () => {
  console.log("App is running");
});
