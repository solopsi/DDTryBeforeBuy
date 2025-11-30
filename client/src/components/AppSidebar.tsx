import { useState } from "react";
import styled from "styled-components";
import RaiffeisenLogo from "./RaiffeisenLogo";
import { DocumentIcon, HomeIcon, ArrowsLeftRightIcon } from "vienna.icons";
import { Button } from "vienna-ui";
import EarlyPaymentRequestDrawer from "./EarlyPaymentRequestDrawer";

const buyerMenuItems = [
  { title: "Поставки", icon: HomeIcon, url: "/supplies" },
  { title: "Соглашения", icon: DocumentIcon, url: "/agreements" },
  { title: "Аукционы", icon: DocumentIcon, url: "/auctions" },
  { title: "Поставщики", icon: HomeIcon, url: "/suppliers" },
  { title: "Пользователи", icon: HomeIcon, url: "/users" },
];

const supplierMenuItems = [
  { title: "Поставки", icon: HomeIcon, url: "/supplies" },
  { title: "Соглашения", icon: DocumentIcon, url: "/agreements" },
  { title: "Аукционы", icon: DocumentIcon, url: "/auctions" },
  { title: "Пользователи", icon: HomeIcon, url: "/users" },
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
  
  svg {
    width: 16px;
    height: 16px;
  }
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

const PromoBanner = styled.div`
  background: linear-gradient(135deg, hsl(180 60% 85%) 0%, hsl(160 50% 80%) 100%);
  border-radius: 12px;
  padding: 20px 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PromoIcon = styled.div`
  font-size: 48px;
  line-height: 1;
`;

const PromoTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 20%);
  line-height: 1.4;
`;

const PromoDescription = styled.div`
  font-size: 12px;
  color: hsl(0 0% 45%);
  line-height: 1.4;
`;

const ArchiveLink = styled.div`
  font-size: 12px;
  color: hsl(0 0% 64%);
  cursor: pointer;
  margin: 0 16px 16px 16px;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface AppSidebarProps {
  activeItem?: string;
  onItemClick?: (url: string) => void;
  onLogout?: () => void;
  userRole?: 'buyer' | 'supplier';
}

export default function AppSidebar({ activeItem = "/supplies", onItemClick, onLogout, userRole = 'buyer' }: AppSidebarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuItems = userRole === 'supplier' ? supplierMenuItems : buyerMenuItems;
  
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
                <IconPlaceholder><item.icon /></IconPlaceholder>
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {userRole === 'supplier' && (
          <>
            <PromoBanner>
              <PromoIcon>%</PromoIcon>
              <PromoTitle>Отправьте покупателю запрос на раннюю оплату</PromoTitle>
              <PromoDescription>
                Если ему будут интересны ваши условия, он отправит вам поставки на согласование
              </PromoDescription>
              <Button 
                design="accent" 
                style={{ width: '100%' }}
                onClick={() => setIsDrawerOpen(true)}
                data-testid="button-create-request"
              >
                Создать запрос
              </Button>
            </PromoBanner>
            
            <EarlyPaymentRequestDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            />
            <ArchiveLink data-testid="link-download-archive">
              Скачать архив заявления
            </ArchiveLink>
          </>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <FooterInfo>
          <div className="support-email">dd.support@raiffeisen.ru</div>
          <div className="instruction-link">Открыть инструкцию</div>
        </FooterInfo>
        
        <UserInfo>
          <div>{userRole === 'supplier' ? 'Поставщик' : 'Покупатель'}</div>
          <div>ИП Тестов Тест Тестович</div>
          <div>Тест Моков</div>
        </UserInfo>
        
        <LogoutButton
          onClick={onLogout}
          data-testid="button-logout"
        >
          <IconPlaceholder><ArrowsLeftRightIcon style={{ transform: 'rotate(180deg)' }} /></IconPlaceholder>
          Выйти
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
}