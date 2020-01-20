import { useState } from "react";

export function useTimer(start = new Date()) {
  const [startTime, setStartTime] = useState(start);

  return {
    startTime
  };
}
