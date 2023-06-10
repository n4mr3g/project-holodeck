import React from "react";
import Message from "../../types/Message";
import Loader from "./Loader";

export default function Chat({
  messages,
  msgLoading,
}: {
  messages: Message[];
  msgLoading: boolean;
}) {
  return (
    <>
      <div className="chat-container">
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
        </div>
      </div>
    </>
  );
}
