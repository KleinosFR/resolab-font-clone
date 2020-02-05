import { useState, useEffect } from "react";

export default function useTimer() {
  const [startTime, setStartTime] = useState(
    sessionStorage.getItem("start") || Date.parse(new Date())
  );
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const getTime = () => {
      setDuration(Date.parse(new Date()) - startTime);

      setTimeout(() => {
        getTime();
      }, 1000);
    };
    if (!sessionStorage.getItem("start")) {
      const date = Date.parse(new Date());
      sessionStorage.setItem("start", date);
    }
    getTime();
  }, []);

  const convertMsToRealTime = msTime => {
    let seconds = Math.floor((msTime / 1000) % 60);
    let minutes = Math.floor((msTime / (1000 * 60)) % 60);
    let hours = Math.floor((msTime / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  return {
    duration: Math.floor(duration),
    humanDuration: convertMsToRealTime(duration)
  };
}
