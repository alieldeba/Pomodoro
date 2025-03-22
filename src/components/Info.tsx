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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function Info() {
  return (
    <div className="absolute bottom-5 right-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
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
                    The Pomodoro Technique is a time management method designed
                    to enhance focus and productivity by breaking work into
                    intervals. A typical Pomodoro lasts between 25 to 50
                    minutes, during which you work on a single task without
                    distractions. Once the timer goes off, you take a short
                    break of 5 to 10 minutes to recharge. After completing four
                    Pomodoros, you take a longer break of 15 to 30 minutes
                    before starting the cycle again. This approach helps
                    maintain concentration, prevents burnout, and improves
                    efficiency by balancing intense work periods with regular
                    rest.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>More Information</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Info;
