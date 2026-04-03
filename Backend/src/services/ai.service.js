import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import config from "../config/config.js";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const ai = new GoogleGenAI({
  apiKey: config.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indication how well the candidate's profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with the intention and how to answer them.",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe("How to answer this question, what points to cover etc."),
      }),
    )
    .describe(
      "behavioral questions that can be asked in the interview along with the intention and how to answer them.",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which candidate is lacking."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of this skill gap"),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe("The main focus of this day in the preparation plan"),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan",
          ),
      }),
    )
    .describe("A day-wise preparation plan for the candidate to follow in"),
  title: z
    .string()
    .describe("the title of the job for which interview report is generated."),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report for a candidate with the following details:
    Resume:${resume},
    Self Description:${selfDescription},
    JobDescription:${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  return JSON.parse(response.text);
}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "domcontentloaded",  // change from networkidle2
  });

  // wait a bit for any inline styles to apply
  await new Promise(resolve => setTimeout(resolve, 500));

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,   // add this so background colors render
    margin: {
      top: "20mm",
      left: "20mm",
      bottom: "20mm",
      right: "20mm",
    },
  });

  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate a resume for a candidate with the following details
  Resume:${resume}
  Self Description:${selfDescription}
  jobDescription:${jobDescription}
  
  the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description. 


  `;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);
  console.log("HTML CONTENT", jsonContent.html);
  
  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
  return pdfBuffer;
}

export default { generateInterviewReport, generateResumePdf };
