import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "vienna-ui/dist/Button";
import { Input } from "vienna-ui/dist/Input";
import { Datepicker } from "vienna-ui";
import { Drawer } from "vienna-ui/dist/Drawer";
import { CalendarIcon, GoLeftIcon } from "vienna.icons";

// Styled components
const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 630px;
`;

const DrawerHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: #666;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #2b2d33;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const SupplierSection = styled.div`
  margin-bottom: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const SupplierHeader = styled.div`
  background: #f8f9fa;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SupplierName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #2b2d33;
`;

const SupplierInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const SupplierContent = styled.div`
  padding: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
  flex-shrink: 0;
`;

const SummaryLabel = styled.span`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #2b2d33;
  white-space: nowrap;
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #2b2d33;
  margin-bottom: 8px;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const ApplyToAllLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 16px;
  
  &:hover {
    text-decoration: none;
  }
`;

const ConfigTable = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ConfigTableHeader = styled.div`
  background: #f8f9fa;
  display: grid;
  grid-template-columns: 120px 100px 1fr 120px 120px 120px 120px;
  gap: 16px;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #666;
`;

const ConfigTableRow = styled.div`
  display: grid;
  grid-template-columns: 120px 100px 1fr 120px 120px 120px 120px;
  gap: 16px;
  padding: 16px;
  align-items: center;
  border-top: 1px solid #e0e0e0;
`;

const RateCell = styled.div<{ $isModified?: boolean; $direction?: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${props => props.$isModified && props.$direction === 'up' && `
    color: #28a745;
  `}
  
  ${props => props.$isModified && props.$direction === 'down' && `
    color: #dc3545;
  `}
`;

const RateIndicator = styled.span`
  font-size: 12px;
`;

const DrawerFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterInfo = styled.div`
  display: flex;
  gap: 24px;
`;

const FooterInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FooterLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const FooterValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2b2d33;
`;

interface SupplyConfig {
  id: string;
  supplier: string;
  originalRate: number;
  discount: number;
  paymentAmount: string;
  originalPaymentAmount: string;
  paymentDate: string;
  invoiceNumber: string;
  invoiceDate: string;
  contractNumber: string;
  earlyPaymentDate: string;
  isModified: boolean;
  rateDirection?: 'up' | 'down';
}

interface ConfigureBeforeSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSupplies: any[];
  onSubmit: (configs: SupplyConfig[]) => void;
}

export default function ConfigureBeforeSendModal({ 
  isOpen, 
  onClose, 
  selectedSupplies,
  onSubmit 
}: ConfigureBeforeSendModalProps) {
  const [configs, setConfigs] = useState<SupplyConfig[]>([]);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  // Generate contract number in format ДГ-XXX/YYYY
  const generateContractNumber = (index: number) => {
    const year = new Date().getFullYear();
    const baseNumber = 100 + index * 17 + Math.floor(Math.random() * 50);
    return `ДГ-${baseNumber}/${year}`;
  };

  // Initialize configs when modal opens or selectedSupplies changes
  useEffect(() => {
    if (isOpen && selectedSupplies.length > 0) {
      const initialConfigs = selectedSupplies.map((supply, index) => ({
        id: `${supply.supplier}-${index}`,
        supplier: supply.supplier,
        originalRate: parseFloat(supply.discount.replace('%', '').replace(',', '.')),
        discount: 0,
        paymentAmount: supply.amount,
        originalPaymentAmount: supply.amount,
        paymentDate: supply.paymentDate,
        invoiceNumber: supply.invoiceNumber,
        invoiceDate: supply.invoiceDate,
        contractNumber: generateContractNumber(index),
        earlyPaymentDate: '',
        isModified: false
      }));
      setConfigs(initialConfigs);
    }
    
    // Reset configs when modal closes
    if (!isOpen) {
      setConfigs([]);
      setAllFieldsValid(false);
    }
  }, [isOpen, selectedSupplies]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount).replace('₽', '₽');
  };

  const parseAmount = (amountStr: string) => {
    return parseFloat(amountStr.replace(/[^0-9,]/g, '').replace(',', '.'));
  };

  const isValidDate = (dateString: string) => {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(dateString)) return false;
    
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  };

  const calculateDaysDifference = (earlyDate: string, originalDate: string) => {
    if (!isValidDate(earlyDate) || !isValidDate(originalDate)) return 0;
    
    const early = new Date(earlyDate.split('.').reverse().join('-'));
    const original = new Date(originalDate.split('.').reverse().join('-'));
    
    if (early >= original) return 0; // Early date must be before original
    
    const diffTime = original.getTime() - early.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const recalculateConfig = (config: SupplyConfig, updates: Partial<SupplyConfig>) => {
    const updatedConfig = { ...config, ...updates };
    
    // Auto-calculate from early payment date
    if ('earlyPaymentDate' in updates && isValidDate(updatedConfig.earlyPaymentDate)) {
      const daysDiff = calculateDaysDifference(updatedConfig.earlyPaymentDate, config.paymentDate);
      const calculatedDiscount = daysDiff > 0 ? Math.min(100, (daysDiff / 365) * config.originalRate * 2) : 0;
      
      const originalAmount = parseAmount(config.originalPaymentAmount);
      const discountAmount = originalAmount * (calculatedDiscount / 100);
      const earlyPaymentAmount = originalAmount - discountAmount;
      
      updatedConfig.discount = calculatedDiscount;
      updatedConfig.paymentAmount = formatCurrency(earlyPaymentAmount);
      // Compare the calculated discount against the baseline (no early payment = 0% discount)
      updatedConfig.isModified = Math.abs(calculatedDiscount) > 0.01;
      updatedConfig.rateDirection = calculatedDiscount > 0 ? 'up' : 'down';
    }
    
    // Manual discount adjustment
    if ('discount' in updates) {
      const normalizedValue = Math.max(0, Math.min(100, updates.discount || 0));
      const originalAmount = parseAmount(config.originalPaymentAmount);
      const discountAmount = originalAmount * (normalizedValue / 100);
      const earlyPaymentAmount = originalAmount - discountAmount;
      
      updatedConfig.discount = normalizedValue;
      updatedConfig.paymentAmount = formatCurrency(earlyPaymentAmount);
      // For manual discount, check if it differs from auto-calculated amount
      const daysDiff = calculateDaysDifference(config.earlyPaymentDate, config.paymentDate);
      const autoCalculatedDiscount = daysDiff > 0 ? Math.min(100, (daysDiff / 365) * config.originalRate * 2) : 0;
      
      updatedConfig.isModified = Math.abs(normalizedValue - autoCalculatedDiscount) > 0.01;
      updatedConfig.rateDirection = normalizedValue > autoCalculatedDiscount ? 'up' : 'down';
    }
    
    return updatedConfig;
  };

  const updateConfig = (id: string, field: string, value: any) => {
    setConfigs(prev => prev.map(config => {
      if (config.id === id) {
        const processedValue = field === 'discount' ? 
          parseFloat(String(value).replace(',', '.')) || 0 : value;
        return recalculateConfig(config, { [field]: processedValue });
      }
      return config;
    }));
  };

  const applyToAll = (sourceId: string, field: string) => {
    const sourceConfig = configs.find(c => c.id === sourceId);
    if (!sourceConfig) return;
    
    const sourceValue = sourceConfig[field as keyof SupplyConfig];
    
    setConfigs(prev => prev.map(config => 
      config.id !== sourceId 
        ? recalculateConfig(config, { [field]: sourceValue })
        : config
    ));
  };

  const calculateTotals = () => {
    const totalEarlyPayment = configs.reduce((sum, config) => {
      if (!config.earlyPaymentDate || !isValidDate(config.earlyPaymentDate)) {
        return sum;
      }
      return sum + (config.paymentAmount ? parseAmount(config.paymentAmount) : 0);
    }, 0);
    const totalDiscount = configs.reduce((sum, config) => {
      if (!config.earlyPaymentDate || !isValidDate(config.earlyPaymentDate)) {
        return sum;
      }
      const originalAmount = parseAmount(config.originalPaymentAmount);
      const earlyAmount = config.paymentAmount ? parseAmount(config.paymentAmount) : originalAmount;
      return sum + (originalAmount - earlyAmount);
    }, 0);
    
    return { totalEarlyPayment, totalDiscount };
  };

  // Validate all fields and update state
  useEffect(() => {
    const isValid = configs.length > 0 && configs.every(config => {
      const hasValidDate = isValidDate(config.earlyPaymentDate);
      const hasValidDiscount = Number.isFinite(config.discount) && config.discount >= 0;
      const hasValidPayment = config.paymentAmount && Number.isFinite(parseAmount(config.paymentAmount));
      return hasValidDate && hasValidDiscount && hasValidPayment;
    });
    setAllFieldsValid(isValid);
  }, [configs]);

  const handleSubmit = () => {
    if (allFieldsValid) {
      onSubmit(configs);
    }
  };

  const { totalEarlyPayment, totalDiscount } = calculateTotals();

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose}
      data-testid="modal-configure-before-send"
    >
      <DrawerContent>
        <DrawerHeader>
          <BackButton onClick={onClose} data-testid="button-back">
            <GoLeftIcon />
          </BackButton>
          <Title>Настройка перед отправкой</Title>
        </DrawerHeader>

        <ScrollableContent>
          {configs.map((config) => (
            <SupplierSection key={config.id}>
              <SupplierHeader>
                <SupplierName>{config.supplier}</SupplierName>
                <SupplierInfo>
                  Ставка доходности {config.originalRate.toFixed(2)} % • Договор № {config.contractNumber} от {config.invoiceDate}
                </SupplierInfo>
              </SupplierHeader>
              
              <SupplierContent>
                <SummaryRow>
                  <SummaryItem>
                    <SummaryLabel>Ранняя оплата</SummaryLabel>
                    <SummaryValue>{config.earlyPaymentDate && isValidDate(config.earlyPaymentDate) ? (config.paymentAmount || '0,00 ₽') : '0,00 ₽'}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Скидка</SummaryLabel>
                    <SummaryValue>{config.discount.toFixed(2)} %</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Поставки</SummaryLabel>
                    <SummaryValue>1 шт</SummaryValue>
                  </SummaryItem>
                </SummaryRow>

                <FormRow>
                  <FormLabel>Дата ранней оплаты</FormLabel>
                  <DateInputWrapper>
                    <Datepicker
                      placeholder="ДД.ММ.ГГГГ"
                      value={config.earlyPaymentDate}
                      onChange={(event, data) => updateConfig(config.id, 'earlyPaymentDate', data?.value || '')}
                      data-testid={`input-early-payment-date-${config.id}`}
                      format="DD.MM.YYYY"
                    />
                  </DateInputWrapper>
                </FormRow>

                <ApplyToAllLink 
                  onClick={() => applyToAll(config.id, 'earlyPaymentDate')}
                  data-testid={`button-apply-to-all-${config.id}`}
                >
                  Применить к остальным
                </ApplyToAllLink>

                <ConfigTable>
                  <ConfigTableHeader>
                    <div>Ставка доходности</div>
                    <div>Скидка, %</div>
                    <div>Сумма ранней оплаты</div>
                    <div>Сумма оплаты</div>
                    <div>Дата оплаты</div>
                    <div>№ счета</div>
                    <div>Дата счета</div>
                  </ConfigTableHeader>
                  
                  <ConfigTableRow>
                    <RateCell 
                      $isModified={config.isModified}
                      $direction={config.rateDirection}
                    >
                      {config.originalRate.toFixed(2)} %
                      {config.isModified && (
                        <RateIndicator>
                          {config.rateDirection === 'up' ? '↑' : '↓'}
                        </RateIndicator>
                      )}
                    </RateCell>
                    
                    <div>
                      <Input
                        value={config.discount.toFixed(2)}
                        onChange={(e) => updateConfig(config.id, 'discount', e.target.value)}
                        data-testid={`input-discount-${config.id}`}
                      />
                    </div>
                    
                    <div>{config.earlyPaymentDate && isValidDate(config.earlyPaymentDate) ? config.paymentAmount : '—'}</div>
                    <div>{config.originalPaymentAmount}</div>
                    <div>{config.paymentDate}</div>
                    <div>{config.invoiceNumber}</div>
                    <div>{config.invoiceDate}</div>
                  </ConfigTableRow>
                </ConfigTable>
              </SupplierContent>
            </SupplierSection>
          ))}
        </ScrollableContent>

        <DrawerFooter>
          <Button
            style={{ 
              backgroundColor: allFieldsValid ? '#FEE600' : '#e0e0e0', 
              color: allFieldsValid ? '#2B2D33' : '#999' 
            }}
            onClick={handleSubmit}
            disabled={!allFieldsValid}
            data-testid="button-submit-for-review"
          >
            Отправить на рассмотрение
          </Button>
          
          <FooterInfo>
            <FooterInfoItem>
              <FooterLabel>Ранняя оплата</FooterLabel>
              <FooterValue data-testid="text-total-early-payment">
                {formatCurrency(totalEarlyPayment)}
              </FooterValue>
            </FooterInfoItem>
            <FooterInfoItem>
              <FooterLabel>Скидка</FooterLabel>
              <FooterValue data-testid="text-total-discount">
                {formatCurrency(totalDiscount)}
              </FooterValue>
            </FooterInfoItem>
          </FooterInfo>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}