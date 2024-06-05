import pptxgen from "pptxgenjs";
import { generateImage } from "./gpt";
export async function generatePPT(content: string, topic: string) {
  const pptx = new pptxgen();

  pptx.defineLayout({ name: "A4", width: 8.27, height: 11.69 });
  pptx.layout = "LAYOUT_WIDE";

  const colorSchemes = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#FF69B4"];

  const slidesContent = content
    .split("\n\n")
    .filter((slide) => slide.trim() !== "");

  for (let i = 0; i < slidesContent.length; i++) {
    console.log(`Generating slide ${i + 1} of ${slidesContent.length}`);
    const slide = pptx.addSlide();

    slide.background = { fill: colorSchemes[i % colorSchemes.length] };
    slide.addText(slidesContent[i], {
      x: 0.5,
      y: 0.5,
      w: "90%",
      h: "30%",
      align: "center",
      fontSize: 24,
      bold: true,
      color: "FFFFFF", // White text color
      valign: "middle",
    });

    // Generate an image for each slide based on the slide content
    const imageBase64 = await generateImage(slidesContent[i]);
    slide.addImage({ data: imageBase64, x: 0.5, y: 3.5, w: 5, h: 5 });
  }

  pptx.writeFile({
    fileName: `${topic.replace(/\s+/g, "_")}_Presentation.pptx`,
  });
}
