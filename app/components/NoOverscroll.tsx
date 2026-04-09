"use client";

import { useEffect } from "react";

export default function NoOverscroll() {
  useEffect(() => {
    const root = document.getElementById("scroll-root");
    if (!root) return;

    const prevent = (e: TouchEvent) => {
      const el = root;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
      const touchY = e.touches[0].clientY;
      const prevY = (el as HTMLElement & { _prevTouchY?: number })._prevTouchY ?? touchY;
      (el as HTMLElement & { _prevTouchY?: number })._prevTouchY = touchY;

      const goingUp = touchY > prevY;   // finger moves down = scroll up
      const goingDown = touchY < prevY; // finger moves up = scroll down

      if ((atTop && goingUp) || (atBottom && goingDown)) {
        e.preventDefault();
      }
    };

    root.addEventListener("touchmove", prevent, { passive: false });
    return () => root.removeEventListener("touchmove", prevent);
  }, []);

  return null;
}
