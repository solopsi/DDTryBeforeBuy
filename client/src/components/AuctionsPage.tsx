import { useState } from "react";
import styled from "styled-components";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import AuctionDetailView from "./AuctionDetailView";
import { Button } from "vienna-ui";
import { AddIcon } from "vienna.icons";

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

const newAuctionsData = [
  {
    id: 1,
    period: "17.09.2025 12:20 - 31.12.2025 12:20",
    auctionAmount: "100 000 000,00 ₽",
    bidsAmount: "150 000 000,00 ₽",
    paymentDate: "05.01.2025",
    status: "Запланирован"
  }
];

const awaitingResponseData = [
  {
    id: 2,
    period: "11.09.2025 12:20 - 10.09.2025 12:20",
    auctionAmount: "695 314,00 ₽",
    bidsAmount: "785 480,00 ₽",
    paymentDate: "12.09.2025",
    status: "Ждет решения"
  },
  {
    id: 3,
    period: "12.09.2025 12:20 - 14.09.2025 12:20",
    auctionAmount: "711 763,00 ₽",
    bidsAmount: "277 593,00 ₽",
    paymentDate: "11.09.2025",
    status: "Ждет решения"
  },
  {
    id: 4,
    period: "16.09.2025 12:20 - 10.09.2025 12:20",
    auctionAmount: "253 570,00 ₽",
    bidsAmount: "851 621,00 ₽",
    paymentDate: "12.09.2025",
    status: "Ждет решения"
  },
  {
    id: 5,
    period: "10.09.2025 12:20 - 14.09.2025 12:20",
    auctionAmount: "377 554,00 ₽",
    bidsAmount: "324 780,00 ₽",
    paymentDate: "10.09.2025",
    status: "Ждет решения"
  }
];

const otherStatusAuctionsData = [
  {
    id: 6,
    period: "16.09.2025 12:20 - 10.09.2025 12:20",
    auctionAmount: "930 239,00 ₽",
    bidsAmount: "748 642,00 ₽",
    paymentDate: "11.09.2025",
    status: "Отменен"
  },
  {
    id: 7,
    period: "12.09.2025 12:20 - 10.09.2025 12:20",
    auctionAmount: "451 715,00 ₽",
    bidsAmount: "952 554,00 ₽",
    paymentDate: "14.09.2025",
    status: "Отменен"
  },
  {
    id: 8,
    period: "12.09.2025 12:20 - 13.09.2025 12:20",
    auctionAmount: "745 900,00 ₽",
    bidsAmount: "842 893,00 ₽",
    paymentDate: "14.09.2025",
    status: "Закрыт"
  },
  {
    id: 9,
    period: "13.09.2025 12:20 - 13.09.2025 12:20",
    auctionAmount: "528 247,00 ₽",
    bidsAmount: "324 802,00 ₽",
    paymentDate: "11.09.2025",
    status: "Отменен"
  },
  {
    id: 10,
    period: "10.09.2025 12:20 - 14.09.2025 12:20",
    auctionAmount: "288 725,00 ₽",
    bidsAmount: "410 343,00 ₽",
    paymentDate: "13.09.2025",
    status: "Закрыт"
  },
  {
    id: 11,
    period: "15.09.2025 12:20 - 14.09.2025 12:20",
    auctionAmount: "564 102,00 ₽",
    bidsAmount: "751 047,00 ₽",
    paymentDate: "10.09.2025",
    status: "Не выполнен"
  },
  {
    id: 12,
    period: "15.09.2025 12:20 - 11.09.2025 12:20",
    auctionAmount: "820 072,00 ₽",
    bidsAmount: "698 587,00 ₽",
    paymentDate: "16.09.2025",
    status: "Закрыт"
  }
];

const columns = [
  { key: 'period', header: 'Период проведения' },
  { key: 'auctionAmount', header: 'Сумма аукциона' },
  { key: 'bidsAmount', header: 'Сумма ответов' },
  { key: 'paymentDate', header: 'Дата ранней оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function AuctionsPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedAuction, setSelectedAuction] = useState<any>(null);

  const getTabData = () => {
    switch (activeTab) {
      case "new":
        return newAuctionsData;
      case "awaiting-response":
        return awaitingResponseData;
      case "all":
        // Combine data from "new", "awaiting-response", and other statuses
        return [...newAuctionsData, ...awaitingResponseData, ...otherStatusAuctionsData];
      default:
        return newAuctionsData;
    }
  };

  const handleRowClick = (auction: any) => {
    setSelectedAuction(auction);
  };

  const handleBackToList = () => {
    setSelectedAuction(null);
  };

  if (selectedAuction) {
    return (
      <AuctionDetailView 
        auction={selectedAuction} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <PageContainer>
      <TitleSection>
        <Title>Аукционы</Title>
        <TabNavigation>
          <TabButton 
            $active={activeTab === "new"}
            onClick={() => setActiveTab("new")}
            data-testid="tab-new-auctions"
          >
            Новые
          </TabButton>
          <TabButton 
            $active={activeTab === "awaiting-response"}
            onClick={() => setActiveTab("awaiting-response")}
            data-testid="tab-awaiting-response"
          >
            Ждут вашего ответа
          </TabButton>
          <TabButton 
            $active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            data-testid="tab-all-auctions"
          >
            Все аукционы
          </TabButton>
        </TabNavigation>
      </TitleSection>

      <DataTable
        title="" // Remove title since we have it above
        columns={columns}
        data={getTabData()}
        onRowSelect={(rows) => console.log('Selected auctions:', rows)}
        onRowClick={handleRowClick}
        actions={
          <Button 
            data-testid="button-create-auction"
            style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
          >
            <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Создать
          </Button>
        }
        showFilters={true}
      />
    </PageContainer>
  );
}