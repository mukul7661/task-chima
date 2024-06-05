"use server";

import { strict_output } from "@/lib/gpt";

export default async function generateContent(topic: string) {
  const content = await strict_output(
    "You are a helpful AI that is able to generate a presentation based on a given topic. The presentation should follow best practices in presenting a subject for audience engagement and material retention. Create 5 slides and the text should be brief and to the point.",

    `Create an outline for a presentation on the topic ${topic} with the following slides: Introduction, Main Points (3 slides), Conclusion.`
  );

  return content;
}
