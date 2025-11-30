import styled from "styled-components";
import { Button, Select, Input, Datepicker } from "vienna-ui";
import { Close16Icon } from "vienna.icons";

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(0 0% 45%);
  
  &:hover {
    color: hsl(0 0% 20%);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
`;

const DrawerTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0 0 16px 0;
  line-height: 1.3;
`;

const DrawerDescription = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 20%);
  margin-bottom: 8px;
`;

const AmountInputWrapper = styled.div`
  position: relative;
  
  input {
    padding-right: 32px;
  }
`;

const CurrencySymbol = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(0 0% 45%);
  font-size: 14px;
  pointer-events: none;
`;

const DrawerFooter = styled.div`
  padding: 24px 32px;
  border-top: 1px solid hsl(0 0% 90%);
`;

interface EarlyPaymentRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyPaymentRequestDrawer({ isOpen, onClose }: EarlyPaymentRequestDrawerProps) {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <DrawerOverlay onClick={handleOverlayClick} data-testid="drawer-overlay" />
      <DrawerContainer data-testid="drawer-early-payment-request">
        <DrawerHeader>
          <CloseButton onClick={onClose} data-testid="button-close-drawer">
            <Close16Icon />
          </CloseButton>
        </DrawerHeader>
        
        <DrawerContent>
          <DrawerTitle>Запрос покупателю на раннюю оплату</DrawerTitle>
          <DrawerDescription>
            Напишите, когда и сколько денег вы хотите получить. Если покупателя устроят ваши условия, то он отправит вам список поставок, которые он предложит оплатить на эту сумму
          </DrawerDescription>
          
          <FormGroup>
            <FormLabel>Покупатель</FormLabel>
            <Select
              placeholder="От кого вы хотите получить оплату?"
              data-testid="select-buyer"
            >
              <Select.Option value="testov">ИП Тестов Тест Тестович</Select.Option>
              <Select.Option value="test-data">ООО Тестовые данные</Select.Option>
              <Select.Option value="test-company">АО Тестовая компания</Select.Option>
              <Select.Option value="moskovoe">ПАО Московое общество</Select.Option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Дата ранней оплаты</FormLabel>
            <Datepicker
              placeholder="ДД.ММ.ГГГГ"
              data-testid="input-early-payment-date"
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Сумма</FormLabel>
            <AmountInputWrapper>
              <Input
                placeholder="1 — 1 млрд"
                data-testid="input-amount"
              />
              <CurrencySymbol>₽</CurrencySymbol>
            </AmountInputWrapper>
          </FormGroup>
        </DrawerContent>
        
        <DrawerFooter>
          <Button 
            design="accent" 
            style={{ width: '100%' }}
            onClick={handleSubmit}
            data-testid="button-submit-request"
          >
            Отправить запрос
          </Button>
        </DrawerFooter>
      </DrawerContainer>
    </>
  );
}
