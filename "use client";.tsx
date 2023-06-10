"use client";
import Image from "next/image";
import styles from "./page.module.css";
import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";


const socket = io("http://localhost:3001");

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const socket = io();
   // Send prompt to server to be processed by OpenAI
   async function sendPrompt(data: FieldValues) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "http://localhost:3001/send_ai_prompt",
        requestOptions,
      );
      const sseUrl = response.url; // extract the SSE URL from the fetch response

      console.log("Fetching SSE from:", sseUrl);

      const eventSource = new EventSource(sseUrl);

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

      eventSource.onmessage = (event) => {
        const data = event.data;
        console.log("Received SSE message: ", data);

        if (data === "[DONE]") {
          // Close the event source and stream
          console.log("Stream done, closing");
          eventSource.close();
        } else {
          // Parse and handle the SSE data
          const parsedData = JSON.parse(data);
          const { choices } = parsedData;
          const { delta } = choices[0];
          const { content } = delta;

          if (content) {
            // Update the state with the response content
            console.log("Response in client: ", content);
            setResponse(content);
          }
        }
      };
    } catch (error) {
      console.error("Error:", error);
    }

    // fetch("http://localhost:3001/send_ai_prompt", requestOptions)
    //   .then((response) => response.json())
    //   .then((response) => response.choices[0].message.content)
    //   .then((response) => setResponse(response)) //this is right! it gets a string.

    // .then((response) => console.log("Response in client: ", response));
    // .then((response) => response.json())
    // .then((response) => setResponse(response));
  }
  // async function sendPrompt(data: FieldValues) {
  //   const res = await fetch("/api/gpt3", {
  //     body: JSON.stringify({
  //       prompt: data.prompt,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });
  //   return await res.json();
  // }


  return (
    <main>
      <div className="header-section">
        <h1>Project Holodeck</h1>
        <p>Let me create a virtual world for you.</p>
      </div>

      {/* <ChatList questions={question} or something like that*/}
      <AnswerSection question={question} answer={answer} />
      <FormSection sendPrompt={sendPrompt} />
    </main>
  );
}
