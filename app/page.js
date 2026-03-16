"use client";
import { useState, useEffect, useRef } from "react";

const restaurantInfo = {
  name: "Hemenway's Restaurant",
  location: "Providence, Rhode Island",
  hours: "Monday through Saturday 11:30am–10pm, Sunday 11:30am–9pm",
  address: "121 S Main St, Providence, RI 02903",
  phone: "(401) 351-8570",
  cuisine: "Fresh seafood, raw bar, and chop house",
  priceRange: "$$$",
  parking: "Hemenway's has complimentary parking at dinner in their parking garage. Street parking is also available on S Main St nearby.",
  reservationLink: "https://www.opentable.com/booking/restref/availability?rid=2062&restref=2062&lang=en-US&color=1&r3uid=cfe&dark=false&partysize=2&datetime=2026-03-16T19%3A00",
  specialNotes: `
    ABOUT: Hemenway's has been Providence's premier seafood destination since 1985. Located on the Providence River with scenic skyline views. Wine Spectator Award of Excellence winner since 2012. Part of the Newport Restaurant Group.

    SIGNATURE DISHES: Rhode Island-style calamari, Shellfish Platter from the Raw Bar, Baked Stuffed Lobster, Lobster Mac & Cheese (whole lobster, cavatappi pasta, Vermont white cheddar), Pan Roasted Salmon, Whole Roasted Fish of the Day, Seafood Paella, Yellowfin Tartare, Seafood Casserole. Fish can be prepared baked, grilled, pan-seared, or pan-blackened. Oscar style available (lump crab, hollandaise, asparagus) for add $10.

    HAPPY HOUR: Handroll Happy Hour every Monday through Friday 3pm–5pm in the bar and raw bar area. In-house only, not available for takeout.

    POWER LUNCH: Available Monday through Friday 11:30am–3pm. Two-course lunch plus coffee and freshly-baked cookie for $32 per person (plus tax and gratuity).

    KIDS MENU: Yes, Hemenway's has a dedicated kids menu with chicken tenders, pasta, grilled cheese, and baked cod.

    PRIVATE DINING & EVENTS: Private room available for special events. Contact the restaurant directly for private dining and catering inquiries. Their team of event professionals will help make your event memorable.

    SPECIAL OCCASIONS: Staff regularly accommodates special occasion requests including anniversary rose petals and complimentary desserts. Call ahead to arrange.

    DIETARY: Gluten-free options available. Please notify your server of any food allergies.

    REWARDS: Join the Newport Restaurant Group Fare Rewards program. Earn points with every visit — every 200 points earns a $15 reward credit. Download the Newport Restaurant Group Fare Rewards app.

    GIFT CARDS: Newport Restaurant Group gift cards accepted and can be used at Hemenway's and many other Newport Restaurant Group locations including Waterman Grille, Castle Hill Inn, 22 Bowen's, The Mooring, and more.

    LOCATION HIGHLIGHTS: Close to PPAC, RISD Museum, Waterfire, Brown University, Johnson & Wales, downtown hotels, and the RI Convention Center. Perfect for pre-show dinners and convention visitors.

    SEAFOOD SOURCING: Locally sourced from New Bedford, Boston, Gloucester, Point Judith, and Rockland Maine. Partners include Watch Hill Oysters, Foley Fish, Andrade's Catch, and more.
  `
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! Welcome to ${restaurantInfo.name} 👋 How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
              background: "#1a3a4a", padding: "14px 16px",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "18px"
              }}>🦞</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e8f4f8", fontSize: "14px", fontWeight: "bold" }}>
                  {restaurantInfo.name}
                </div>
                <div style={{ color: "rgba(232,244,248,0.7)", fontSize: "11px" }}>
                  Typically replies instantly
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                background: "none", border: "none", color: "#e8f4f8",
                fontSize: "20px", cursor: "pointer", padding: "0 4px", lineHeight: 1
              }}>×</button>
            </div>

            <div style={{
              height: "300px", overflowY: "auto", padding: "14px",
              background: "#f2f8fb", display: "flex", flexDirection: "column", gap: "10px"
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", gap: "8px", alignItems: "flex-end",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row"
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "#1a3a4a", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "12px", flexShrink: 0
                    }}>🦞</div>
                  )}
                  <div style={{
                    background: msg.role === "user" ? "#1a3a4a" : "#fff",
                    color: msg.role === "user" ? "#e8f4f8" : "#1a3a4a",
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
                    background: "#1a3a4a", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "12px"
                  }}>🦞</div>
                  <div style={{
                    background: "#fff", padding: "9px 13px", borderRadius: "16px 16px 16px 2px",
                    fontSize: "13px", color: "#7a9aaa"
                  }}>Typing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              display: "flex", padding: "12px", background: "#fff",
              borderTop: "1px solid #d0e8f0", gap: "8px"
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: "9px 14px", borderRadius: "20px",
                  border: "1px solid #d0e8f0", fontSize: "13px",
                  outline: "none", fontFamily: "Georgia, serif"
                }}
              />
              <button onClick={sendMessage} style={{
                background: "#1a3a4a", color: "#e8f4f8", border: "none",
                borderRadius: "50%", width: "36px", height: "36px",
                cursor: "pointer", fontSize: "16px", flexShrink: 0
              }}>→</button>
            </div>
          </div>
        )}

        <button onClick={() => setIsOpen(!isOpen)} style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#1a3a4a", border: "none", cursor: "pointer",
          fontSize: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {isOpen ? "×" : "🦞"}
        </button>

      </div>
    </>
  );
}
