import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleUserMessage = (message) => {
    const msg = message.toLowerCase().trim();
    let botMessage = null;

    // Greeting
    if (/^(hi|hello|hey|namaste|good (morning|afternoon|evening))/.test(msg)) {
      botMessage =
        "Hello! 👋 Welcome to Pathshala. How can I assist you today?";
    }
    // Course info
    else if (msg.includes("course") && msg.includes("available")) {
      botMessage =
        "You can view all available courses in the 'Courses' section. Use the search or filter to find what interests you!";
    } else if (
      msg.includes("course") &&
      (msg.includes("enroll") || msg.includes("join"))
    ) {
      botMessage =
        "To enroll in a course, click on your chosen course and then hit the 'Enroll' or 'Buy Now' button.";
    } else if (
      msg.includes("course") &&
      (msg.includes("duration") || msg.includes("length"))
    ) {
      botMessage =
        "Each course lists its duration on the course details page. Most courses are self-paced!";
    }
    // Uploading courses
    else if (msg.includes("upload") && msg.includes("course")) {
      botMessage =
        "Teachers can upload new courses from their dashboard. Go to 'My Dashboard' > 'Upload Course' and follow the instructions.";
    } else if (
      msg.includes("upload") &&
      (msg.includes("video") || msg.includes("material"))
    ) {
      botMessage =
        "To upload course materials or videos, use the 'Add Content' section while creating or editing your course.";
    }
    // Pricing and payment
    else if (
      msg.includes("price") ||
      msg.includes("cost") ||
      msg.includes("fee")
    ) {
      botMessage =
        "Course prices are listed on each course page. We support secure payment via credit/debit cards, UPI, and net banking.";
    } else if (msg.includes("refund") || msg.includes("cancel")) {
      botMessage =
        "Refunds are available within 7 days of purchase if you haven't completed more than 20% of the course. Visit your 'My Courses' section to request a refund.";
    }
    // Account and login
    else if (msg.includes("login") || msg.includes("sign in")) {
      botMessage =
        "You can log in using your email and password, or via Google. If you forgot your password, use the 'Forgot Password' link.";
    } else if (
      msg.includes("register") ||
      msg.includes("sign up") ||
      msg.includes("create account")
    ) {
      botMessage =
        "To register, click the 'Sign Up' button at the top right and fill in your details. Welcome aboard!";
    } else if (msg.includes("profile") || msg.includes("edit profile")) {
      botMessage =
        "You can edit your profile details from the 'Profile' section in your dashboard.";
    }
    // Certificates
    else if (msg.includes("certificate")) {
      botMessage =
        "You will receive a certificate of completion after finishing all lessons and passing the final quiz for a course.";
    }
    // Support and contact
    else if (
      msg.includes("support") ||
      msg.includes("contact") ||
      msg.includes("helpdesk")
    ) {
      botMessage =
        "For further assistance, email us at support@pathshala.com or use the 'Contact Us' form on our website.";
    }
    // Help or fallback
    else if (
      msg.includes("help") ||
      msg.includes("how to") ||
      msg.includes("what can you do")
    ) {
      botMessage =
        "I can help you with course info, enrollment, uploading, payments, account issues, and more. Try asking about:\n• How to enroll in a course\n• How to upload a course\n• Refund policy\n• Certificate details";
    }
    // Fallback
    else {
      botMessage =
        "Sorry, I didn't understand that. You can ask about courses, enrollment, uploading, payments, certificates, or account help. For more, type 'help'.";
    }

    const msgObj = createChatBotMessage(botMessage);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msgObj],
    }));
  };

  // Pass the handler to children
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { actions: { handleUserMessage } })
  );
};

export default ActionProvider;
