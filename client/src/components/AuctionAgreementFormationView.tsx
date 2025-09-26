import styled from "styled-components";
import { Button, CustomTable } from "vienna-ui";
import { GoLeftIcon } from "vienna.icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  padding-bottom: 120px; /* Space for fixed bottom panel */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: hsl(0 0% 45%);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &:hover {
    color: hsl(0 0% 8%);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: hsl(0 0% 8%);
`;

const SupplierGroup = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
  margin-bottom: 24px;
`;

const SupplierHeader = styled.div`
  background: hsl(0 0% 98%);
  padding: 16px 20px;
  border-bottom: 1px solid hsl(0 0% 90%);
`;

const SupplierTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: hsl(0 0% 8%);
`;

const SupplierInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 8px;
  font-size: 14px;
  color: hsl(0 0% 45%);
`;

const InfoItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  
  span {
    color: hsl(0 0% 8%);
    font-weight: 500;
  }
`;

const ContractInfo = styled.div`
  font-size: 14px;
  color: hsl(0 0% 45%);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TableContainer = styled.div`
  & table {
    width: 100%;
    border-collapse: collapse;
  }
  
  & thead {
    background: hsl(0 0% 98%);
  }
  
  & tbody tr:hover {
    background: hsl(0 0% 98%);
  }
  
  & tr {
    border-bottom: 1px solid hsl(0 0% 93%);
  }
  
  & tr:last-child {
    border-bottom: none;
  }
  
  & td, & th {
    padding: 12px 16px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
  }
  
  & th {
    font-weight: 500;
    color: hsl(0 0% 45%);
  }
`;

const EmptySupplierGroup = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
  margin-bottom: 24px;
  padding: 16px 20px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: hsl(0 0% 8%);
  }
`;

const SummaryPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: hsl(0 0% 15%);
  color: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const SummaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
`;

const SummaryItem = styled.div`
  color: hsl(0 0% 80%);
  
  span {
    color: white;
    font-weight: 500;
    margin-left: 4px;
  }
`;

const CreateAgreementsButton = styled(Button)`
  background-color: hsl(45 100% 50%) !important;
  color: hsl(0 0% 8%) !important;
  border: none !important;
  font-weight: 500;
  
  &:hover {
    background-color: hsl(45 100% 45%) !important;
  }
`;

interface AuctionAgreementFormationViewProps {
  onBack: () => void;
  onCreateAgreements?: () => void;
}

export default function AuctionAgreementFormationView({ 
  onBack, 
  onCreateAgreements 
}: AuctionAgreementFormationViewProps) {
  
  // Data based on the screenshot
  const supplierGroups = [
    {
      id: 1,
      name: "ИП Тестов Тест Тестович",
      earlyPayment: "9 583,00 ₽",
      discount: "1 608 312,00 ₽", 
      suppliesCount: "2 шт",
      earlyPaymentDate: "12.09.2025",
      contractNumber: "contract...",
      contractDate: "14.09.2025",
      supplies: [
        {
          id: 1,
          profitabilityRate: "89,00 %",
          discount: "78,88",
          earlyPaymentAmount: "4 482,00 ₽",
          paymentAmount: "794 446,00 ₽",
          paymentDate: "06.10.2025",
          invoiceNumber: "invoice-j39/459",
          invoiceDate: "16.09.2025"
        },
        {
          id: 2, 
          profitabilityRate: "13,00 %",
          discount: "85,07",
          earlyPaymentAmount: "5 101,00 ₽",
          paymentAmount: "823 449,00 ₽",
          paymentDate: "07.10.2025",
          invoiceNumber: "invoice-cbr/417",
          invoiceDate: "12.09.2025"
        }
      ]
    },
    {
      id: 2,
      name: "ООО Тестовые данные", 
      earlyPayment: "16 659,00 ₽",
      discount: "2 450 568,00 ₽",
      suppliesCount: "5 шт",
      earlyPaymentDate: "12.09.2025",
      contractNumber: "contract...",
      contractDate: "14.09.2025",
      supplies: [
        {
          id: 3,
          profitabilityRate: "66,00 %",
          discount: "36,95",
          earlyPaymentAmount: "3 819,00 ₽",
          paymentAmount: "510 477,00 ₽", 
          paymentDate: "02.10.2025",
          invoiceNumber: "invoice-ghc/256",
          invoiceDate: "11.09.2025"
        },
        {
          id: 4,
          profitabilityRate: "76,00 %", 
          discount: "62,40",
          earlyPaymentAmount: "2 029,00 ₽",
          paymentAmount: "290 161,00 ₽",
          paymentDate: "03.10.2025", 
          invoiceNumber: "invoice-5b2/480",
          invoiceDate: "12.09.2025"
        },
        {
          id: 5,
          profitabilityRate: "77,00 %",
          discount: "97,86", 
          earlyPaymentAmount: "1 813,00 ₽",
          paymentAmount: "741 871,00 ₽",
          paymentDate: "07.10.2025",
          invoiceNumber: "invoice-nv/633",
          invoiceDate: "10.09.2025"
        },
        {
          id: 6,
          profitabilityRate: "73,00 %",
          discount: "98,11",
          earlyPaymentAmount: "6 264,00 ₽", 
          paymentAmount: "491 613,00 ₽",
          paymentDate: "03.10.2025",
          invoiceNumber: "invoice-2m3/764",
          invoiceDate: "15.09.2025"
        },
        {
          id: 7,
          profitabilityRate: "95,00 %",
          discount: "51,24",
          earlyPaymentAmount: "4 734,00 ₽",
          paymentAmount: "435 105,00 ₽", 
          paymentDate: "01.10.2025",
          invoiceNumber: "invoice-uic/625",
          invoiceDate: "16.09.2025"
        }
      ]
    },
    {
      id: 3,
      name: "АО Тестовая компания",
      earlyPayment: "8 300,00 ₽",
      discount: "307 439,00 ₽",
      suppliesCount: "1 шт",
      earlyPaymentDate: "12.09.2025", 
      contractNumber: "contract...",
      contractDate: "13.09.2025",
      supplies: [
        {
          id: 8,
          profitabilityRate: "95,00 %",
          discount: "17,33",
          earlyPaymentAmount: "8 300,00 ₽",
          paymentAmount: "315 739,00 ₽",
          paymentDate: "07.10.2025",
          invoiceNumber: "invoice-ryj/630", 
          invoiceDate: "16.09.2025"
        }
      ]
    }
  ];

  // Empty group as shown in screenshot
  const emptyGroup = {
    id: 4,
    name: "АО Тестовая компания" 
  };

  const handleCreateAgreements = () => {
    if (onCreateAgreements) {
      onCreateAgreements();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack} data-testid="button-back-to-selection">
          <GoLeftIcon style={{ width: '16px', height: '16px' }} />
          К выбору поставок
        </BackButton>
        <Title data-testid="agreement-formation-title">Формирование соглашений</Title>
      </Header>

      {supplierGroups.map((group) => (
        <SupplierGroup key={group.id} data-testid={`supplier-group-${group.id}`}>
          <SupplierHeader>
            <SupplierTitle data-testid={`supplier-name-${group.id}`}>{group.name}</SupplierTitle>
            <SupplierInfo>
              <InfoItem data-testid={`early-payment-${group.id}`}>
                Ранняя оплата <span>{group.earlyPayment}</span>
              </InfoItem>
              <InfoItem data-testid={`discount-${group.id}`}>
                Скидка <span>{group.discount}</span>
              </InfoItem>
              <InfoItem data-testid={`supplies-count-${group.id}`}>
                Поставки <span>{group.suppliesCount}</span>
              </InfoItem>
            </SupplierInfo>
            <ContractInfo data-testid={`early-payment-date-${group.id}`}>
              Дата ранней оплаты {group.earlyPaymentDate}
            </ContractInfo>
            <ContractInfo data-testid={`contract-info-${group.id}`}>
              Договор № {group.contractNumber} от {group.contractDate}
            </ContractInfo>
          </SupplierHeader>
          
          <TableContainer>
            <CustomTable>
              <CustomTable.Head>
                <CustomTable.Row>
                  <CustomTable.Header>Ставка доходности</CustomTable.Header>
                  <CustomTable.Header>Скидка, %</CustomTable.Header>
                  <CustomTable.Header>Сумма ранней оплаты</CustomTable.Header>
                  <CustomTable.Header>Сумма оплаты</CustomTable.Header>
                  <CustomTable.Header>Дата оплаты</CustomTable.Header>
                  <CustomTable.Header>№ счета</CustomTable.Header>
                  <CustomTable.Header>Дата счета</CustomTable.Header>
                </CustomTable.Row>
              </CustomTable.Head>
              <CustomTable.Body>
                {group.supplies.map((supply, index) => (
                  <CustomTable.Row key={supply.id} data-testid={`supply-row-${group.id}-${index}`}>
                    <CustomTable.Data data-testid={`profitability-${group.id}-${index}`}>
                      {supply.profitabilityRate}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`discount-${group.id}-${index}`}>
                      {supply.discount}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`early-payment-amount-${group.id}-${index}`}>
                      {supply.earlyPaymentAmount}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`payment-amount-${group.id}-${index}`}>
                      {supply.paymentAmount}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`payment-date-${group.id}-${index}`}>
                      {supply.paymentDate}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`invoice-number-${group.id}-${index}`}>
                      {supply.invoiceNumber}
                    </CustomTable.Data>
                    <CustomTable.Data data-testid={`invoice-date-${group.id}-${index}`}>
                      {supply.invoiceDate}
                    </CustomTable.Data>
                  </CustomTable.Row>
                ))}
              </CustomTable.Body>
            </CustomTable>
          </TableContainer>
        </SupplierGroup>
      ))}

      {/* Empty supplier group */}
      <EmptySupplierGroup data-testid="empty-supplier-group">
        <h3>{emptyGroup.name}</h3>
      </EmptySupplierGroup>

      <SummaryPanel data-testid="summary-panel">
        <SummaryInfo>
          <SummaryItem data-testid="total-early-payment">
            Ранняя оплата: <span>86 012,00 ₽</span>
          </SummaryItem>
          <SummaryItem data-testid="total-discount">
            Скидка: <span>8 983 879,00 ₽</span>
          </SummaryItem>
        </SummaryInfo>
        <CreateAgreementsButton
          onClick={handleCreateAgreements}
          data-testid="button-create-agreements"
        >
          Создать соглашения
        </CreateAgreementsButton>
      </SummaryPanel>
    </Container>
  );
}