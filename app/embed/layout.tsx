import "../globals.css";

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body style={{ margin: 0, padding: 0, background: "#092750", overscrollBehavior: "none" }}>
        <div
          id="scroll-root"
          style={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "none",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
