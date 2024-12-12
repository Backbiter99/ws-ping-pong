import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage() {
    if (!socket) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-full grid grid-rows-4">
        <div className="fixed top-0 left-0 w-full z-10 flex justify-end p-5">
          <ModeToggle></ModeToggle>
        </div>

        <div className="w-full row-span-3 flex justify-center items-center">
          <div className="flex justify-evenly p-5">
            <Input ref={inputRef} type="text" placeholder="Message..." />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
