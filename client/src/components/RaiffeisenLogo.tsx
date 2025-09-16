import styled from "styled-components";
import { CloseCancelXIcon } from "vienna.icons";

interface RaiffeisenLogoProps {
  className?: string;
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div`
  background: hsl(45, 100%, 50%);
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: hsl(0 0% 9%);
`;

const LogoSubtitle = styled.span`
  font-size: 12px;
  color: hsl(0 0% 64%);
`;

export default function RaiffeisenLogo({ className = "" }: RaiffeisenLogoProps) {
  return (
    <LogoContainer className={className}>
      <LogoIcon>
        <CloseCancelXIcon />
      </LogoIcon>
      <LogoText>
        <LogoTitle>Райффайзен</LogoTitle>
        <LogoSubtitle>Банк</LogoSubtitle>
      </LogoText>
    </LogoContainer>
  );
}