import { useEffect, useState } from "react";
import { TYPE_REST } from "../lib/constants";

export function useTypingAnimation(isLoading: boolean) {
  const [typedText, setTypedText] = useState("J");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Wait for the J entrance animation to finish before typing starts
    let charIndex = 0;
    const typingDelay = setTimeout(() => {
      const interval = setInterval(() => {
        charIndex++;
        setTypedText("J" + TYPE_REST.slice(0, charIndex));
        if (charIndex === TYPE_REST.length) {
          clearInterval(interval);
          // Remove cursor after a short pause
          setTimeout(() => setIsTypingDone(true), 600);
        }
      }, 80); // ~80ms per character
      return () => clearInterval(interval);
    }, 900); // let the J entrance animation finish first (~0.8s)

    return () => clearTimeout(typingDelay);
  }, [isLoading]);

  return { typedText, isTypingDone };
}