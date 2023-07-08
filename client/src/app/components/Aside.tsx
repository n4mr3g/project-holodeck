//TODO: Create Aside component
"use client";
import React, { useRef, useEffect } from "react";
import Message from "@/types/Message";
import Loader from "./Loader";

export default function Aside({}: {}) {
  useEffect(() => {
    // Scroll to bottom when new messages are added
    const scrollToBottom = () => {
      console.log("triggered");
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
