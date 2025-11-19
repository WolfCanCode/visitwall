"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < text.length) {
        // Use slice to ensure we always display the correct substring
        // based on the current index, avoiding state drift issues.
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">_</span>}
    </span>
  );
}
