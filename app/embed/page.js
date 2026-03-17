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
  parking: "At lunch Monday–Friday: discounted parking in our garage for $6 (3 hours). At dinner and on weekends: complimentary parking in the garage for up to 3 hours.",
  reservationLink: "https://www.opentable.com/booking/restref/availability?rid=2062&restref=2062&lang=en-US&color=1&r3uid=cfe&dark=false&partysize=2&datetime=2026-03-16T19%3A00",
  specialNotes: `
    ABOUT: Hemenway's has been Providence's premier seafood destination since 1985. Located on the Providence River with scenic skyline views. Wine Spectator Award of Excellence winner since 2012. Part of the Newport Restaurant Group, which is 100% employee-owned.

    MOST POPULAR DISH: Paella — a flavorful Spanish rice dish with swordfish, shrimp, scallops, mussels, clams and linguica.

    OTHER SIGNATURE DISHES: Rhode Island-style calamari, Shellfish Platter from the Raw Bar, Baked Stuffed Lobster, Lobster Mac & Cheese (whole lobster, cavatappi pasta, Vermont white cheddar), Pan Roasted Salmon, Whole Roasted Fish of the Day, Seafood Casserole, Yellowfin Tartare. Fish can be prepared baked, grilled, pan-seared, or pan-blackened. Oscar style available (lump crab, hollandaise, asparagus) for add $10.

    GLUTEN FREE: We don't have a separate gluten free menu because most items can be prepared gluten free. Please let your server know when you arrive so we can give personal attention to your dietary needs.

    DRESS CODE: Business casual. Collared shirts for men, jeans are fine. No workout clothes, sweatpants, or sleeveless shirts on men. Please remove hats.

    KIDS MENU: Yes! Kids menu includes pasta, burger, fish and chips, and chicken fingers. For well-behaved children.

    DOGS: Well-behaved, friendly dogs are permitted on the patio when on leash. Patio is open when staffed and weather permits.

    NOISE LEVEL: Hemenway's has 22-foot ceilings and fills the dining room nightly — it is a lively, bustling atmosphere. It's a bit quieter after 8pm and during the afternoon around 3pm.

    RESTAURANT NAME: Named after Charles Martin Hemenway, the late grandfather of founder Ned Grace.

    HAPPY HOUR: Handroll Happy Hour every Monday through Friday 3pm–5pm in the bar and raw bar area. In-house only, not available for takeout.

    POWER LUNCH: Available Monday through Friday 11:30am–3pm. Two-course lunch plus coffee and freshly-baked cookie for $32 per person (plus tax and gratuity).

    PRIVATE DINING & EVENTS: Private room available for special events. Contact the restaurant directly for private dining and catering inquiries.

    SPECIAL OCCASIONS: Staff regularly accommodates special occasion requests including anniversary rose petals and complimentary desserts. Call ahead to arrange.

    FARE REWARDS: Join the Newport Restaurant Group Fare Rewards program. Earn points with every visit — every 200 points earns a $15 reward credit. Download the Newport Restaurant Group Fare Rewards app. If you forgot to use your rewards during a visit, you can add your check retroactively via the app using the ADD CHECK feature in the sidebar.

    GIFT CARDS: Newport Restaurant Group gift cards available for purchase at the restaurant and online. Can be used at Hemenway's and other Newport Restaurant Group locations including Waterman Grille, Castle Hill Inn, 22 Bowen's, The Mooring, and more.

    ORDERING: Takeout, curbside, lunch delivery, and catering are all available online.

    LOCATION HIGHLIGHTS: Close to PPAC, RISD Museum, Waterfire, Brown University, Johnson & Wales, downtown hotels, and the RI Convention Center. Perfect for pre-show dinners and convention visitors.

    SEAFOOD SOURCING: Locally sourced from New Bedford, Boston, Gloucester, Point Judith, and Rockland Maine. Partners include Watch Hill Oysters, Foley Fish, Andrade's Catch, and more.

    GLUTEN FREE FAQ: No separate gluten free menu — most items can be prepared gluten free on request.
    DRESS CODE FAQ: Business casual. Collared shirts for men required. No workout clothes, sweatpants, or sleeveless shirts on men. Please remove hats.
    PARKING FAQ: Complimentary garage parking at dinner and weekends. Discounted $6 for 3 hours at lunch Monday-Friday.
    KIDS FAQ: Kids menu available with pasta, burger, fish and chips, chicken fingers.
    DOGS FAQ: Well-behaved leashed dogs welcome on the patio when open.
    NOISE FAQ: Lively atmosphere with 22-foot ceilings. Quieter after 8pm and around 3pm.
  `
};

export default function EmbedWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Welcome to Hemenway's Restaurant! 🦞 I'm here to help you with:

- 📅 Reservations & booking
- 🍽️ Menu & dish recommendations
- 🚗 Hours, location & parking
- 🎉 Private events & special occasions
- 🥡 Takeout, curbside & delivery

What can I help you with today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
    <div style={{
      width: "100%", height: "100vh", display: "flex",
      flexDirection: "column", background: "#fff",
      fontFamily: "Georgia, serif", overflow: "hidden"
    }}>
      <div style={{
        background: "#1a3a4a", padding: "14px 16px",
        display: "flex", alignItems: "center", gap: "10px",
        flexShrink: 0
      }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: "16px"
        }}>🦞</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#e8f4f8", fontSize: "13px", fontWeight: "bold" }}>
            {restaurantInfo.name}
          </div>
          <div style={{ color: "rgba(232,244,248,0.65)", fontSize: "10px" }}>
            Typically replies instantly
          </div>
        </div>
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "12px",
        background: "#f2f8fb", display: "flex",
        flexDirection: "column", gap: "10px"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", gap: "8px", alignItems: "flex-end",
            flexDirection: msg.role === "user" ? "row-reverse" : "row"
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%",
                background: "#1a3a4a", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "11px", flexShrink: 0
              }}>🦞</div>
            )}
            <div style={{
              background: msg.role === "user" ? "#1a3a4a" : "#fff",
              color: msg.role === "user" ? "#e8f4f8" : "#1a3a4a",
              padding: "8px 12px",
              borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
              maxWidth: "78%", fontSize: "13px", lineHeight: "1.5",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              whiteSpace: "pre-line"
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "#1a3a4a", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "11px"
            }}>🦞</div>
            <div style={{
              background: "#fff", padding: "8px 12px",
              borderRadius: "14px 14px 14px 2px",
              fontSize: "13px", color: "#7a9aaa"
            }}>Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        display: "flex", padding: "10px 12px", background: "#fff",
        borderTop: "1px solid #d0e8f0", gap: "8px", flexShrink: 0
      }}>
        <input
          ref={inputRef}
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
  );
}
