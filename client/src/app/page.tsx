"use client";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import styles from "./page.module.css";
import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

export default function App() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const socket = io("http://localhost:3001/send_ai_prompt");
  // Send prompt to server to be processed by OpenAI
  async function sendPrompt(data: FieldValues): Promise<void> {
    console.log("Data from client: ", data);
    setQuestions([...questions, data.prompt]);
    socket.emit("prompt", data.prompt);
  }

  return (
    <main>
      <div className="header-section">
        <h1>Project Holodeck</h1>
        <p>Let me create a virtual world for you.</p>
      </div>

      {/* TODO: Iterate through the messages. */}
      {/* <ChatList questions={questions} or something like that*/}
      <AnswerSection question={questions[0]} answer={answers[0]} />
      <FormSection sendPrompt={sendPrompt} />
    </main>
  );
}
