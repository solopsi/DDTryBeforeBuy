import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid hsl(0 0% 90%);
  border-top: 4px solid hsl(45 100% 50%);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoaderText = styled.div`
  font-size: 16px;
  color: hsl(0 0% 50%);
  text-align: center;
`;

interface LoaderProps {
  isVisible: boolean;
  text?: string;
}

export default function Loader({ isVisible, text = "Загрузка..." }: LoaderProps) {
  if (!isVisible) return null;

  return (
    <LoaderOverlay data-testid="loader-overlay">
      <LoaderContainer>
        <Spinner data-testid="loader-spinner" />
        <LoaderText>{text}</LoaderText>
      </LoaderContainer>
    </LoaderOverlay>
  );
}