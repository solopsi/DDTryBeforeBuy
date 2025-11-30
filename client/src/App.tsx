import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Body } from "vienna-ui";
import { queryClient } from "./lib/queryClient";
import LoginForm from "./components/LoginForm";
import MainApp from "./components/MainApp";

// Допустимые пользователи
const VALID_USERS = [
  { email: "123@mail.com", password: "123" },
  { email: "456@mail.com", password: "456" },
  { email: "ext123@mail.com", password: "ext123" }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'buyer' | 'supplier'>('buyer');

  const handleLogin = (email: string, password: string, role: 'buyer' | 'supplier') => {
    setLoginError(null);
    
    const user = VALID_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setLoginError("Неверный email или пароль");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginError(null);
    setUserRole('buyer');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Body>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} error={loginError} />
        ) : (
          <MainApp onLogout={handleLogout} userRole={userRole} />
        )}
      </Body>
    </QueryClientProvider>
  );
}

export default App;
