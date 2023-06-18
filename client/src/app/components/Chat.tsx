import React, { useRef, useEffect, useState } from "react";
import { useChat } from "ai/react";
import Message from "@/types/Message";
import Loader from "./Loader";

export default function Chat({
  msgLoading,
  sendPrompt,
}: {
  msgLoading: boolean;
  sendPrompt: any;
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [msgLoading]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-section" ref={chatSectionRef}>

          {/* Chat */}
          <div className="chat" ref={chatRef}>
            {messages.map((m) => (
              <div className={`chat-bubble ${m.role}`}>
                <p className="chat-message">{m.content}</p>
              </div>
            ))}
            {msgLoading ? <Loader /> : null}
          </div>

          {/* Form */}
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete="off"
                autoFocus={true}
                className="form-control"
                placeholder="Enter your prompt here..."
                value={input}
                onChange={handleInputChange}
              ></input>
              <button className="btn" type="submit">
                Send
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
