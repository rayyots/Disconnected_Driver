
import { useCallback } from "react";

export function useAudio() {
  /** Play audio by URL, optionally set volume */
  const playSound = useCallback((url: string, volume: number = 1) => {
    try {
      const sound = new Audio(url);
      sound.volume = volume;
      sound.play().catch((e) => {
        // Logging is helpful for debugging
        if (typeof console !== "undefined") {
          console.log("Audio play failed:", e);
        }
      });
    } catch (e) {
      if (typeof console !== "undefined") {
        console.log("Audio error:", e);
      }
    }
  }, []);
  return { playSound };
}
