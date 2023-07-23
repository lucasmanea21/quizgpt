import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { run } from "./utils/langchain";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

const upload = multer({
  storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: 5 * 1024 * 1024, // 5MB (maximum file size)
  // },
});

app.get("/", (req: any, res: any) => {
  res.send("Express + TypeScript Server");
});

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Convert buffer to string
  const fileContent = req.file.buffer.toString();

  const vectorStore = await SupabaseVectorStore.fromTexts(
    [fileContent],
    [{ id: 1 }],
    new OpenAIEmbeddings(),
    {
      client: supabase,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const result = await vectorStore.similaritySearch(fileContent, 1);
  res.json(result);
});

app.post("/createQuiz", async (req: any, res: any) => {
  const { documentId, prompt, questions, roomId } = req.body;
  if (documentId === undefined || prompt === undefined) {
    return res.status(400).json({ error: "Bad request, missing parameters" });
  }

  // Get document
  const { data: document, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  const vectorStore = await SupabaseVectorStore.fromTexts(
    [document.content],
    [{ id: documentId }],
    new OpenAIEmbeddings(),
    {
      client: supabase,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const result = await vectorStore.similaritySearch(prompt, 1);

  console.log("result[0]", result[0]);

  // Make a request to the quiz generation service
  try {
    const quizResponse = await axios.post(
      "http://localhost:8080/quiz/generate",
      {
        context: result[0],
        questions: questions,
        roomId: roomId,
      }
    );

    // Send the quiz generation result back to the client
    res.json({ quiz: quizResponse.data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

run();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
