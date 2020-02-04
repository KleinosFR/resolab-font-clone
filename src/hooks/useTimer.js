import { useState, useEffect } from "react";
import moment from "moment";

export function useTimer() {
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const getTime = () => {
    setDuration((new Date() - startTime) / 1000);

    setTimeout(() => {
      getTime();
    }, 1000);
  };

  useEffect(() => {
    sessionStorage.getItem("start")
      ? setStartTime(new Date(sessionStorage.getItem("start")))
      : sessionStorage.setItem("start", new Date());
    getTime();
  }, []);

  return {
    duration: Math.floor(duration)
  };
}
