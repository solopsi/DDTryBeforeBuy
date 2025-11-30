import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: hsl(0 0% 20%);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SuccessContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: hsl(120 40% 95%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  
  svg {
    width: 40px;
    height: 40px;
    color: hsl(120 50% 45%);
  }
`;

const SuccessTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const SuccessDescription = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const CloseButtonOutlined = styled.button`
  padding: 12px 32px;
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 20%);
  background: white;
  border: 1px solid hsl(0 0% 80%);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: hsl(0 0% 98%);
    border-color: hsl(0 0% 60%);
  }
`;

const buyerOptions = [
  { value: "testov", label: "ИП Тестов Тест Тестович" },
  { value: "test-data", label: "ООО Тестовые данные" },
  { value: "test-company", label: "АО Тестовая компания" },
  { value: "moskovoe", label: "ПАО Московое общество" },
];

interface EarlyPaymentRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyPaymentRequestDrawer({ isOpen, onClose }: EarlyPaymentRequestDrawerProps) {
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);
  const [earlyPaymentDate, setEarlyPaymentDate] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedBuyer(null);
      setEarlyPaymentDate(undefined);
      setAmount("");
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFormValid = selectedBuyer && earlyPaymentDate && amount.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const selectedBuyerLabel = buyerOptions.find(opt => opt.value === selectedBuyer)?.label || "";

  if (isSuccess) {
    return (
      <>
        <DrawerOverlay onClick={handleOverlayClick} data-testid="drawer-overlay" />
        <DrawerContainer data-testid="drawer-early-payment-request-success">
          <DrawerHeader>
            <CloseButton onClick={handleClose} data-testid="button-close-drawer">
              <Close16Icon />
            </CloseButton>
          </DrawerHeader>
          
          <SuccessContent>
            <SuccessIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </SuccessIcon>
            <SuccessTitle>Запрос на раннюю оплату поставок отправлен</SuccessTitle>
            <SuccessDescription>
              Вы отправили запрос {selectedBuyerLabel}
            </SuccessDescription>
            <CloseButtonOutlined onClick={handleClose} data-testid="button-close-success">
              Закрыть
            </CloseButtonOutlined>
          </SuccessContent>
        </DrawerContainer>
      </>
    );
  }

  return (
    <>
      <DrawerOverlay onClick={handleOverlayClick} data-testid="drawer-overlay" />
      <DrawerContainer data-testid="drawer-early-payment-request">
        <DrawerHeader>
          <CloseButton onClick={handleClose} data-testid="button-close-drawer">
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
              value={selectedBuyer}
              valueToString={(val: string) => buyerOptions.find(opt => opt.value === val)?.label || val}
              onSelect={(e: any, data: any) => setSelectedBuyer(data?.value || e?.value)}
              data-testid="select-buyer"
            >
              {buyerOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Дата ранней оплаты</FormLabel>
            <Datepicker
              placeholder="ДД.ММ.ГГГГ"
              value={earlyPaymentDate}
              onChange={(e: any, data: any) => setEarlyPaymentDate(data?.value || e?.value)}
              data-testid="input-early-payment-date"
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Сумма</FormLabel>
            <AmountInputWrapper>
              <Input
                placeholder="1 — 1 млрд"
                value={amount}
                onChange={(e: any, data: any) => setAmount(data?.value ?? e?.target?.value ?? '')}
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
            disabled={!isFormValid || isLoading}
            data-testid="button-submit-request"
          >
            <ButtonContent>
              {isLoading && <Spinner />}
              {isLoading ? "Отправка..." : "Отправить запрос"}
            </ButtonContent>
          </Button>
        </DrawerFooter>
      </DrawerContainer>
    </>
  );
}
