import styled from "styled-components";
import { Button, CustomTable } from "vienna-ui";
import { GoLeftIcon } from "vienna.icons";

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

const BuyerCard = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const BuyerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border-bottom: 1px solid hsl(0 0% 93%);
`;

const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BuyerName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const BuyerDetails = styled.div`
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
}

export default function CreateAgreementsPage({ supplies, onBack, onSubmit }: CreateAgreementsPageProps) {
  const groupedByBuyer = supplies.reduce((acc, supply) => {
    const buyer = supply.buyer;
    if (!acc[buyer]) {
      acc[buyer] = [];
    }
    acc[buyer].push(supply);
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

  const getBuyerEarlyPayment = (buyerSupplies: any[]) => {
    return buyerSupplies.reduce((total, supply) => {
      const amount = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + amount;
    }, 0);
  };

  const getBuyerDiscount = (buyerSupplies: any[]) => {
    return buyerSupplies.reduce((total, supply) => {
      const amount = parseFloat(supply.amount.replace(/[^\d,]/g, '').replace(',', '.'));
      const earlyPayment = parseFloat(supply.earlyPaymentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + (amount - earlyPayment);
    }, 0);
  };

  const generateContractNumber = (buyer: string) => {
    const hash = buyer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `contrac...  от ${new Date().toLocaleDateString('ru-RU')}`;
  };

  return (
    <PageContainer>
      <BackLink onClick={onBack} data-testid="button-back-to-supplies">
        <GoLeftIcon size="s" />
        Список поставок
      </BackLink>
      
      <Title>Формирование соглашений</Title>
      
      {Object.entries(groupedByBuyer).map(([buyer, buyerSuppliesRaw]) => {
        const buyerSupplies = buyerSuppliesRaw as any[];
        return (
          <BuyerCard key={buyer}>
            <BuyerHeader>
              <BuyerInfo>
                <BuyerName>{buyer}</BuyerName>
                <BuyerDetails>
                  <DetailItem>
                    Ранняя оплата <strong>{formatCurrency(getBuyerEarlyPayment(buyerSupplies))}</strong>
                  </DetailItem>
                  <DetailItem>
                    Скидка <strong>{formatCurrency(getBuyerDiscount(buyerSupplies))}</strong>
                  </DetailItem>
                  <DetailItem>
                    Поставки <strong>{buyerSupplies.length} шт</strong>
                  </DetailItem>
                </BuyerDetails>
                <DetailItem style={{ color: 'hsl(0 0% 45%)' }}>
                  Дата ранней оплаты <strong>{buyerSupplies[0]?.earlyPaymentDate}</strong>
                </DetailItem>
              </BuyerInfo>
              <ContractInfo>
                Договор № {generateContractNumber(buyer)}
              </ContractInfo>
            </BuyerHeader>
            
            <TableContainer>
              <CustomTable>
                <CustomTable.Head>
                  <CustomTable.Row>
                    <CustomTable.Header>Скидка, %</CustomTable.Header>
                    <CustomTable.Header>Сумма ранней оплаты</CustomTable.Header>
                    <CustomTable.Header>Сумма оплаты</CustomTable.Header>
                    <CustomTable.Header>Дата оплаты</CustomTable.Header>
                    <CustomTable.Header>№ счета</CustomTable.Header>
                    <CustomTable.Header>Дата счета</CustomTable.Header>
                  </CustomTable.Row>
                </CustomTable.Head>
                <CustomTable.Body>
                  {buyerSupplies.map((supply: any, index: number) => (
                    <CustomTable.Row key={index}>
                      <CustomTable.Data>{supply.discount.replace(' %', '').replace('%', '')}</CustomTable.Data>
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
          </BuyerCard>
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
