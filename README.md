# Introducing QuizGPT

![QuizGPT](./QuizGPT.jpg)

## What is QuizGPT?

QuizGPT is an interactive educational platform that aims to enhance the learning process with the help of LLMs.

With the platform, anyone can create AI-generated interactive quizzes on any topic or subject.

QuizGPT aims to allow anyone to master subjects of their choice, test their knowledge and have fun while learning new things.

> The App is not yet live, but will be in the following days.

## How does it work?

The quiz creator allows you to specify all the details of your quiz. The app then makes a call to the backend server, which takes your requests and calls your LMM of choice for the question.

With the use of Langchain, Embeddings and related tech, you'll soon be able to upload your files and create quizzes based on them.

## Features

- 🧠 Educational: Learn, acquire knowledge, and become an expert in any field with the help of LLMS.
- 🏆 Gamified: Earn points for correct answers, advance in the Leaderboard, and win medals and trophies.
- 👥 Multiplayer: Compete against friends and test your knowledge in real-time.
- 🎯 Customizable: Use your own data to create quizzes - upload PDFs, text files, and many other.
- 🌐 Community Focused: Create or use pre-generated, peer-reviewed quizzes.

## Tech Stack

### Frontend

- NextJS
- TailwindCSS
- Supabase UI, Realtime, Auth
- Jotai
- WebSockets

### Backend

- Express.js
- Supabase
- FastAPI
- Llama Index
- LangChain
- Unstructured
- Pinecone

## Structure

| Codebase                             | Description                     |
| ------------------------------------ | ------------------------------- |
| [client](./client)                   | Next.js + TailwindCSS Front-end |
| [multiplayer](./backend/multiplayer) | Express API                     |
| [llm](./backend/llm)                 | FastAPI                         |
| [model](./backend/model)             | Express API                     |

## Prompts

QuizGPT uses a lot of prompt engineering in order to make the LLMs return JSON, stay in bounds and give as few errors as possible in the process of quiz generation.

All prompts can be found [here]('./backend/multiplayer/prompts.js').

## Roadmap

coming soon.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
