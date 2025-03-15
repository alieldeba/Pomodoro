import "@/index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeSwitch } from "./components/mode-toggle";
import Timer from "./components/Timer";
import Info from "./components/Info";
import Copywrite from "./components/Copywrite";
import Settings from "./components/Settings";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeSwitch />

      <Timer />

      <Settings />

      <Copywrite />

      <Info />
    </ThemeProvider>
  );
}

export default App;
