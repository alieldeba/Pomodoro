import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
// import useLocalStorage from "@/hooks/useLocalStorage";
import { useSettings } from "@/store/useSettings";
// import ConfettiExplosion from "react-confetti-explosion";

function Timer() {
  // const [restTime, setRestTime] = useLocalStorage<number>("rest", 5);
  // const [longRest, setLongTime] = useLocalStorage<number>("long_rest", 30);
  // const [pomodoroTime, setPomodoroTime] = useLocalStorage<number>(
  //   "pomodoro",
  //   25
  // );

  const { pomodoroTime, restTime } = useSettings();

  const [start, setStart] = useState(false);
  const [minutes, setMinutes] = useState(pomodoroTime);
  const [seconds, setSeconds] = useState(0);

  const [startRest, setStartRest] = useState(false);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);

  function startPomodoroTimer() {
    setStartRest(false);
    setStart(true);
    setMinutes(pomodoroTime);
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
    setMinutes(pomodoroTime);
    setSeconds(0);
  }

  useEffect(() => {
    if (!start && !startRest) return;

    const timer = setTimeout(() => {
      // Rest Logic
      if (startRest) {
        if (restMinutes >= restTime && restSeconds >= 0) {
          startPomodoroTimer();
          setStart(false);
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

        <span className="roboto-mono">
          +{restTime >= 10 ? restTime : "0" + restTime} Minutes Rest
        </span>
        <div className="flex gap-6">
          {start && (
            <Button
              className="px-6"
              onClick={() => setStart(false)}
              variant="secondary"
            >
              Stop
            </Button>
          )}

          {!start && !startRest && (
            <Button className="px-6" onClick={() => setStart(true)}>
              Start Session
            </Button>
          )}

          {!startRest && (
            <Button className="px-6" onClick={startRestTimer} variant="outline">
              Take Rest
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
