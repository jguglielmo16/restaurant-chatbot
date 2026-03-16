"use client";
import { useState } from "react";

const restaurantInfo = {
  name: "Demo Restaurant",
  location: "Providence, Rhode Island",
  hours: "Monday-Thursday 11am-10pm, Friday-Saturday 11am-11pm, Sunday 10am-9pm",
  address: "123 Main Street, Providence, RI 02903",
  phone: "(401) 555-0123",
  cuisine: "Contemporary American",
  priceRange: "$$-$$$",
  parking: "Street parking available. Validated parking at the Westminster Street garage.",
  reservationLink: "https://resy.com/cities/prov/demo-restaurant",
  specialNotes: "We offer a gluten-free menu upon request. Happy hour Monday-Friday 4-6pm. Private dining room available for groups of 10+."
};

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages, restaurantInfo }),
    });

    const data = await response.json();
    setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "420px", margin: "40px auto", fontFamily: "Georgia, serif",
      border: "1px solid #e0d6c8", borderRadius: "12px", overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
    }}>
      <div style={{
        background: "#2c1a0e", color: "#f5e6d0", padding: "18px 22px",
        fontWeight: "bold", fontSize: "17px", letterSpacing: "0.5px"
      }}>
        🍽️ {restaurantInfo.name}
        <div style={{ fontSize: "12px", fontWeight: "normal", opacity: 0.8, marginTop: "2px" }}>
          Ask me anything!
        </div>
      </div>

      <div style={{
        height: "380px", overflowY: "auto", padding: "18px",
        background: "#fdf8f2", display: "flex", flexDirection: "column", gap: "12px"
      }}>
        {messages.length === 0 && (
          <div style={{ color: "#9c8570", fontSize: "14px", textAlign: "center", marginTop: "40px" }}>
            👋 Hi! Ask me about our hours, menu, reservations, or anything else!
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            background: msg.role === "user" ? "#2c1a0e" : "#fff",
            color: msg.role === "user" ? "#f5e6d0" : "#2c1a0e",
            padding: "10px 14px", borderRadius: "16px",
            maxWidth: "80%", fontSize: "14px", lineHeight: "1.5",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
          }}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start", background: "#fff", padding: "10px 14px",
            borderRadius: "16px", fontSize: "14px", color: "#9c8570"
          }}>
            Typing...
          </div>
        )}
      </div>

      <div style={{
        display: "flex", padding: "14px", background: "#fff",
        borderTop: "1px solid #e0d6c8", gap: "8px"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: "20px",
            border: "1px solid #e0d6c8", fontSize: "14px", outline: "none",
            fontFamily: "Georgia, serif"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#2c1a0e", color: "#f5e6d0", border: "none",
            borderRadius: "20px", padding: "10px 18px", cursor: "pointer",
            fontSize: "14px", fontFamily: "Georgia, serif"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
