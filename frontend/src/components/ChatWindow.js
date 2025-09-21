import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import TriageButtons from './TriageButtons'; // Import your new component
import { sendMessage } from '../services/api'; // Assuming you have this API service

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [showTriageButtons, setShowTriageButtons] = useState(true); // Control when to show buttons
  const chatEndRef = useRef(null);

  // Add the initial welcome message when the component loads
  useEffect(() => {
    setMessages([
      {
        id: 'initial_message',
        text: "Hello! I'm Thunai, your mental health support assistant.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    // When the user sends a message, hide the triage buttons
    setShowTriageButtons(false);

    // Add the user's message to the chat
    const userMsgObject = { 
      id: Date.now(), 
      text: userMessage, 
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages((prevMessages) => [...prevMessages, userMsgObject]);

    try {
      // Send the message to the backend API
      const botResponse = await sendMessage(userMessage);

      // Add the bot's response to the chat
      const botMsgObject = { 
        id: Date.now() + 1, 
        text: botResponse.response, 
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages((prevMessages) => [...prevMessages, botMsgObject]);
    } catch (error) {
      // Add an error message to the chat if the API fails
      const errorMsgObject = { 
        id: Date.now() + 1, 
        text: 'Sorry, I seem to be having trouble connecting. Please try again later.', 
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages((prevMessages) => [...prevMessages, errorMsgObject]);
    }
  };

  return (
    <div className="chat-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="message-list" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* This empty div is a reference point for auto-scrolling */}
        <div ref={chatEndRef} />
      </div>
      
      {/* Conditionally render the triage buttons above the input */}
      {showTriageButtons && (
        <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
          <TriageButtons onSelectTriage={handleSendMessage} />
        </div>
      )}
      
      {/* The regular text input bar */}
      <InputBar onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;