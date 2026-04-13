"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
      const s = Math.min(1, (window.innerHeight - 64) / 844);
      setScale(s);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Admin — no frame
  if (pathname.startsWith("/admin")) return <>{children}</>;

  // Mobile — full screen, normal scroll
  if (!isDesktop) {
    return (
      <div
        id="scroll-root"
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehavior: "none",
          WebkitOverflowScrolling: "touch" as never,
        }}
      >
        {children}
      </div>
    );
  }

  // Desktop — phone frame with iframe
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#05111f" }}
    >
      <div className="min-h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="fixed w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#A0C8DE", top: "20%", left: "40%" }}
      />

      {/* Phone shell */}
      <div
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "50px",
          background: "#1a1a1a",
          boxShadow: "0 0 0 1.5px #3a3a3a, 0 40px 100px rgba(0,0,0,0.7), inset 0 0 0 1px #2a2a2a",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Side buttons */}
        <div style={{ position: "absolute", left: "-3px", top: "120px", width: "3px", height: "32px", background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "165px", width: "3px", height: "60px", background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "238px", width: "3px", height: "60px", background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "-3px", top: "180px", width: "3px", height: "80px", background: "#3a3a3a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50px",
            overflow: "hidden",
            background: "#092750",
          }}
        >
          {/* Dynamic Island */}
          <div style={{
            position: "absolute", top: "12px", left: "50%",
            transform: "translateX(-50%)",
            width: "120px", height: "34px",
            background: "#000", borderRadius: "20px",
            zIndex: 50,
          }} />

          {/* iframe with true 390px viewport */}
          <iframe
            src="/embed"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="preview"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
