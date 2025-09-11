import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import LoginForm from "./components/LoginForm";
import MainApp from "./components/MainApp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication check for demo purposes
    //todo: remove mock functionality
    if (email && password) {
      setIsAuthenticated(true);
      console.log('User authenticated:', email);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <MainApp />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
