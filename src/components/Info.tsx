import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function Info() {
  return (
    <div className="absolute bottom-5 right-5">
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <HelpCircle />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pomodoro Technique</DialogTitle>
            <DialogDescription>
              The Pomodoro Technique is a time management method that involves
              breaking work into focused intervals (usually 25 minutes) called
              "Pomodoros," followed by short breaks (typically 5 minutes). After
              completing four Pomodoros, you take a longer break (15–30
              minutes). This technique helps improve focus, prevent burnout, and
              boost productivity.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Info;
