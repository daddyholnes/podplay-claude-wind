import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export const AgentChat: React.FC<{ agentId?: string }> = ({ agentId = 'default' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate agent response (in a real app, this would be a WebSocket/API call)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: `This is a simulated response to: "${inputValue}"`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '600px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: 'white',
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: theme === 'cyber' ? '#1a1a2e' : theme === 'forest' ? '#1b4332' : '#f9fafb',
        color: theme === 'cyber' ? '#00ff9d' : theme === 'forest' ? '#95d5b2' : '#4b5563',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
        }} />
        <span style={{ fontWeight: 600 }}>Agent {agentId}</span>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#9ca3af',
          }}>
            <p>Start a conversation with the agent...</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              style={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: message.sender === 'user' 
                  ? '18px 18px 4px 18px' 
                  : '18px 18px 18px 4px',
                backgroundColor: message.sender === 'user'
                  ? theme === 'cyber' 
                    ? '#00ff9d' 
                    : theme === 'forest' 
                      ? '#95d5b2' 
                      : '#8b5cf6'
                  : theme === 'cyber'
                    ? '#1a1a2e'
                    : theme === 'forest'
                      ? '#2d6a4f'
                      : '#f3f4f6',
                color: message.sender === 'user' ? 'white' : theme === 'cyber' ? '#00ff9d' : theme === 'forest' ? '#d8f3dc' : '#1f2937',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                {message.content}
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  marginTop: '0.25rem',
                  textAlign: 'right',
                }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{
        padding: '1rem',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        gap: '0.5rem',
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '24px',
            border: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: '0.95rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0 1.5rem',
            borderRadius: '24px',
            border: 'none',
            backgroundColor: theme === 'cyber' 
              ? '#00ff9d' 
              : theme === 'forest' 
                ? '#95d5b2' 
                : '#8b5cf6',
            color: theme === 'cyber' ? '#1a1a2e' : theme === 'forest' ? '#1b4332' : 'white',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AgentChat;