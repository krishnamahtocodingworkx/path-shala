import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm the Pathshala assistant. How can I help you today?")
  ],
  botName: "PathshalaBot",
};

export default config;