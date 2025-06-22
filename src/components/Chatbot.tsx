import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, `🧑: ${input}`];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiResponse = data?.response || "❌ No response from server";

      setMessages((prev) => [...prev, `🤖: ${aiResponse}`]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [...prev, "❌ Error contacting the server"]);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header" onClick={() => setIsOpen(false)}>
            ✖️ Gemini Bot
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="message">
                {msg}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}
