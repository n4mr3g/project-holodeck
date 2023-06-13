import React, { useRef, useEffect, useState } from "react";
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
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    //TODO: Delete unnecessary refs.
    // Scroll to bottom when new messages are added.
    const scrollToBottom = () => {
      const container = chatContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
      const section = chatSectionRef.current;
      if (section) {
        section.scrollTop = section.scrollHeight;
      }
      const chat = chatRef.current;
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    };
    scrollToBottom();
  }, [msgLoading]);






  return (
    <>
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-section" ref={chatSectionRef}>
          <div className="chat" ref={chatRef}>
            {messages.map((message: Message) => (
              <div
                className={`chat-bubble ${message.isFromAi ? "bot" : "user"}`}
              >
                <p className="chat-mesMessagesage">{message.content}</p>
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
