import { useState, useEffect, useCallback } from "react";

export function useResendTimer() {
  const getRemaining = () => {
    const stored = sessionStorage.getItem("resendAvailableAt");
    if (!stored) return 0;
    const target = new Date(stored).getTime();
    return Math.max(0, Math.ceil((target - Date.now()) / 1000));
  };

  const [remainingSeconds, setRemainingSeconds] = useState(getRemaining);

  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      const remaining = getRemaining();
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  const startTimer = useCallback((serverTimestamp) => {
    sessionStorage.setItem("resendAvailableAt", serverTimestamp);
    const remaining = Math.max(
      0,
      Math.ceil((new Date(serverTimestamp).getTime() - Date.now()) / 1000),
    );
    setRemainingSeconds(remaining);
  }, []);

  const isTimerActive = remainingSeconds > 0;

  return { remainingSeconds, isTimerActive, startTimer };
}
