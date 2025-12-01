import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import AuctionDetailView from "../AuctionDetailView";
import AuctionInProgressView from "../AuctionInProgressView";
import AuctionAwaitingDecisionView from "../AuctionAwaitingDecisionView";
import AuctionOfferSelectionView from "../AuctionOfferSelectionView";
import AuctionAgreementFormationView from "../AuctionAgreementFormationView";
import ColoredBidsAmount from "../ColoredBidsAmount";
import CreateAuctionForm from "../CreateAuctionForm";
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

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const initialNewAuctionsData = [
  {
    id: 1,
    period: "17.09.2025 12:20 - 31.12.2025 12:20",
    auctionAmount: "100 000 000,00 ₽",
    bidsAmount: "150 000 000,00 ₽",
    paymentDate: "05.01.2025",
    status: "Запланирован"
  },
  {
    id: 2,
    period: "17.09.2025 12:20 - 31.12.2025 12:20",
    auctionAmount: "200 000 000,00 ₽",
    bidsAmount: "250 000 000,00 ₽",
    paymentDate: "01.01.2025",
    status: "В процессе"
  }
];

const awaitingResponseData = [
  {
    id: 2,
    period: "11.09.2025 12:20 - 16.09.2025 12:20",
    auctionAmount: "50 000 000,00 ₽",
    bidsAmount: {
      breakdown: {
        green: "50 млн ₽",
        yellow: "25 млн ₽",
        red: "35 млн ₽",
        total: "110 000 000,00 ₽"
      }
    },
    paymentDate: "21.09.2025",
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

interface AuctionsPageProps {
  userRole?: 'buyer' | 'supplier';
}

export default function AuctionsPage({ userRole = 'buyer' }: AuctionsPageProps) {
  const [activeTab, setActiveTab] = useState(userRole === 'supplier' ? "awaiting-response" : "new");

  const getColumns = () => {
    if (userRole === 'supplier') {
      return [
        { key: 'period', header: 'Период проведения' },
        { key: 'auctionAmount', header: 'Сумма аукциона' },
        { key: 'yourBidsAmount', header: 'Сумма ваших ответов' },
        { key: 'paymentDate', header: 'Дата ранней оплаты' },
        { 
          key: 'status', 
          header: 'Статус',
          render: (value: string) => <StatusBadge status={value} />
        },
      ];
    }
    return [
      { key: 'period', header: 'Период проведения' },
      { key: 'auctionAmount', header: 'Сумма аукциона' },
      { 
        key: 'bidsAmount', 
        header: 'Сумма ответов',
        render: (value: any) => {
          if (value && typeof value === 'object' && value.breakdown) {
            return <ColoredBidsAmount breakdown={value.breakdown} />;
          }
          return String(value);
        }
      },
      { key: 'paymentDate', header: 'Дата ранней оплаты' },
      { 
        key: 'status', 
        header: 'Статус',
        render: (value: string) => <StatusBadge status={value} />
      },
    ];
  };
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'offer-selection' | 'agreement-formation' | 'create-form'>('list');
  const [newAuctionsData, setNewAuctionsData] = useState(initialNewAuctionsData);

  const getTabData = () => {
    switch (activeTab) {
      case "new":
        return newAuctionsData;
      case "awaiting-response":
        if (userRole === 'supplier') {
          return awaitingResponseData.map(auction => ({
            ...auction,
            status: 'В процессе',
            yourBidsAmount: '150 000,00 ₽'
          }));
        }
        return awaitingResponseData;
      case "all":
        if (userRole === 'supplier') {
          const supplierData = [...awaitingResponseData, ...otherStatusAuctionsData].map(auction => ({
            ...auction,
            yourBidsAmount: '150 000,00 ₽'
          }));
          return supplierData;
        }
        return [...newAuctionsData, ...awaitingResponseData, ...otherStatusAuctionsData];
      default:
        return userRole === 'supplier' ? awaitingResponseData : newAuctionsData;
    }
  };

  const handleRowClick = (auction: any) => {
    setSelectedAuction(auction);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedAuction(null);
    setCurrentView('list');
  };

  const handleCreateAgreement = () => {
    setCurrentView('offer-selection');
  };

  const handleBackToDetail = () => {
    setCurrentView('detail');
  };

  const handleCreateAgreements = () => {
    setCurrentView('agreement-formation');
  };

  const handleBackToOfferSelection = () => {
    setCurrentView('offer-selection');
  };

  const handleFinalCreateAgreements = () => {
    // Final step - create agreements and navigate back to list
    console.log('Final creation of agreements');
    setCurrentView('list');
    setSelectedAuction(null);
  };

  const handleCreateAuction = () => {
    setCurrentView('create-form');
  };

  const handleBackToListFromCreate = () => {
    setCurrentView('list');
  };

  // Utility function to format currency with thousand separators
  const formatCurrencyAmount = (amount: string): string => {
    if (!amount) return "0,00 ₽";
    
    // Remove currency symbol and spaces for processing
    let cleanAmount = amount.replace(/[₽\s]/g, '').replace(',', '.');
    
    // Parse as number and format
    const numericAmount = parseFloat(cleanAmount) || 0;
    
    // Format with thousand separators and 2 decimal places
    const formatted = numericAmount.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    // Replace period with comma for Russian format
    return formatted.replace('.', ',') + ' ₽';
  };

  const generateAuctionFromFormData = (formData: any) => {
    // Generate unique ID based on current auctions
    const allAuctions = [...newAuctionsData, ...awaitingResponseData, ...otherStatusAuctionsData];
    const maxId = Math.max(...allAuctions.map(auction => auction.id), 0);
    const newId = maxId + 1;

    // Format period from form data
    const period = `${formData.startDate} ${formData.startTime} - ${formData.endDate} ${formData.endTime}`;
    
    // Format auction amount with proper currency formatting
    const auctionAmount = formatCurrencyAmount(formData.auctionAmount);

    return {
      id: newId,
      period: period,
      auctionAmount: auctionAmount,
      bidsAmount: "0,00 ₽", // Default value for new auctions
      paymentDate: formData.earlyPaymentDate,
      status: "Запланирован"
    };
  };

  // Show create form
  if (currentView === 'create-form') {
    return (
      <PageContainer>
        <TitleSection>
          <TitleRow>
            <Title>Новый аукцион</Title>
            <Button 
              data-testid="button-back-to-list"
              onClick={handleBackToListFromCreate}
              style={{ backgroundColor: 'transparent', color: '#2B2D33', border: '1px solid #E0E0E0' }}
            >
              ← Список аукционов
            </Button>
          </TitleRow>
        </TitleSection>
        <CreateAuctionForm 
          onCreateAuction={(auctionData) => {
            console.log('Creating auction with data:', auctionData);
            
            // Generate new auction object
            const newAuction = generateAuctionFromFormData(auctionData);
            
            // Add new auction to the state
            setNewAuctionsData(prevAuctions => [...prevAuctions, newAuction]);
            
            // Switch to "Новые" tab to show the new auction
            setActiveTab("new");
            
            // Navigate back to list
            handleBackToListFromCreate();
          }}
          onBack={handleBackToListFromCreate}
        />
      </PageContainer>
    );
  }

  if (selectedAuction && currentView !== 'list') {
    // Show agreement formation view
    if (currentView === 'agreement-formation') {
      return (
        <AuctionAgreementFormationView 
          onBack={handleBackToOfferSelection}
          onCreateAgreements={handleFinalCreateAgreements}
        />
      );
    }
    
    // Show offer selection view
    if (currentView === 'offer-selection') {
      return (
        <AuctionOfferSelectionView 
          auction={selectedAuction} 
          onBack={handleBackToDetail}
          onCreateAgreements={handleCreateAgreements}
        />
      );
    }
    
    // Show different detail views based on auction status
    if (selectedAuction.status === "В процессе") {
      return (
        <AuctionInProgressView 
          auction={selectedAuction} 
          onBack={handleBackToList}
        />
      );
    } else if (selectedAuction.status === "Ждет решения") {
      return (
        <AuctionAwaitingDecisionView 
          auction={selectedAuction} 
          onBack={handleBackToList}
          onCreateAgreement={handleCreateAgreement}
        />
      );
    } else {
      return (
        <AuctionDetailView 
          auction={selectedAuction} 
          onBack={handleBackToList}
        />
      );
    }
  }

  return (
    <PageContainer>
      <TitleSection>
        <TitleRow>
          <Title>Аукционы</Title>
          {userRole === 'buyer' && (
            <Button 
              data-testid="button-create-auction-header"
              onClick={handleCreateAuction}
              style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
            >
              <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Создать
            </Button>
          )}
        </TitleRow>
        <TabNavigation>
          {userRole === 'buyer' && (
            <TabButton 
              $active={activeTab === "new"}
              onClick={() => setActiveTab("new")}
              data-testid="tab-new-auctions"
            >
              Новые
            </TabButton>
          )}
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
        columns={getColumns()}
        data={getTabData()}
        onRowSelect={(rows) => console.log('Selected auctions:', rows)}
        onRowClick={handleRowClick}
        showFilters={true}
      />
    </PageContainer>
  );
}