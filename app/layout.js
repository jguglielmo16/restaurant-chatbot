export const metadata = {
  title: "Restaurant Chatbot",
  description: "AI-powered restaurant assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#f0ebe3" }}>
        {children}
      </body>
    </html>
  );
}
