import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleUserMessage(message);
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { parse })
  );
};

export default MessageParser;
