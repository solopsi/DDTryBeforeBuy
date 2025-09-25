import styled from "styled-components";
import { Button } from "vienna-ui/dist/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: hsl(0 0% 64%);
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: hsl(0 0% 20%);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const DeleteIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FEE2E2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #DC2626;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 16px 0;
  color: hsl(0 0% 20%);
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  color: hsl(0 0% 50%);
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} data-testid="button-close-modal">
          ×
        </CloseButton>
        
        <IconContainer>
          <DeleteIconContainer>
            🗑
          </DeleteIconContainer>
        </IconContainer>
        
        <Title>Удалить все поставки на отправку?</Title>
        
        <Description>
          Выполнение удаления может потребовать времени, в зависимости от количества загруженных ранее поставок.
        </Description>
        
        <ButtonGroup>
          <Button 
            design="outline"
            onClick={onClose}
            data-testid="button-cancel-delete"
          >
            Отмена
          </Button>
          <Button 
            design="primary"
            onClick={onConfirm}
            data-testid="button-confirm-delete"
          >
            Удалить
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}