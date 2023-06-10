"use client";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import styles from "./page.module.css";
import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState, useEffect } from "react";

export default function App() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponse] = useState<string[]>([]);



  async function sendPrompt(data: FieldValues): Promise<void> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: data.prompt }), // Pass only the prompt property
    };

    fetch("http://localhost:3001/send_ai_prompt", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        const content = response.choices[0].message.content;
        setResponse(content); // Set the response in your state or variable
        console.log("Response in client: ", content);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // // Send prompt to server to be processed by OpenAI
  // async function sendPrompt(data: FieldValues): Promise<void> {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //     // body: JSON.stringify(data.prompt),
  //   };

  //   fetch("http://localhost:3001/send_ai_prompt", requestOptions)
  //     .then((response) => response.json())
  //     .then((response) => response.choices[0].message.content)
  //     .then((response) => console.log("Response in client: ", response))
  //     .then((response) => setResponse(response)) //this is right! it gets a string.
  // }

  return (
    <main>
      <div className="header-section">
        <h1>Project Holodeck</h1>
        <p>Let me create a virtual world for you.</p>
      </div>

      {/* TODO: Iterate through the messages. */}
      {/* <ChatList questions={questions} or something like that*/}
      <AnswerSection question={questions[0]} answer={responses[0]} />
      <FormSection sendPrompt={sendPrompt} />
    </main>
  );
}
