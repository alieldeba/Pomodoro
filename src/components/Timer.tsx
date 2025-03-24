import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { useSettings } from "@/store/useSettings";
import ConfettiExplosion from "react-confetti-explosion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useSessionStorage from "@/hooks/useSessionStorage";
import { formatNumber, getRandomMessage, notify } from "@/lib/utils";
import { pomodoroMessages, restMessages } from "@/data/messages";

function Timer() {
  const audioRing = document.getElementById("audio-ring") as HTMLAudioElement;
  const audioSuccess = document.getElementById(
    "audio-success"
  ) as HTMLAudioElement;

  const { pomodoroTime, restTime, longRestTime } = useSettings();

  const [start, setStart] = useState(false);
  const [minutes, setMinutes] = useState(pomodoroTime);
  const [seconds, setSeconds] = useState(0);

  const [startRest, setStartRest] = useState(false);
  const [restMinutes, setRestMinutes] = useState(restTime);
  const [restSeconds, setRestSeconds] = useState(0);
  const [stopRest, setStopRest] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const [pomodoros, setPomodoros] = useSessionStorage<number>("pomodoros", 0);

  function startPomodoroTimer() {
    setStartRest(false);
    setStart(true);
    setMinutes(pomodoroTime);
    setSeconds(0);
  }

  function startRestTimer() {
    audioRing.pause();
    setStart(false);
    setStartRest(true);
    setRestSeconds(0);
    if (pomodoros % 4 === 0 && pomodoros !== 0) {
      setRestMinutes(longRestTime);
    } else {
      setRestMinutes(restTime);
    }
  }

  function resetPomodoroTimer() {
    audioRing.pause();
    setStart(false);
    setMinutes(pomodoroTime);
    setSeconds(0);
  }

  useEffect(() => {
    if (!start && !startRest) return;

    const timer = setTimeout(() => {
      // Rest Logic
      if (startRest && !stopRest) {
        if (pomodoros % 4 === 0) {
          if (restMinutes <= 0 && restSeconds <= 0) {
            //! The end of long rest time.
            notify(getRandomMessage(pomodoroMessages));
            audioSuccess.play();
            startPomodoroTimer();
            setStart(false);
          } else if (restSeconds <= 0) {
            setRestSeconds(59);
            setRestMinutes((prev) => prev - 1);
          } else {
            setRestSeconds((prev) => prev - 1);
          }
        } else if (restMinutes <= 0 && restSeconds <= 0) {
          //! The end of rest time.
          notify(getRandomMessage(pomodoroMessages));
          audioSuccess.play();
          startPomodoroTimer();
          setStart(false);
        } else if (restSeconds <= 0) {
          setRestSeconds(59);
          setRestMinutes((prev) => prev - 1);
        } else {
          setRestSeconds((prev) => prev - 1);
        }
      } else if (start) {
        // Pomodoro Logic
        if (minutes <= 0 && seconds <= 0) {
          //! The end of work time.
          notify(getRandomMessage(restMessages));
          // play sound
          audioRing.play();

          setPomodoros(pomodoros + 1);
          // Show dialog says that rest will be played
          setOpenAlert(true);
        } else if (seconds <= 0) {
          setSeconds(59);
          setMinutes((prev) => prev - 1);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [start, startRest, minutes, seconds, restMinutes, restSeconds, stopRest]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 items-center justify-center relative">
        {!startRest && (
          <TooltipProvider>
            <Tooltip>
              <Button
                variant="ghost"
                className="absolute -top-7 -right-7 pl-12 rounded-full"
                onClick={resetPomodoroTimer}
                asChild
              >
                <TooltipTrigger>
                  <RefreshCcw />
                </TooltipTrigger>
              </Button>
              <TooltipContent>Reset Timer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="absolute -top-7 -left-7 p-2 px-4 rounded-full roboto-mono border flex items-center justify-center">
                {formatNumber(pomodoros, false)}
              </span>
            </TooltipTrigger>
            <TooltipContent>Pomodoros</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {startRest ? (
          <h1 className="text-9xl roboto-mono animate-pulse">
            {formatNumber(restMinutes)}:{formatNumber(restSeconds)}
          </h1>
        ) : (
          <h1 className="text-9xl roboto-mono">
            {formatNumber(minutes)}:{formatNumber(seconds)}
          </h1>
        )}

        {minutes === 0 && seconds === 0 && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={300}
            width={1600}
            className="absolute"
          />
        )}

        {startRest ? (
          <span className="roboto-mono">
            Next: {formatNumber(pomodoroTime)} Minutes Work
          </span>
        ) : (
          <span className="roboto-mono">
            Next:{" "}
            {(pomodoros + 1) % 4 === 0 && pomodoros !== 0
              ? formatNumber(longRestTime)
              : formatNumber(restTime)}{" "}
            Minutes Rest
          </span>
        )}

        <div className="flex gap-6">
          {start && (
            <Button
              className="px-6"
              onClick={() => setStart(false)}
              variant="outline"
            >
              Pause Session
            </Button>
          )}

          {!start && !startRest && (
            <Button className="px-6" onClick={() => setStart(true)}>
              {minutes < pomodoroTime ? "Continue" : "Start Session"}
            </Button>
          )}

          {startRest && (
            <>
              {stopRest ? (
                <Button
                  className="px-6"
                  onClick={() => {
                    setStopRest(false);
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="px-6"
                  onClick={() => {
                    setStopRest(true);
                  }}
                  variant="outline"
                >
                  Pause Rest
                </Button>
              )}

              <Button
                className="px-6"
                onClick={() => {
                  setStartRest(false);
                  startPomodoroTimer();
                  setStart(false);
                }}
                variant="outline"
              >
                End Rest
              </Button>
            </>
          )}
        </div>
      </div>
      <AlertDialog
        open={openAlert}
        onOpenChange={() => setOpenAlert(!openAlert)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Good Job!</AlertDialogTitle>
            <AlertDialogDescription>
              You have completed your {pomodoroTime} minutes session, you can
              take{" "}
              {pomodoros % 4 === 0 && pomodoros !== 0 ? longRestTime : restTime}{" "}
              minutes rest and start over again with new work session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={startRestTimer}>
              Start Rest
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default Timer;
