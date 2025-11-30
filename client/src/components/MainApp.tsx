import { useState } from "react";
import { Button } from "vienna-ui";
import styled from "styled-components";
import { ListIcon } from "vienna.icons";
import AppSidebar from "./AppSidebar";
import SuppliesPage from "./pages/SuppliesPage";
import AgreementsPage from "./pages/AgreementsPage";
import AuctionsPage from "./pages/AuctionsPage";
import SuppliersPage from "./pages/SuppliersPage";
import UsersPage from "./pages/UsersPage";

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

interface MainAppProps {
  onLogout?: () => void;
  userRole?: 'buyer' | 'supplier';
}

export default function MainApp({ onLogout, userRole = 'buyer' }: MainAppProps) {
  const [activeSection, setActiveSection] = useState("/supplies");

  const renderContent = () => {
    switch (activeSection) {
      case "/supplies":
        return <SuppliesPage userRole={userRole} />;
      case "/agreements":
        return <AgreementsPage />;
      case "/auctions":
        return <AuctionsPage />;
      case "/suppliers":
        return <SuppliersPage />;
      case "/users":
        return <UsersPage />;
      default:
        return <SuppliesPage userRole={userRole} />;
    }
  };

  return (
    <AppContainer>
      <AppSidebar 
        activeItem={activeSection}
        onItemClick={setActiveSection}
        onLogout={onLogout}
        userRole={userRole}
      />
      <MainContent>
        <MainSection>
          {renderContent()}
        </MainSection>
      </MainContent>
    </AppContainer>
  );
}