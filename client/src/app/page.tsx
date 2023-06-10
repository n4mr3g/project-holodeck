"use client";
import { FieldValues, set } from "react-hook-form";
import { useState, useEffect } from "react";
import Message from "../types/Message";
import Image from "next/image";
import styles from "./styles/page.module.css";
import FormSection from "./components/FormSection";
import Chat from "./components/Chat";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);

  async function sendPrompt(data: FieldValues): Promise<void> {
    const userMessage = new Message(data.prompt, "User");
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: data.prompt }),
    };

    setMsgLoading(true);
    let botMessage: Message;
    fetch("http://localhost:3001/send_ai_prompt", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        botMessage = new Message(response.choices[0].message.content, "", true);
        console.log("Response in client: ", botMessage.content);
      })
      .then(() => {
        setMsgLoading(false);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <main>
      <div className="header-section">
        <h1>Project Holodeck</h1>
        <p>Let me create a virtual world for you.</p>
      </div>
      <Chat messages={messages} msgLoading={msgLoading} />
      {/* <AnswerSection question={questions[0]} answer={responses[0]} /> */}
      <FormSection sendPrompt={sendPrompt} />
    </main>
  );
}
