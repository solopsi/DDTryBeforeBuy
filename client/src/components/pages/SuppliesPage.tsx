import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import FileUploadModal from "../FileUploadModal";
import { Button } from "vienna-ui/dist/Button";
import { DownloadIcon } from "vienna.icons";

// Styled components for tabs
const TabNavigation = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid hsl(0 0% 90%);
  padding-bottom: 0;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$active ? 'hsl(0 0% 8%)' : 'hsl(0 0% 64%)'};
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: ${props => props.$active ? '2px solid hsl(45 100% 50%)' : '2px solid transparent'};
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '500' : '400'};
  
  &:hover {
    color: hsl(0 0% 8%);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

//todo: remove mock functionality
const suppliesData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "2,15 %",
    invoiceDate: "28.08.2025",
    invoiceNumber: "invoice-env307",
    paymentDate: "17.09.2025",
    amount: "214 756,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Тестовая компания", 
    discount: "3,00 %",
    invoiceDate: "30.08.2025",
    invoiceNumber: "invoice-vcu103",
    paymentDate: "16.09.2025",
    amount: "817 554,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ПАО Москвов общество",
    discount: "2,00 %", 
    invoiceDate: "29.08.2025",
    invoiceNumber: "invoice-pou533",
    paymentDate: "17.09.2025",
    amount: "998 160,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ООО Северная торговля",
    discount: "4,50 %",
    invoiceDate: "01.09.2025",
    invoiceNumber: "invoice-str825",
    paymentDate: "18.09.2025",
    amount: "1 245 890,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ИП Петрова Анна Сергеевна",
    discount: "3,65 %",
    invoiceDate: "02.09.2025", 
    invoiceNumber: "invoice-pas461",
    paymentDate: "19.09.2025",
    amount: "356 720,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Волжский машиностроительный завод",
    discount: "2,75 %",
    invoiceDate: "03.09.2025",
    invoiceNumber: "invoice-vmz739",
    paymentDate: "20.09.2025",
    amount: "2 134 567,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ООО Сибирские ресурсы",
    discount: "1,80 %",
    invoiceDate: "04.09.2025",
    invoiceNumber: "invoice-sir294",
    paymentDate: "21.09.2025",
    amount: "789 234,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ЗАО Технологии будущего",
    discount: "1,40 %",
    invoiceDate: "05.09.2025",
    invoiceNumber: "invoice-tbz156",
    paymentDate: "22.09.2025", 
    amount: "467 891,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ИП Сидоров Михаил Игоревич",
    discount: "3,25 %",
    invoiceDate: "06.09.2025",
    invoiceNumber: "invoice-smi673",
    paymentDate: "23.09.2025",
    amount: "623 445,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ПАО Энергосистемы",
    discount: "1,95 %",
    invoiceDate: "07.09.2025",
    invoiceNumber: "invoice-ens812",
    paymentDate: "24.09.2025",
    amount: "1 567 223,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ООО Логистические решения",
    discount: "2,90 %",
    invoiceDate: "08.09.2025",
    invoiceNumber: "invoice-lrs948",
    paymentDate: "25.09.2025",
    amount: "892 156,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Дальневосточная компания",
    discount: "4,10 %",
    invoiceDate: "09.09.2025",
    invoiceNumber: "invoice-dvk385",
    paymentDate: "26.09.2025",
    amount: "1 789 456,00 ₽",
    status: "Ждет отправки"
  }
];

const columns = [
  { key: 'supplier', header: 'Поставщик' },
  { key: 'discount', header: 'Ставка доходности' },
  { key: 'invoiceDate', header: 'Дата счета' },
  { key: 'invoiceNumber', header: '№ счета' },
  { key: 'paymentDate', header: 'Дата оплаты' },
  { key: 'amount', header: 'Сумма оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function SuppliesPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("on-shipment");

  return (
    <PageContainer>
      <TitleSection>
        <Title>Поставки</Title>
        <TabNavigation>
          <TabButton 
            $active={activeTab === "on-shipment"}
            onClick={() => setActiveTab("on-shipment")}
            data-testid="nav-not-shipped"
          >
            На отправку
          </TabButton>
          <TabButton 
            $active={activeTab === "awaiting-response"}
            onClick={() => setActiveTab("awaiting-response")}
            data-testid="nav-awaiting-response"
          >
            Ждет вашего ответа
          </TabButton>
          <TabButton 
            $active={activeTab === "with-error"}
            onClick={() => setActiveTab("with-error")}
            data-testid="nav-with-error"
          >
            С ошибкой
          </TabButton>
          <TabButton 
            $active={activeTab === "all-supplies"}
            onClick={() => setActiveTab("all-supplies")}
            data-testid="nav-all-supplies"
          >
            Все поставки
          </TabButton>
        </TabNavigation>
      </TitleSection>

      <DataTable
        title="" // Remove title since we have it above
        columns={columns}
        data={suppliesData}
        onRowSelect={(rows) => console.log('Selected supplies:', rows)}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              design="primary"
              data-testid="button-notify-suppliers"
            >
              Удалить поставки на отправку
            </Button>
            <Button 
              design="outline" 
              onClick={() => setIsUploadModalOpen(true)}
              data-testid="button-load-supplies"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <DownloadIcon style={{ width: '16px', height: '16px' }} />
                Загрузить
              </div>
            </Button>
          </div>
        }
      />
      
      <FileUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </PageContainer>
  );
}