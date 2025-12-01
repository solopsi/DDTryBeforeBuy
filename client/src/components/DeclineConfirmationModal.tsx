import styled from "styled-components";
import { DocErrorIcon } from "vienna.icons";

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
  background: hsl(45 100% 95%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  
  svg {
    width: 32px;
    height: 32px;
    color: hsl(45 100% 40%);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px;
`;

const Description = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0 0 32px;
  line-height: 1.5;
`;

const HighlightedText = styled.span`
  color: hsl(45 100% 40%);
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const CancelButton = styled.button`
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

const DeclineButton = styled.button`
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

interface DeclineConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  suppliesCount: number;
  totalAmount: number;
}

export default function DeclineConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  suppliesCount,
  totalAmount
}: DeclineConfirmationModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount) + ' ₽';
  };

  const getSuppliesWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'поставок';
    }
    if (lastDigit === 1) {
      return 'поставка';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'поставки';
    }
    return 'поставок';
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} data-testid="button-close-decline-modal">
          ×
        </CloseButton>
        
        <IconWrapper>
          <DocErrorIcon />
        </IconWrapper>
        
        <Title>Отклонить поставки?</Title>
        <Description>
          <HighlightedText>
            {suppliesCount} {getSuppliesWord(suppliesCount)} на сумму {formatCurrency(totalAmount)}
          </HighlightedText>
          {' '}будут отклонены и недоступны к дисконтированию
        </Description>
        
        <ButtonGroup>
          <CancelButton onClick={onClose} data-testid="button-cancel-decline">
            Отмена
          </CancelButton>
          <DeclineButton onClick={onConfirm} data-testid="button-confirm-decline">
            Отклонить
          </DeclineButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}
