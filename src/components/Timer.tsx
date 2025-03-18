import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { useSettings } from "@/store/useSettings";
import ConfettiExplosion from "react-confetti-explosion";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
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
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);

  const [pomodoros, setPomodoros] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);

  async function notify(title: string, body: string) {
    let permissionGranted = await isPermissionGranted();

    // If not we need to request it
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }

    // Once permission has been granted we can send the notification
    if (permissionGranted) {
      sendNotification({ title, body });
    }
  }

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
    setRestMinutes(0);
    setRestSeconds(0);
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
      if (startRest) {
        if (pomodoros % 4 === 0) {
          if (restMinutes >= longRestTime && restSeconds >= 0) {
            //! The end of long rest time.
            notify(
              `Your ${longRestTime} minutes rest has been ended 🥲`,
              "Time to work Hard. 🔥"
            );
            audioSuccess.play();
            startPomodoroTimer();
            setStart(false);
          } else if (restSeconds >= 59) {
            setRestSeconds(0);
            setRestMinutes((prev) => prev + 1);
          } else {
            setRestSeconds((prev) => prev + 1);
          }
        } else if (restMinutes >= restTime && restSeconds >= 0) {
          //! The end of rest time.
          notify(
            `Your ${restTime} rest has been ended 🥲`,
            "Time to work Hard. 🔥"
          );
          audioSuccess.play();
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
          //! The end of work time.
          notify(
            "Horaay! Time for rest.",
            "Keep working you have completed your work time."
          );
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
  }, [start, startRest, minutes, seconds, restMinutes, restSeconds]);

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
              <span
                className="absolute -top-7 -left-7 p-2 px-4 rounded-full roboto-mono border flex items-center justify-center"
                onClick={resetPomodoroTimer}
                title="Pomodoros"
              >
                {pomodoros < 10 && pomodoros > 0 ? "0" + pomodoros : pomodoros}
              </span>
            </TooltipTrigger>
            <TooltipContent>Pomodoros</TooltipContent>
          </Tooltip>
        </TooltipProvider>

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

        {minutes === 0 && seconds === 0 && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={300}
            width={1600}
          />
        )}

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

          {/* {!startRest && (
            <Button className="px-6" onClick={startRestTimer} variant="outline">
              Take Rest
            </Button>
          )} */}

          {startRest && (
            <Button
              className="px-6"
              onClick={() => {
                setStartRest(false);
                startPomodoroTimer();
                setStart(false);
              }}
              variant="secondary"
            >
              End Rest
            </Button>
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
              You have completed your {pomodoroTime} session, you can take{" "}
              {pomodoros % 4 === 0 ? longRestTime : restTime} minutes rest and
              start over again with new work session.
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
