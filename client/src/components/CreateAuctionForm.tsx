import { useState } from "react";
import { Button, Input, Datepicker } from "vienna-ui";
import { DocIcon } from "vienna.icons";
import styled from "styled-components";

// Utility function to format Date objects to Russian DD.MM.YYYY format
const formatDate = (date: Date | string): string => {
  if (!date) return "";
  
  // If already a string in the right format, return as is
  if (typeof date === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    return date;
  }
  
  // Convert to Date object if needed
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Check if valid date
  if (isNaN(dateObj.getTime())) return "";
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}.${month}.${year}`;
};

// Utility function to format currency with thousand separators
const formatCurrency = (value: string): string => {
  if (!value) return "0,00";
  
  // Remove any non-digit characters except comma and period
  let cleanValue = value.replace(/[^\d,.]/g, '');
  
  // Replace period with comma for Russian format
  cleanValue = cleanValue.replace('.', ',');
  
  // Split by comma to handle decimal part
  const parts = cleanValue.split(',');
  let integerPart = parts[0] || '0';
  const decimalPart = parts[1] || '00';
  
  // Add thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  return `${integerPart},${decimalPart.substring(0, 2).padEnd(2, '0')}`;
};

interface CreateAuctionFormProps {
  onCreateAuction?: (auctionData: any) => void;
  onBack?: () => void;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  width: 100%;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
`;

const FieldLabel = styled.label`
  font-size: 14px;
  color: hsl(0 0% 64%);
  margin: 0;
`;

const DateTimeGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TimeInput = styled(Input)`
  width: 80px;
`;

const DateInput = styled(Datepicker)`
  width: 140px;
`;

const CurrencyInput = styled(Input)`
  width: 200px;
`;

const PercentInput = styled(Input)`
  width: 120px;
`;

// Custom Switch Component
const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

const SwitchToggle = styled.div<{ $checked: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${props => props.$checked ? 'hsl(45 100% 50%)' : 'hsl(0 0% 88%)'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$checked ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const SwitchLabel = styled.span`
  font-size: 14px;
  color: hsl(0 0% 8%);
`;

const Switch = ({ checked, onChange, children, ...props }: { 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
  children?: React.ReactNode;
  [key: string]: any;
}) => (
  <CustomSwitchContainer>
    <SwitchToggle 
      $checked={checked} 
      onClick={() => onChange(!checked)}
      {...props}
    />
    {children && <SwitchLabel>{children}</SwitchLabel>}
  </CustomSwitchContainer>
);

const WarningNote = styled.div`
  background-color: hsl(45 100% 96%);
  border: 1px solid hsl(45 100% 85%);
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: hsl(45 100% 25%);
  margin: 16px 0;
`;

const YellowSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: hsl(45 100% 50%);
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
`;

const YellowSwitchLabel = styled.span`
  font-size: 14px;
  color: hsl(0 0% 8%);
  font-weight: 500;
`;

const ParticipantsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid hsl(0 0% 88%);
  border-radius: 8px;
  background-color: hsl(0 0% 98%);
`;

const ParticipantsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ParticipantsText = styled.span`
  font-size: 14px;
  color: hsl(0 0% 8%);
`;

const SuppliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SuppliesDescription = styled.p`
  font-size: 14px;
  color: hsl(0 0% 64%);
  margin: 0;
  line-height: 1.5;
`;

const SuppliesInfoContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
`;

const SupplyInfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid hsl(0 0% 88%);
  border-radius: 8px;
  background-color: hsl(0 0% 98%);
  flex: 1;
`;

const SupplyInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SupplyAmount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: hsl(0 0% 8%);
`;

const SupplyLabel = styled.span`
  font-size: 12px;
  color: hsl(0 0% 64%);
`;

const CreateButton = styled(Button)`
  background-color: hsl(45 100% 50%) !important;
  color: hsl(0 0% 8%) !important;
  border: none !important;
  font-weight: 500;
  padding: 12px 24px;
  align-self: flex-start;
  margin-top: 24px;
`;

export default function CreateAuctionForm({ onCreateAuction, onBack }: CreateAuctionFormProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "11:00",
    startImmediately: false,
    minYieldRate: "",
    auctionAmount: "0,00",
    earlyPaymentDate: "",
    rejectLowOffers: true
  });

  const handleSubmit = () => {
    onCreateAuction?.(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    // Handle date fields with special formatting
    if (field === 'startDate' || field === 'endDate' || field === 'earlyPaymentDate') {
      const formattedDate = formatDate(value);
      setFormData(prev => ({
        ...prev,
        [field]: formattedDate
      }));
      return;
    }
    
    // Handle currency field with special formatting
    if (field === 'auctionAmount') {
      const formattedAmount = formatCurrency(value);
      setFormData(prev => ({
        ...prev,
        [field]: formattedAmount
      }));
      return;
    }
    
    // Handle other fields normally
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <FormContainer>
      {/* Условия Section */}
      <SectionContainer>
        <SectionTitle>Условия</SectionTitle>
        
        <FieldsContainer>
          {/* Auction Period */}
          <FieldGroup>
            <FieldLabel>Период проведения аукциона, по Москве</FieldLabel>
            <FieldRow>
              <DateTimeGroup>
                <DateInput
                  placeholder="ДД.ММ.ГГГГ"
                  value={formData.startDate}
                  onChange={(value) => handleInputChange('startDate', value)}
                  data-testid="input-start-date"
                />
                <TimeInput
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  data-testid="input-start-time"
                />
              </DateTimeGroup>
              <span style={{ margin: '0 8px', color: 'hsl(0 0% 64%)' }}>—</span>
              <DateTimeGroup>
                <DateInput
                  placeholder="ДД.ММ.ГГГГ"
                  value={formData.endDate}
                  onChange={(value) => handleInputChange('endDate', value)}
                  data-testid="input-end-date"
                />
                <TimeInput
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  data-testid="input-end-time"
                />
              </DateTimeGroup>
            </FieldRow>
          </FieldGroup>

          {/* Start Immediately Switch */}
          <Switch
            checked={formData.startImmediately}
            onChange={(checked) => handleInputChange('startImmediately', checked)}
            data-testid="switch-start-immediately"
          >
            Начать сразу после создания аукциона
          </Switch>

          {/* Additional Fields Row */}
          <FieldRow>
            <FieldGroup>
              <FieldLabel>Минимальная ставка доходности</FieldLabel>
              <PercentInput
                value={formData.minYieldRate}
                onChange={(e) => handleInputChange('minYieldRate', e.target.value)}
                placeholder="% годовых"
                data-testid="input-min-yield-rate"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Сумма аукциона</FieldLabel>
              <CurrencyInput
                value={formData.auctionAmount}
                onChange={(e) => handleInputChange('auctionAmount', e.target.value)}
                placeholder="0,00"
                data-testid="input-auction-amount"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Дата ранней оплаты</FieldLabel>
              <DateInput
                placeholder="ДД.ММ.ГГГГ"
                value={formData.earlyPaymentDate}
                onChange={(value) => handleInputChange('earlyPaymentDate', value)}
                data-testid="input-early-payment-date"
              />
            </FieldGroup>
          </FieldRow>

          {/* Warning Note */}
          <WarningNote>
            Поставщик не увидит ставку
          </WarningNote>

          {/* Yellow Switch */}
          <YellowSwitchContainer>
            <SwitchToggle 
              $checked={formData.rejectLowOffers} 
              onClick={() => handleInputChange('rejectLowOffers', !formData.rejectLowOffers)}
              data-testid="switch-reject-low-offers"
            />
            <YellowSwitchLabel>
              Не принимать предложения ниже указанной ставки доходности
            </YellowSwitchLabel>
          </YellowSwitchContainer>
        </FieldsContainer>
      </SectionContainer>

      {/* Участники Section */}
      <SectionContainer>
        <SectionTitle>Участники</SectionTitle>
        <ParticipantsContainer>
          <ParticipantsInfo>
            <DocIcon style={{ width: '20px', height: '20px', color: 'hsl(0 0% 64%)' }} />
            <ParticipantsText>Выбрано 22 из 22 Поставщики</ParticipantsText>
          </ParticipantsInfo>
          <Button
            design="outline"
            data-testid="button-view-participants"
          >
            Посмотреть и изменить
          </Button>
        </ParticipantsContainer>
      </SectionContainer>

      {/* Поставки Section */}
      <SectionContainer>
        <SectionTitle>Поставки</SectionTitle>
        <SuppliesContainer>
          <SuppliesDescription>
            В аукционе участвуют все поставки в статусе «Ждет отправки». Можете загрузить сейчас 
            или позже до завершения аукциона
          </SuppliesDescription>

          <SuppliesInfoContainer>
            <SupplyInfoBlock>
              <DocIcon style={{ width: '24px', height: '24px', color: 'hsl(0 0% 64%)' }} />
              <SupplyInfoContent>
                <SupplyAmount>1 432 668,00 ₽</SupplyAmount>
                <SupplyLabel>На оплату</SupplyLabel>
              </SupplyInfoContent>
            </SupplyInfoBlock>

            <SupplyInfoBlock>
              <DocIcon style={{ width: '24px', height: '24px', color: 'hsl(0 0% 64%)' }} />
              <SupplyInfoContent>
                <SupplyAmount>3 шт</SupplyAmount>
                <SupplyLabel>Поставки</SupplyLabel>
              </SupplyInfoContent>
            </SupplyInfoBlock>
          </SuppliesInfoContainer>

          <Button
            design="outline"
            data-testid="button-add-supplies"
            style={{ alignSelf: 'flex-start' }}
          >
            Добавить поставки
          </Button>
        </SuppliesContainer>
      </SectionContainer>

      {/* Create Button */}
      <CreateButton
        onClick={handleSubmit}
        data-testid="button-create-auction"
      >
        Создать аукцион
      </CreateButton>
    </FormContainer>
  );
}