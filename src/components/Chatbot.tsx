import { useState, useEffect, useRef } from "react"; // 1. ייבוא useEffect ו-useRef

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  type Message = { text: string; isUser: boolean };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 2. יצירת רפרנס ל-div שאליו נגלול
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3. פונקציה לביצוע הגלילה
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 4. Hook שיפעיל את הגלילה בכל פעם שמערך ההודעות משתנה
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // התלות היא מערך ההודעות, כל שינוי בו יפעיל את הגלילה

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: `🧑: ${input}`, isUser: true };
    // עדכן את ההודעות מיד עם הודעת המשתמש
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // שמור את הערך הנוכחי של input
    setInput(""); // נקה את תיבת הקלט

    try {
      const response = await fetch("http://localhost:5678/webhook/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentInput }), // השתמש ב-currentInput
      });

      console.log("Raw response object:", response); // הצג את אובייקט ה-response המלא

      // נסה לקרוא את הטקסט הגולמי לפני ניסיון ה-JSON
      const responseText = await response.text();
      console.log("Raw response text:", responseText); // הצג את התגובה כטקסט

      // כעת נסה לפרסר ל-JSON (אבל רק אם הטקסט לא ריק)
      let data = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText); // נסה לפרסר JSON באופן ידני
          console.log("Parsed JSON data:", data);
        } catch (jsonError) {
          console.error("Failed to parse JSON:", jsonError);
          setMessages((prev) => [
            ...prev,
            { text: "✖ Invalid response format from server", isUser: false },
          ]);
          return;
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "✖ Empty response from server", isUser: false },
        ]);
        return;
      }

      // **שים לב: הנתיב הזה ספציפי ל-Gemini API. אם אתה משתמש ב-HuggingFace או משהו אחר, תצטרך להתאים אותו.**
      // אם החזרת את התשובה מ-n8n בפורמט {"response": "Some text"}, אז תשתמש ב: data.response
      // לדוגמה:
      // if (data && data.response) {
      //   const botResponseText = data.response;
      //   setMessages((prev) => [...prev, { text: botResponseText, isUser: false }]);
      // } else {
      //   setMessages((prev) => [
      //     ...prev,
      //     { text: "✖ Unexpected response format (missing 'response' field)", isUser: false },
      //   ]);
      // }

      // הקוד המקורי שלך לגישה לתשובה של Gemini:
      if (
        data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      ) {
        const geminiText = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { text: geminiText, isUser: false }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "✖ Unexpected response format (Gemini path failed)",
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        { text: "✖ Error contacting the server", isUser: false },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <>
          <div className="chatbot-box">
            <div className="chatbot-header" onClick={() => setIsOpen(false)}>
              ✖️ Gemini Bot
            </div>
            {/* 5. עוטף את ההודעות ב-div שיהיה גליל (Scrollable) */}
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.isUser ? "user" : ""}`}
                >
                  {msg.text}
                </div>
              ))}
              {/* 6. הוספת ה-div הריק עם הרפרנס בסוף רשימת ההודעות */}
              <div ref={messagesEndRef} />
            </div>
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
        </>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}
