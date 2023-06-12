import { FieldValues, set } from "react-hook-form";
import { useState, useEffect } from "react";
import Message from "@/types/Message";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import Chat from "@/components/Chat";

export default function Play() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  // TODO: cache for when the user leaves the page and comes back
  async function sendPrompt(data: FieldValues): Promise<void> {
    const userMessage = new Message(data.prompt, user?.username, user?.id);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: data.prompt }),
    };

    setMsgLoading(true);
    let botMessage: Message;
    fetch(`http://localhost:3001/send_ai_prompt`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        botMessage = new Message(
          response.choices[0].message.content,
          "",
          "",
          true,
        );
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
        <RedirectToSignIn mode="modal" redirectUrl="/play" />
      </SignedOut>
    </div>
  );
}
