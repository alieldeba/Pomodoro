import "@/index.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Settings } from "lucide-react";
import Timer from "./components/Timer";
import Info from "./components/Info";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>

      <Timer />

      <Button variant="outline" className="absolute top-5 left-5" size="icon">
        <Settings />
      </Button>

      <span className="roboto-mono absolute bottom-5 left-1/2 -translate-x-1/2">
        By Ali Eldeba
      </span>

      <Info />
    </ThemeProvider>
  );
}

export default App;
