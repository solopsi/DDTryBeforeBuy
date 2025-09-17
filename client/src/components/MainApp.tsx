import { useState } from "react";
import { Button } from "vienna-ui";
import styled from "styled-components";
import { ListIcon } from "vienna.icons";
import AppSidebar from "./AppSidebar";
import SuppliesPage from "./SuppliesPage";
import AgreementsPage from "./AgreementsPage";
import AuctionsPage from "./AuctionsPage";
import SuppliersPage from "./SuppliersPage";
import UsersPage from "./UsersPage";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid hsl(0 0% 88%);
  background: hsl(0 0% 100%);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const SidebarToggle = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: hsl(0 0% 64%);
  
  &:hover {
    color: hsl(0 0% 8%);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const TopNavigation = styled.nav`
  display: flex;
  gap: 24px;
  font-size: 14px;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$active ? 'hsl(0 0% 8%)' : 'hsl(0 0% 64%)'};
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: ${props => props.$active ? '2px solid hsl(45 100% 50%)' : '2px solid transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: hsl(0 0% 8%);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SupportEmail = styled.span`
  font-size: 14px;
  color: hsl(0 0% 64%);
`;


const LoginButton = styled.button`
  background: none;
  border: 1px solid hsl(0 0% 88%);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  color: hsl(0 0% 64%);
  
  &:hover {
    background: hsl(0 0% 96%);
    color: hsl(0 0% 8%);
  }
`;

const MainSection = styled.main`
  flex: 1;
  overflow: auto;
  padding: 24px;
`;

export default function MainApp() {
  const [activeSection, setActiveSection] = useState("/supplies");

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

  return (
    <AppContainer>
      <AppSidebar 
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      <MainContent>
        <Header>
          <HeaderLeft>
            <SidebarToggle data-testid="button-sidebar-toggle">
              <ListIcon style={{ width: '20px', height: '20px' }} />
            </SidebarToggle>
          </HeaderLeft>
          
          <HeaderRight>
            <SupportEmail>dd.support@raiffeisen.ru</SupportEmail>
            <LoginButton data-testid="button-login-nav">
              Войти
            </LoginButton>
          </HeaderRight>
        </Header>
        
        <MainSection>
          {renderContent()}
        </MainSection>
      </MainContent>
    </AppContainer>
  );
}