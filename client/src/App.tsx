import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Body } from "vienna-ui";
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
      <Body>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <MainApp />
        )}
      </Body>
    </QueryClientProvider>
  );
}

export default App;
