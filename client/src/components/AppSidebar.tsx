import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Truck, 
  FileText, 
  Gavel, 
  Users, 
  UserCheck, 
  LogOut,
  HelpCircle 
} from "lucide-react";
import RaiffeisenLogo from "./RaiffeisenLogo";

const menuItems = [
  { title: "Поставки", icon: Truck, url: "/supplies" },
  { title: "Соглашения", icon: FileText, url: "/agreements" },
  { title: "Аукционы", icon: Gavel, url: "/auctions" },
  { title: "Поставщики", icon: Users, url: "/suppliers" },
  { title: "Пользователи", icon: UserCheck, url: "/users" },
];

interface AppSidebarProps {
  activeItem?: string;
  onItemClick?: (url: string) => void;
}

export default function AppSidebar({ activeItem = "/supplies", onItemClick }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <RaiffeisenLogo className="p-4" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeItem === item.url}
                    onClick={() => {
                      console.log(`Navigating to: ${item.title}`);
                      onItemClick?.(item.url);
                    }}
                    data-testid={`link-${item.title.toLowerCase()}`}
                  >
                    <a href="#" className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <div>dd.support@raiffeisen.ru</div>
            <div className="mt-1 text-primary cursor-pointer">Открыть инструкцию</div>
          </div>
          
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Покупатель</div>
            <div>ИП Тестов Тест Тестович</div>
            <div>Тест Москв</div>
          </div>
          
          <button 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full"
            onClick={() => console.log('Logout clicked')}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}