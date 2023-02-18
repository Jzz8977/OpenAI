const router = express.Router()
const { login,findUser } = require('../services/user')
const { md5,decoded } = require('../utils')
const { PWD_SALT, JWT_EXPIRED, PRIVATE_KEY } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken');

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

let context = ''

router.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.question;
    console.log(prompt)
    if(prompt.includes('stop')){
      context = ''
      res.status(200).send({
        bot: 'clear session',
      });
      return
    }
    let params ={
      model: "text-davinci-003",
      prompt:"context:" + context +'\n\n'  + "prompt:" + prompt,
      temperature: 0.7, // Higher values means the model will take more risks.
      max_tokens: 4000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    }
    const response = await openai.createCompletion(params);
    context =  context+"\n" + prompt+"\n"+response.data.choices[0].text+'\n'
    // console.log(context)
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});
module.exports = router