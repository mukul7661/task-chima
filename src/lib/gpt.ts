"use server";
import { Configuration, OpenAIApi } from "openai-edge";
import OpenAI from "openai";
import axios from "axios";
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY!,
});

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format?: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  // start off with no error message
  let error_msg: string = "";

  try {
    // Use OpenAI to get a response
    const response = await openai.chat.completions.create({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    const data = response?.choices[0]?.message?.content;

    return { success: data };
  } catch (e) {
    console.log("An exception occurred:", e);
    return { error: "something went wrong" };
  }
}

export async function generateImage(description: string) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: description,
    n: 1,
    size: "1024x1024",
  });
  const imageUrl = response.data[0].url;
  console.log("imageUrl", imageUrl);

  const imageResponse = await axios.get(imageUrl!, {
    responseType: "arraybuffer",
  });
  const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
    "base64"
  );

  return `data:image/png;base64,${imageBase64}`;
}
