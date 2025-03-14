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
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a kitchen timer to
              break work into intervals, typically 25 minutes in length,
              separated by short breaks. Each interval is known as a pomodoro,
              from the Italian word for tomato, after the tomato-shaped kitchen
              timer Cirillo used as a university student. Apps and websites
              providing timers and instructions have widely popularized the
              technique. Closely related to concepts such as timeboxing and
              iterative and incremental development used in software design, the
              method has been adopted in pair programming contexts.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Info;
