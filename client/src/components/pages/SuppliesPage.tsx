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
    discount: "—",
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