import { useRouter } from 'next/router';
import { FieldValues, set } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Message from '@/types/Message';
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  useUser,
  SignIn,
} from '@clerk/nextjs';
import Chat from '@/components/Chat';

export default function Play({gameSessionId} : {gameSessionId: string}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const { isLoaded, userId, getToken } = useAuth();
  const { user } = useUser();

  // const sortMessages = (data: Message[]) => {
  //   console.log("data:", data);
  //   return data.sort((a, b) => {
  //     a.time - b.time;
  //   });
  // };

  function fetchMessages() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (userId && gameSessionId) {
      {
        fetch(
          `http://localhost:3001/messages/${userId}/${gameSessionId}`,
          requestOptions,
        )
          .then((data) => data.json())
          // .then((data) => sortMessages(data))
          .then((data = []) => setMessages(data));
        // TODO: catch block
      }
    }
  }

  // Need to send prompt to AI AND save it to DB
  function sendPrompt(data: FieldValues) {
    const userMessage = new Message(data.prompt, user?.username, user?.id);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: data.prompt,
        userId: user?.id,
        //TODO: sessions
        // session_id: sessionId,
      }),
    };
    setMsgLoading(true);
    let botMessage: Message;
    fetch(`http://localhost:3001/send_ai_prompt`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        botMessage = new Message(
          response.choices[0].message.content,
          '[AI]',
          user?.id,
          true,
        );
        console.log('Response in client: ', response);
      })
      .then(() => {
        setMsgLoading(false);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <SignedIn>
        <Chat
        gameSessionId={gameSessionId}
          // sendPrompt={sendPrompt}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn mode='modal' />
      </SignedOut>
    </div>
  );
}
