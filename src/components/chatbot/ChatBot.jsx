import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { botReplies } from "./botReplies";
import QuickReplies from "./QuickReplies";

export default function ChatBot() {
  const initialMessages = [
    {
      sender: "bot",
      text: "Hi 👋 Welcome to MakeOlix. How can we help you today?",
      options: [
        "Website Development",
        "SEO Services",
        "Pricing",
        "Book a Call",
      ],
    },
  ];
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState(initialMessages);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleReply = (option) => {
    if (
      option === "Book a Call" ||
      option === "Call Now" ||
      option === "Contact Team"
    ) {
      window.location.href = "/contact-us";
      return;
    }

    const userMessage = {
      sender: "user",
      text: option,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const botData = botReplies[option];

      const botMessage = {
        sender: "bot",
        text:
          botData?.answer || "Please contact our team for more information.",
        options: botData?.options || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };
  return (
    <>
      {/* AUTO POPUP */}

      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-5 z-9998 max-w-65 rounded-3xl border border-white/10 bg-(--bg-soft) backdrop-blur-xl p-4 shadow-[0_0_50px_rgba(17,138,178,0.25)]"
          >
            <p className="text-white text-sm leading-relaxed">
              👋 Hi there! Need help with your project?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (open) {
            setMessages(initialMessages);
            setTyping(false);
          }

          setOpen(!open);
        }}
        className="fixed bottom-5 right-5 z-10000 h-16 w-16 rounded-full bg-linear-to-br from-(--blue-2) to-(--blue-3) shadow-[0_0_40px_rgba(17,138,178,0.45)] flex items-center justify-center"
      >
        {open ? (
          <IoClose className="text-white text-3xl" />
        ) : (
          <HiMiniChatBubbleLeftRight className="text-white text-3xl" />
        )}
      </motion.button>

      {/* CHAT WINDOW */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-24 right-5 z-10000 w-[calc(100vw-40px)] sm:w-105 h-162.5 max-h-[80vh] rounded-4xl overflow-hidden border border-white/10 bg-(--bg-main) backdrop-blur-2xl shadow-[0_0_80px_rgba(17,138,178,0.25)]"
          >
            {/* HEADER */}

            <div className="relative overflow-hidden border-b border-white/10 p-5 bg-(--bg-soft)">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--blue-3),transparent_60%)]" />

              <div className="relative flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-linear-to-br from-(--blue-2) to-(--blue-3) flex items-center justify-center text-white text-xl shadow-lg">
                  <HiMiniChatBubbleLeftRight />
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg">
                    MakeOlix Assistant
                  </h3>

                  <p className="text-(--text-muted) text-sm">Online now</p>
                </div>
              </div>
            </div>

            {/* MESSAGES */}

            <div className="h-[calc(100%-96px)] overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-relaxed ${
                      message.sender === "user"
                        ? "bg-linear-to-br from-(--blue-2) to-(--blue-3) text-white"
                        : "bg-white/5 border border-white/10 text-white"
                    }`}
                  >
                    {message.text}

                    {message.options && (
                      <QuickReplies
                        options={message.options}
                        onSelect={handleReply}
                      />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* TYPING */}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 rounded-3xl px-5 py-4 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
