import { createClient } from "@supabase/supabase-js";
import { ChatGPTBrowserClient } from "@waylaidwanderer/chatgpt-api";
import dotenv from "dotenv";
import { subSubjectPrompt } from "./prompts.js";
import fs from "fs";

dotenv.config();

const clientOptions = {
  reverseProxyUrl: "https://gpt.pawan.krd/backend-api/conversation",
  accessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdG9hc3QyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiUk8ifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVdqMVZ0RlQwcXJLSnFlYmIwQlc5NmZkSCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNmNzFhOTBhYzdhNjdjN2M5Njk0NjkwIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzczNTM5NywiZXhwIjoxNjc4OTQ0OTk3LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.x3iq0xJA1rRzlzqsL5amxkmKI3D9HQYPe9Q4dm4jN6rqZGRtnD9NWbzH5JxNBZp8iHXyIv5z_nqG0yzAhu3T6oTXgo2lMw_wKc_5EYcrziTZghimtrxKmWzGzNE-qVfJ2Ph4y9_dnEmJuZkzV1hFceCVBe3TgDWF6IoKg6OHp_JY1sbFkBojtgTXgk98fL1naLxfdwcfpPED_Qpn-2lDy3Ak3fXll199WwM_eyZEJ95qDNwITKW3lDjyqvmKpsHMosS9FaHHXX1BMutZH-rzYww1-eZWQA90xRHNT1WEpjmmOs-YUZuowHdmwbNKdZ9liX0Htdzn-d2L32S577Ad2w",
  cookies: "",
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const uploadSubjects = async () => {
  const subjects = [
    "Mathematics",
    "English Language and Literature",
    // more
  ];

  for (const subject of subjects) {
    const { error } = await supabase
      .from("categories")
      .insert({ name: subject });
    if (error) {
      console.error(`Error inserting subject ${subject}: ${error.message}`);
    } else {
      console.log(`Subject ${subject} inserted successfully`);
    }
  }
};

const processResponse = async (response, subject) => {
  const matches = response.match(/```([\s\S]*?)```/);

  if (matches) {
    const quizString = matches && matches[1];
    console.log(quizString); // Output: "asdasds"

    let transformed = eval(quizString);

    fs.writeFileSync(
      `multiplayer/${subject}.json`,
      JSON.stringify(transformed)
    );
  } else {
    fs.writeFileSync(
      `multiplayer/${subject}.json`,
      JSON.stringify(eval(response))
    );
  }
};

const generateSubSubjects = async () => {
  const subject = {
    name: "Mathematics",
    id: "7e077eba-bacf-41be-b4df-ff751fc7661e",
  };

  const chatGptClient = new ChatGPTBrowserClient(clientOptions);

  console.log("ran");

  try {
    const response = await chatGptClient.sendMessage(
      subSubjectPrompt(subject.name),
      {}
    );

    response && processResponse(response.response, subject.name);
    console.log("response", response.response);
  } catch (error) {
    console.log("error", error);
  }
};

await generateSubSubjects();

// uploadSubjects();
