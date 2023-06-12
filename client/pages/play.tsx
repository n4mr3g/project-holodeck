// "use client";
import { FieldValues, set } from "react-hook-form";
import { useState, useEffect } from "react";
import Message from "@/types/Message";
import Image from "next/image";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/nextjs";
// import styles from "@/styles/page.module.css";
// import FormSection from "@/components/FormSection";
import Chat from "@/components/Chat";

export default function Play() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // TODO: cache for when the user leaves the page and comes back
  // In case the user signs out while on the page.
  // if (!isLoaded || !userId) {
  //   return <RedirectToSignIn mode="modal" redirectUrl="/play" />;
  // }
  // const { userId } = auth();
  // if (!userId) {
  //   throw new Error("You must be signed in to play.");
  // }
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
    <div>
      <SignedIn>
        <Chat
          messages={messages}
          msgLoading={msgLoading}
          sendPrompt={sendPrompt}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn mode="modal" redirectUrl={window.location.href} />
      </SignedOut>
    </div>
  );
}
