import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSettings } from "@/store/useSettings";
import { Switch } from "./ui/switch";
// import useLocalStorage from "@/hooks/useLocalStorage";

function Settings() {
  //   const [restTime, setRestTime] = useLocalStorage<number>("rest", 5);
  //   const [longRest, setLongTime] = useLocalStorage<number>("long_rest", 30);
  //   const [pomodoroTime, setPomodoroTime] = useLocalStorage<number>(
  //     "pomodoro",
  //     25
  //   );

  const { pomodoroTime, restTime, longRestTime, updateSettings } =
    useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute top-5 left-5" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            The more customization the more productivity. 🔥
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label className="text-right">Pomodoro Timer</Label>
            <Select
              defaultValue={pomodoroTime.toString()}
              onValueChange={(value) =>
                updateSettings(+value, restTime, longRestTime)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="25">25 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="35">35 Minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-right">Rest Timer</Label>
            <Select
              defaultValue={restTime.toString()}
              onValueChange={(value) =>
                updateSettings(pomodoroTime, +value, longRestTime)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">3 Minutes</SelectItem>
                  <SelectItem value="5">5 Minutes</SelectItem>
                  <SelectItem value="7">7 Minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-right">Rest after 4 Pomodoros</Label>
            <Select
              defaultValue={longRestTime.toString()}
              onValueChange={(value) =>
                updateSettings(pomodoroTime, restTime, +value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="25">25 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="35">35 Minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <Label>Hide Remaining Time</Label>
            <Switch />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Settings;
