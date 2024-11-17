// page.js
'use client';
import './globals.css';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TypingIndicator from './TypingIndicator';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to Infosys! How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    const userMessage = message;
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "Oops, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '40px',
        background: `linear-gradient(135deg, #f0f4ff, #e0e7ff)`,
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '600px',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          position: 'relative',
        }}
      >
        {/* Header Text Only */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: '#005b9f',
            fontWeight: '600',
            paddingBottom: '16px',
            fontFamily: '"Trebuchet MS", "Segoe UI", Arial, sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.05em',
          }}
        >
          Fin - Powered by Infosys
        </Typography>

        <Divider sx={{ marginBottom: 16 }} />
        <Stack
          direction="column"
          spacing={2}
          sx={{
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
                animation: 'fadeIn 0.3s',
              }}
            >
              {/* Replace Avatar with Inline SVG Logo */}
              {msg.role === 'assistant' && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '8px',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="40"
                    height="40"
                    aria-label="Infosys Logo"
                  >
                    <path fill="#005b9f" d="M20 20h216v216H20z" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="24"
                      fontFamily="Arial, sans-serif"
                    >
                      Infosys
                    </text>
                  </svg>
                </Box>
              )}
              <Box
                sx={{
                  bgcolor: msg.role === 'assistant' ? '#e3f2fd' : '#bbdefb',
                  color: '#333',
                  borderRadius: '12px',
                  padding: '12px',
                  maxWidth: '75%',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </Stack>
        <Box sx={{ display: 'flex', gap: 1, paddingTop: '16px' }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            sx={{
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#90caf9' },
                '&:hover fieldset': { borderColor: '#64b5f6' },
                '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
              },
            }}
          />
          <Button
            variant="contained"
            endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
            onClick={sendMessage}
            sx={{
              borderRadius: '8px',
              minWidth: '60px',
              backgroundColor: '#005b9f',
              '&:hover': { backgroundColor: '#1e88e5' },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
