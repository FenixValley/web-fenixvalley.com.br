"use client";

import { useEffect, useState } from "react";

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

function calcTimeLeft(target: Date): CountdownResult {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00", isExpired: true };
  }
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isExpired: false,
  };
}

export function useCountdown(targetDate: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() =>
    calcTimeLeft(targetDate)
  );

  useEffect(() => {
    const tick = () => setTimeLeft(calcTimeLeft(targetDate));
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}
