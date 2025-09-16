import styled from "styled-components";
import RaiffeisenLogo from "./RaiffeisenLogo";

const menuItems = [
  { title: "Поставки", iconText: "▶", url: "/supplies" },
  { title: "Соглашения", iconText: "◎", url: "/agreements" },
  { title: "Аукционы", iconText: "♦", url: "/auctions" },
  { title: "Поставщики", iconText: "●", url: "/suppliers" },
  { title: "Пользователи", iconText: "◆", url: "/users" },
];

const SidebarContainer = styled.nav`
  width: 20rem;
  height: 100vh;
  background: hsl(0 0% 100%);
  border-right: 1px solid hsl(0 0% 88%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid hsl(0 0% 88%);
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SidebarMenuItem = styled.li`
  margin: 0;
`;

const SidebarMenuButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => props.$active ? 'hsl(45 100% 95%)' : 'transparent'};
  border: none;
  border-left: ${props => props.$active ? '3px solid hsl(45 100% 50%)' : '3px solid transparent'};
  color: ${props => props.$active ? 'hsl(45 100% 30%)' : 'hsl(0 0% 45%)'};
  font-size: 14px;
  font-weight: ${props => props.$active ? '500' : '400'};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: hsl(45 100% 98%);
    color: hsl(0 0% 8%);
  }
`;

const IconPlaceholder = styled.span`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: currentColor;
`;

const SidebarFooter = styled.div`
  padding: 24px 16px;
  border-top: 1px solid hsl(0 0% 88%);
  background: hsl(0 0% 98%);
`;

const FooterInfo = styled.div`
  margin-bottom: 16px;
  font-size: 12px;
  color: hsl(0 0% 64%);
  
  .support-email {
    margin-bottom: 4px;
  }
  
  .instruction-link {
    color: hsl(45 100% 50%);
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserInfo = styled.div`
  margin-bottom: 16px;
  font-size: 12px;
  color: hsl(0 0% 64%);
  line-height: 1.4;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: hsl(0 0% 64%);
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  width: 100%;
  
  &:hover {
    color: hsl(0 0% 8%);
  }
`;

interface AppSidebarProps {
  activeItem?: string;
  onItemClick?: (url: string) => void;
}

export default function AppSidebar({ activeItem = "/supplies", onItemClick }: AppSidebarProps) {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <RaiffeisenLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                $active={activeItem === item.url}
                onClick={() => {
                  onItemClick?.(item.url);
                }}
                data-testid={`link-${item.title.toLowerCase()}`}
              >
                <IconPlaceholder>{item.iconText}</IconPlaceholder>
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <FooterInfo>
          <div className="support-email">dd.support@raiffeisen.ru</div>
          <div className="instruction-link">Открыть инструкцию</div>
        </FooterInfo>
        
        <UserInfo>
          <div>Покупатель</div>
          <div>ИП Тестов Тест Тестович</div>
          <div>Тест Москв</div>
        </UserInfo>
        
        <LogoutButton
          onClick={() => console.log('Logout clicked')}
          data-testid="button-logout"
        >
          <IconPlaceholder>◀</IconPlaceholder>
          Выйти
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
}