import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import RaiffeisenLogo from "./RaiffeisenLogo";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', email);
    onLogin?.(email, password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <RaiffeisenLogo className="justify-center mb-4" />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Для покупателей</span>
            <span>Для поставщиков</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-normal">Вход</CardTitle>
            <p className="text-sm text-muted-foreground">
              На платформу динамического дисконтирования
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="123@gmail.com"
                  data-testid="input-email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••"
                    data-testid="input-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <a href="#" className="text-sm text-primary hover:underline">
                  Не помню пароль
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                data-testid="button-login"
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}