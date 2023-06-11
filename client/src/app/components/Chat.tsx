import React, { useRef, useEffect } from "react";
import Message from "@/types/Message";
import Loader from "./Loader";
import FormSection from "./FormSection";

export default function Chat({
  messages,
  msgLoading,
  sendPrompt,
}: {
  messages: Message[];
  msgLoading: boolean;
  sendPrompt: any;
}) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  return (
    <>
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-section">
          <div className="chat">
            {messages.map((message: Message) => (
              <div
                className={`chat-bubble ${message.isFromBot ? "bot" : "user"}`}
              >
                <p className="chat-message">{message.content}</p>
              </div>
            ))}
            {msgLoading ? <Loader /> : null}
          </div>
          <FormSection sendPrompt={sendPrompt} />
        </div>
      </div>
    </>
  );
}
