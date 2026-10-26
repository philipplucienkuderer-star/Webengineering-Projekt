"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return (
    <footer>
      <p>
        Web-Engineering 1 · DHBW Karlsruhe · <span ref={yearRef} />
      </p>
    </footer>
  );
}
