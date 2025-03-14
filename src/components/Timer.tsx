import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";

function Timer() {
  const [start, setStart] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [startRest, setStartRest] = useState(true);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);

  function startPomodoroTimer() {
    setStartRest(false);
    setStart(true);
    setMinutes(25);
    setSeconds(0);
  }

  function startRestTimer() {
    setStart(false);
    setStartRest(true);
    setRestMinutes(0);
    setRestSeconds(0);
  }

  function resetPomodoroTimer() {
    setStart(false);
    setMinutes(25);
    setSeconds(0);
  }

  useEffect(() => {
    if (!start && !startRest) return;

    const timer = setTimeout(() => {
      // Rest Logic
      if (startRest) {
        if (restMinutes >= 5 && restSeconds >= 0) {
          startPomodoroTimer();
        } else if (restSeconds >= 59) {
          setRestSeconds(0);
          setRestMinutes((prev) => prev + 1);
        } else {
          setRestSeconds((prev) => prev + 1);
        }
      } else if (start) {
        // Pomodoro Logic
        if (minutes <= 0 && seconds <= 0) {
          startRestTimer();
        } else if (seconds <= 0) {
          setSeconds(59);
          setMinutes((prev) => prev - 1);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [start, startRest, minutes, seconds, restMinutes, restSeconds]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 items-center justify-center relative">
        {!startRest && (
          <Button
            variant="ghost"
            className="absolute -top-7 -right-7 pl-12 rounded-full"
            onClick={resetPomodoroTimer}
          >
            <RefreshCcw />
          </Button>
        )}

        {startRest ? (
          <h1 className="text-9xl roboto-mono">
            {restMinutes < 10 ? "0" + restMinutes : restMinutes}:
            {restSeconds < 10 ? "0" + restSeconds : restSeconds}
          </h1>
        ) : (
          <h1 className="text-9xl roboto-mono">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h1>
        )}

        {/* {(minutes === 0 && seconds === 0) ||
          (restMinutes === 5 && restSeconds === 0 && (
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={300}
              width={1600}
            />
          ))} */}

        <span className="roboto-mono">+05 minutes rest</span>
        <div className="flex gap-6">
          {start ? (
            <Button
              className="px-6"
              onClick={() => setStart(false)}
              variant="secondary"
            >
              Stop
            </Button>
          ) : (
            <Button className="px-6" onClick={() => setStart(true)}>
              Start Session
            </Button>
          )}
          {startRest && (
            <Button
              className="px-6"
              onClick={() => setStartRest(false)}
              variant="secondary"
            >
              End Rest
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Timer;
