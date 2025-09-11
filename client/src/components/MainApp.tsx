import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import AppSidebar from "./AppSidebar";
import SuppliesPage from "./SuppliesPage";
import AgreementsPage from "./AgreementsPage";
import AuctionsPage from "./AuctionsPage";
import SuppliersPage from "./SuppliersPage";
import UsersPage from "./UsersPage";

export default function MainApp() {
  const [activeSection, setActiveSection] = useState("/supplies");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    console.log('Theme toggled:', isDarkMode ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (activeSection) {
      case "/supplies":
        return <SuppliesPage />;
      case "/agreements":
        return <AgreementsPage />;
      case "/auctions":
        return <AuctionsPage />;
      case "/suppliers":
        return <SuppliersPage />;
      case "/users":
        return <UsersPage />;
      default:
        return <SuppliesPage />;
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      "/supplies": "Поставки",
      "/agreements": "Соглашения", 
      "/auctions": "Аукционы",
      "/suppliers": "Поставщики",
      "/users": "Пользователи"
    };
    return titles[activeSection] || "Поставки";
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          activeItem={activeSection}
          onItemClick={setActiveSection}
        />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <nav className="flex gap-6 text-sm">
                <button 
                  className={`hover:text-foreground transition-colors ${
                    activeSection === "/supplies" ? "text-foreground border-b-2 border-primary pb-1" : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveSection("/supplies")}
                  data-testid="nav-not-shipped"
                >
                  На отправку
                </button>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => console.log('Awaiting response clicked')}
                  data-testid="nav-awaiting-response"
                >
                  Ждет вашего ответа
                </button>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => console.log('With error clicked')}
                  data-testid="nav-with-error"
                >
                  С ошибкой
                </button>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => console.log('All supplies clicked')}
                  data-testid="nav-all-supplies"
                >
                  Все поставки
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">dd.support@raiffeisen.ru</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" data-testid="button-login-nav">
                Войти
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}