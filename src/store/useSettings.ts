import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  pomodoroTime: number;
  restTime: number;
  longRestTime: number;
  updateSettings: (
    pomodoroTime: number,
    restTime: number,
    longRestTime: number
  ) => void;
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      pomodoroTime: 25,
      restTime: 5,
      longRestTime: 30,
      updateSettings: (pomodoroTime, restTime, longRestTime) =>
        set(() => ({
          pomodoroTime,
          restTime,
          longRestTime,
        })),
    }),
    { name: "settings" }
  )
);
