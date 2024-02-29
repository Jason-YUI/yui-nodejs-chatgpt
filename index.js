import { OpenAI } from "openai";
import readline from "readline";
import * as dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
    organization: process.env.ORG,
    apiKey: process.env.API_KEY
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.on("line", async (input) => {
  await openai
    .chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});
