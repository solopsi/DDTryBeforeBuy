import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import { Button, Drawer } from "vienna-ui";
import { DocumentIcon, AddIcon, ChevronIcon } from "vienna.icons";

const BottomActionBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: hsl(0 0% 9%);
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const ActionInfo = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: hsl(0 0% 70%);
`;

const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const DrawerContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  margin-bottom: 24px;
`;

const SigningMethodSection = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DocumentsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const DocumentCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
`;

const DocumentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  cursor: pointer;
`;

const ChevronIconWrapper = styled.div<{ isExpanded: boolean }>`
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
`;

const DocumentHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CompanyName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const DocumentDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const DrawerFooter = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;

const CollapsibleContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #2b2d33;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 12px 0;
  color: #2b2d33;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #2b2d33;
  cursor: pointer;
`;

const SmallText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 8px 0 0 0;
`;

const StyledBadge = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => 
    props.color === 'yellow' ? '#FEE600' :
    props.color === 'blue' ? '#0066CC' : '#f0f0f0'
  };
  color: ${props => 
    props.color === 'yellow' ? '#2B2D33' :
    props.color === 'blue' ? 'white' : '#333'
  };
`;

//todo: remove mock functionality
const agreementsData = [
  {
    agreementDate: "25.09.2025",
    supplier: "ООО Тестовые данные",
    earlyPayment: "252 994,00 ₽",
    discount: "8 686,00 ₽",
    paymentDate: "21.09.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "23.09.2025",
    supplier: "ООО Тестовые данные",
    earlyPayment: "869 650,00 ₽",
    discount: "9 623,00 ₽",
    paymentDate: "20.09.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "24.09.2025",
    supplier: "АО Тестовая компания",
    earlyPayment: "736 926,00 ₽",
    discount: "5 711,00 ₽",
    paymentDate: "25.09.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "21.09.2025",
    supplier: "ПАО Московское общество",
    earlyPayment: "336 396,00 ₽",
    discount: "6 997,00 ₽",
    paymentDate: "20.09.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "22.09.2025",
    supplier: "ИП Можак Мок Можакич",
    earlyPayment: "786 153,00 ₽",
    discount: "6 496,00 ₽",
    paymentDate: "21.09.2025",
    status: "Ждет вашей подписи"
  }
];

const columns = [
  { key: 'agreementDate', header: 'Дата соглашения' },
  { key: 'supplier', header: 'Поставщик' },
  { key: 'earlyPayment', header: 'Сумма ранней оплаты' },
  { key: 'discount', header: 'Сумма скидки' },
  { key: 'paymentDate', header: 'Дата ранней оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function AgreementsPage() {
  const [selectedAgreements, setSelectedAgreements] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [signingMethod, setSigningMethod] = useState('qes');
  const [expandedDocuments, setExpandedDocuments] = useState<Set<number>>(new Set());

  const handleRowSelect = (rows: any[]) => {
    setSelectedAgreements(rows);
    console.log('Selected agreements:', rows);
  };

  const calculateTotalEarlyPayment = () => {
    return selectedAgreements.reduce((total, agreement) => {
      const amount = parseFloat(agreement.earlyPayment.replace(/[^\d]/g, ''));
      return total + amount;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount / 100) + ' ₽';
  };

  const handleSignAndSend = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleFinalSignAndSend = () => {
    console.log('Final signing and sending agreements:', selectedAgreements);
    console.log('Signing method:', signingMethod);
    setIsDrawerOpen(false);
    // Reset selection after signing
    setSelectedAgreements([]);
  };

  const toggleDocumentExpansion = (index: number) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedDocuments(newExpanded);
  };

  const formatDateForDisplay = (dateStr: string) => {
    return dateStr;
  };

  const generateContractNumber = (supplier: string, index: number) => {
    const prefix = supplier.includes('ООО') ? 'contract-vm3' : 'contract-0vw';
    return `${prefix}/${731 + index}`;
  };

  return (
    <>
      <DataTable
        title="Соглашения"
        columns={columns}
        data={agreementsData}
        onRowSelect={handleRowSelect}
      />
      
      {selectedAgreements.length > 0 && (
        <BottomActionBar>
          <ActionInfo>
            <InfoItem>
              <InfoLabel>Количество</InfoLabel>
              <InfoValue>{selectedAgreements.length}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Ранняя оплата</InfoLabel>
              <InfoValue>{formatCurrency(calculateTotalEarlyPayment())}</InfoValue>
            </InfoItem>
          </ActionInfo>
          
          <Button
            style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
            onClick={handleSignAndSend}
            data-testid="button-sign-and-send"
          >
            Подписать и отправить
          </Button>
        </BottomActionBar>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      >
        <DrawerContent style={{ minWidth: '600px' }}>
          <DrawerHeader>
            <Title>Документы на подпись</Title>
          </DrawerHeader>

          <SectionTitle>
            Выберите способ подписи
          </SectionTitle>
          
          <SigningMethodSection>
            <RadioContainer>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  value="qes"
                  checked={signingMethod === 'qes'}
                  onChange={(e) => setSigningMethod(e.target.value)}
                />
                <StyledBadge color="yellow" style={{ marginRight: '8px' }}>
                  <AddIcon />
                </StyledBadge>
                Подписант/ЭП Подписант
              </RadioLabel>
            </RadioContainer>
            <SmallText>
              Выдан 30.04.2026 10:21:37 Действителен до 30.04.2026
            </SmallText>
          </SigningMethodSection>

          <DocumentsList>
            {selectedAgreements.map((agreement, index) => (
              <DocumentCard key={index}>
                <DocumentHeader onClick={() => toggleDocumentExpansion(index)}>
                  <ChevronIconWrapper isExpanded={expandedDocuments.has(index)}>
                    <ChevronIcon />
                  </ChevronIconWrapper>
                  <DocumentHeaderContent>
                    <CompanyName>{agreement.supplier}</CompanyName>
                    <StyledBadge color="blue">
                      <DocumentIcon style={{ marginRight: '6px' }} />
                      Соглашение от {formatDateForDisplay(agreement.agreementDate)}
                    </StyledBadge>
                  </DocumentHeaderContent>
                </DocumentHeader>
                
                <CollapsibleContent isOpen={expandedDocuments.has(index)}>
                  <DocumentDetails>
                    <DetailItem>
                      <DetailLabel>Дата ранней оплаты</DetailLabel>
                      <DetailValue>{formatDateForDisplay(agreement.paymentDate)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Сумма ранней оплаты</DetailLabel>
                      <DetailValue>{agreement.earlyPayment}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Сумма скидки</DetailLabel>
                      <DetailValue>{agreement.discount}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>№ договора</DetailLabel>
                      <DetailValue>{generateContractNumber(agreement.supplier, index)}</DetailValue>
                    </DetailItem>
                  </DocumentDetails>
                </CollapsibleContent>
              </DocumentCard>
            ))}
          </DocumentsList>

          <DrawerFooter>
            <Button
              style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
              onClick={handleFinalSignAndSend}
              data-testid="button-final-sign-and-send"
            >
              Подписать и отправить
            </Button>
            <Button
              onClick={handleCloseDrawer}
              data-testid="button-cancel-signing"
            >
              Закрыть
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}