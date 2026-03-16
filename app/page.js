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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! Welcome to ${restaurantInfo.name} 👋 How can I help you today?` }
  ]);
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
    <>
      <div style={{
        position: "fixed", bottom: "24px", right: "24px",
        display: "flex", flexDirection: "column", alignItems: "flex-end",
        gap: "12px", zIndex: 9999, fontFamily: "Georgia, serif"
      }}>

        {isOpen && (
          <div style={{
            width: "340px", background: "#fff", borderRadius: "16px",
            overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            border: "1px solid #e0d6c8", display: "flex", flexDirection: "column"
          }}>

            <div style={{
              background: "#2c1a0e", padding: "14px 16px",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "18px"
              }}>🍽️</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#f5e6d0", fontSize: "14px", fontWeight: "bold" }}>
                  {restaurantInfo.name}
                </div>
                <div style={{ color: "rgba(245,230,208,0.7)", fontSize: "11px" }}>
                  Typically replies instantly
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                background: "none", border: "none", color: "#f5e6d0",
                fontSize: "20px", cursor: "pointer", padding: "0 4px", lineHeight: 1
              }}>×</button>
            </div>

            <div style={{
              height: "300px", overflowY: "auto", padding: "14px",
              background: "#fdf8f2", display: "flex", flexDirection: "column", gap: "10px"
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", gap: "8px", alignItems: "flex-end",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row"
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "#2c1a0e", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "12px", flexShrink: 0
                    }}>🍽️</div>
                  )}
                  <div style={{
                    background: msg.role === "user" ? "#2c1a0e" : "#fff",
                    color: msg.role === "user" ? "#f5e6d0" : "#2c1a0e",
                    padding: "9px 13px",
                    borderRadius: msg.role === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    maxWidth: "210px", fontSize: "13px", lineHeight: "1.5",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "#2c1a0e", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "12px"
                  }}>🍽️</div>
                  <div style={{
                    background: "#fff", padding: "9px 13px", borderRadius: "16px 16px 16px 2px",
                    fontSize: "13px", color: "#9c8570"
                  }}>Typing...</div>
                </div>
              )}
            </div>

            <div style={{
              display: "flex", padding: "12px", background: "#fff",
              borderTop: "1px solid #e0d6c8", gap: "8px"
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: "9px 14px", borderRadius: "20px",
                  border: "1px solid #e0d6c8", fontSize: "13px",
                  outline: "none", fontFamily: "Georgia, serif"
                }}
              />
              <button onClick={sendMessage} style={{
                background: "#2c1a0e", color: "#f5e6d0", border: "none",
                borderRadius: "50%", width: "36px", height: "36px",
                cursor: "pointer", fontSize: "16px", flexShrink: 0
              }}>→</button>
            </div>
          </div>
        )}

        <button onClick={() => setIsOpen(!isOpen)} style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#2c1a0e", border: "none", cursor: "pointer",
          fontSize: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {isOpen ? "×" : "🍽️"}
        </button>

      </div>
    </>
  );
}
