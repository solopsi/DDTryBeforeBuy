import styled from "styled-components";

interface RaiffeisenLogoProps {
  className?: string;
}


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  background: hsl(45, 100%, 50%);
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 16px;
`;

const LogoText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  font-family: 'Segoe UI', sans-serif;
`;

export default function RaiffeisenLogo({ className = "" }: RaiffeisenLogoProps) {
  return (
    <LogoContainer className={className}>
      <LogoIcon>R</LogoIcon>
      <LogoText>
        Райффайзен Банк
      </LogoText>
    </LogoContainer>
  );
}