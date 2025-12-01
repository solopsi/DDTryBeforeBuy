import styled from "styled-components";
import { Button } from "vienna-ui";
import { CheckmarkIconRingIcon } from "vienna.icons";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  min-width: 400px;
  max-width: 500px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: hsl(0 0% 64%);
  
  &:hover {
    color: hsl(0 0% 20%);
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #E8F5E9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  
  svg {
    width: 32px;
    height: 32px;
    color: #4CAF50;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0 0 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const SecondaryButton = styled.button`
  padding: 10px 24px;
  border: 1px solid hsl(0 0% 80%);
  border-radius: 4px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: hsl(0 0% 96%);
  }
`;

const PrimaryButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background: hsl(0 0% 20%);
  color: white;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: hsl(0 0% 30%);
  }
`;

interface AgreementsSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAgreements?: () => void;
}

export default function AgreementsSuccessModal({ isOpen, onClose, onGoToAgreements }: AgreementsSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} data-testid="button-close-modal">
          ×
        </CloseButton>
        
        <IconWrapper>
          <CheckmarkIconRingIcon />
        </IconWrapper>
        
        <Title>Соглашения созданы</Title>
        <Subtitle>Подпишите сейчас или позже в соглашениях</Subtitle>
        
        <ButtonGroup>
          <SecondaryButton onClick={onClose} data-testid="button-close">
            Закрыть
          </SecondaryButton>
          <PrimaryButton onClick={onGoToAgreements} data-testid="button-go-to-agreements">
            Перейти в соглашения
          </PrimaryButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}
