import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import { Button } from "vienna-ui";

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
    console.log('Signing and sending agreements:', selectedAgreements);
    // Simulation only
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
    </>
  );
}