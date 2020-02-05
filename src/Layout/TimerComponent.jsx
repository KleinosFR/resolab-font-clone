import React from "react";
import useTimer from "../hooks/useTimer";

export default function TimerComponent() {
  const { humanDuration } = useTimer();

  return (
    <h1
      style={{
        fontSize: "12px",
        fontFamily: "Roboto",
        diplay: "flex",
        flexDirection: "row",
        padding: "5px"
      }}
    >
      Ton temps de connexion: {humanDuration}
    </h1>
  );
}
