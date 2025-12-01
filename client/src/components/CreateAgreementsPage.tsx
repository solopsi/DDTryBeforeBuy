import styled from "styled-components";
import { Button, CustomTable } from "vienna-ui";
import { GoLeftIcon, InfoIconRingIcon } from "vienna.icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 100px;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: hsl(0 0% 45%);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: hsl(0 0% 20%);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const SupplierCard = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const SupplierHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border-bottom: 1px solid hsl(0 0% 93%);
`;

const SupplierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SupplierName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const SupplierDetails = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: hsl(0 0% 45%);
`;

const DetailItem = styled.span`
  display: flex;
  gap: 4px;
  
  strong {
    color: hsl(0 0% 20%);
    font-weight: 500;
  }
`;

const ContractInfo = styled.div`
  font-size: 14px;
  color: hsl(0 0% 45%);
  text-align: right;
`;

const TableContainer = styled.div`
  & table {
    width: 100%;
    border-collapse: collapse;
  }
  
  & thead {
    background: hsl(0 0% 98%);
  }
  
  & tr {
    border-bottom: 1px solid hsl(0 0% 93%);
  }
  
  & tr:last-child {
    border-bottom: none;
  }
  
  & td, & th {
    padding: 12px 24px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
  }
  
  & th {
    font-weight: 500;
    color: hsl(0 0% 45%);
  }
`;

const HeaderWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  background: white;
  border-top: 1px solid hsl(0 0% 90%);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  z-index: 1000;
`;

const TotalInfo = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
`;

const TotalItem = styled.span`
  display: flex;
  gap: 4px;
  color: hsl(0 0% 45%);
  
  strong {
    color: hsl(0 0% 20%);
    font-weight: 500;
  }
`;

interface CreateAgreementsPageProps {
  supplies: any[];
  onBack: () => void;
  onSubmit: () => void;
  userRole?: 'buyer' | 'supplier';
}

export default function CreateAgreementsPage({ supplies, onBack, onSubmit, userRole = 'buyer' }: CreateAgreementsPageProps) {
  const groupKey = userRole === 'buyer' ? 'supplier' : 'buyer';
  
  const groupedByCounterparty = supplies.reduce((acc, supply) => {
    const counterparty = supply[groupKey];
    if (!acc[counterparty]) {
      acc[counterparty] = [];
    }
    acc[counterparty].push(supply);
    return acc;
  }, {} as Record<string, any[]>);

  const calculateTotalEarlyPayment = () => {
    return supplies.reduce((total, supply) => {
      const amount = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + amount;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return supplies.reduce((total, supply) => {
      const amount = parseFloat(supply.amount.replace(/[^\d,]/g, '').replace(',', '.'));
      const earlyPayment = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + (amount - earlyPayment);
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount) + ' ₽';
  };

  const getCounterpartyEarlyPayment = (counterpartySupplies: any[]) => {
    return counterpartySupplies.reduce((total, supply) => {
      const amount = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + amount;
    }, 0);
  };

  const getCounterpartyDiscount = (counterpartySupplies: any[]) => {
    return counterpartySupplies.reduce((total, supply) => {
      const amount = parseFloat(supply.amount.replace(/[^\d,]/g, '').replace(',', '.'));
      const earlyPayment = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + (amount - earlyPayment);
    }, 0);
  };

  const generateContractNumber = () => {
    return `contrac...  от ${new Date().toLocaleDateString('ru-RU')}`;
  };

  const getYieldRate = (supply: any) => {
    const discount = supply.discount?.replace(' %', '').replace('%', '').replace(',', '.') || '0';
    return parseFloat(discount) / 2;
  };

  const getNewDiscountPercent = (supply: any) => {
    const discount = supply.discount?.replace(' %', '').replace('%', '').replace(',', '.') || '0';
    return parseFloat(discount);
  };

  const getPreviousDiscountPercent = () => {
    return (Math.random() * 5 + 2).toFixed(2);
  };

  return (
    <PageContainer>
      <BackLink onClick={onBack} data-testid="button-back-to-supplies">
        <GoLeftIcon size="s" />
        Список поставок
      </BackLink>
      
      <Title>Формирование соглашений</Title>
      
      {Object.entries(groupedByCounterparty).map(([counterparty, counterpartySuppliesRaw]) => {
        const counterpartySupplies = counterpartySuppliesRaw as any[];
        const firstSupply = counterpartySupplies[0];
        const yieldRate = firstSupply?.discount?.replace(' %', '').replace('%', '') || '6,00';
        
        return (
          <SupplierCard key={counterparty}>
            <SupplierHeader>
              <SupplierInfo>
                <SupplierName>{counterparty}</SupplierName>
                <SupplierDetails>
                  <DetailItem>
                    Ранняя оплата <strong>{formatCurrency(getCounterpartyEarlyPayment(counterpartySupplies))}</strong>
                  </DetailItem>
                  <DetailItem>
                    Скидка <strong>{formatCurrency(getCounterpartyDiscount(counterpartySupplies))}</strong>
                  </DetailItem>
                  <DetailItem>
                    Поставки <strong>{counterpartySupplies.length} шт</strong>
                  </DetailItem>
                </SupplierDetails>
                <DetailItem style={{ color: 'hsl(0 0% 45%)' }}>
                  Дата ранней оплаты <strong>{counterpartySupplies[0]?.earlyPaymentDate}</strong>
                </DetailItem>
              </SupplierInfo>
              <ContractInfo>
                Ставка доходности {yieldRate} % • Договор № {generateContractNumber()}
              </ContractInfo>
            </SupplierHeader>
            
            <TableContainer>
              <CustomTable>
                <CustomTable.Head>
                  <CustomTable.Row>
                    <CustomTable.Header>
                      <HeaderWithIcon>
                        Ставка доходности
                        <InfoIconRingIcon size="xs" style={{ color: 'hsl(0 0% 64%)' }} />
                      </HeaderWithIcon>
                    </CustomTable.Header>
                    <CustomTable.Header>Скидка, % новая</CustomTable.Header>
                    <CustomTable.Header>Скидка, % прежняя</CustomTable.Header>
                    <CustomTable.Header>Сумма ранней оплаты</CustomTable.Header>
                    <CustomTable.Header>Сумма оплаты</CustomTable.Header>
                    <CustomTable.Header>Дата оплаты</CustomTable.Header>
                    <CustomTable.Header>№ счета</CustomTable.Header>
                    <CustomTable.Header>Дата счета</CustomTable.Header>
                  </CustomTable.Row>
                </CustomTable.Head>
                <CustomTable.Body>
                  {counterpartySupplies.map((supply: any, index: number) => (
                    <CustomTable.Row key={index}>
                      <CustomTable.Data>{getYieldRate(supply).toFixed(2).replace('.', ',')} %</CustomTable.Data>
                      <CustomTable.Data>{getNewDiscountPercent(supply).toFixed(2).replace('.', ',')}</CustomTable.Data>
                      <CustomTable.Data style={{ textDecoration: 'line-through', color: 'hsl(0 0% 64%)' }}>{getPreviousDiscountPercent()}</CustomTable.Data>
                      <CustomTable.Data>{supply.earlyPaymentAmount}</CustomTable.Data>
                      <CustomTable.Data>{supply.amount}</CustomTable.Data>
                      <CustomTable.Data>{supply.paymentDate}</CustomTable.Data>
                      <CustomTable.Data>{supply.invoiceNumber}</CustomTable.Data>
                      <CustomTable.Data>{supply.invoiceDate}</CustomTable.Data>
                    </CustomTable.Row>
                  ))}
                </CustomTable.Body>
              </CustomTable>
            </TableContainer>
          </SupplierCard>
        );
      })}
      
      <BottomBar>
        <Button
          style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
          onClick={onSubmit}
          data-testid="button-submit-agreements"
        >
          Создать соглашения
        </Button>
        <TotalInfo>
          <TotalItem>
            Ранняя оплата: <strong>{formatCurrency(calculateTotalEarlyPayment())}</strong>
          </TotalItem>
          <TotalItem>
            Скидка: <strong>{formatCurrency(calculateTotalDiscount())}</strong>
          </TotalItem>
        </TotalInfo>
      </BottomBar>
    </PageContainer>
  );
}
