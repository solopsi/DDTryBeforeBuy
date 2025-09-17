import styled from "styled-components";
import { Button } from "vienna-ui";
import { UploadIcon, GoLeftIcon } from "vienna.icons";
import StatusBadge from "./StatusBadge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
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

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: hsl(0 0% 8%);
`;

const StatusContainer = styled.div`
  margin-left: auto;
`;

const NotStartedSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  text-align: center;
`;

const InfoIconWrapper = styled.div`
  color: hsl(0 0% 45%);
  font-size: 48px;
`;

const NotStartedTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: hsl(0 0% 8%);
`;

const NotStartedSubtext = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0;
`;

const LoadButton = styled(Button)`
  background-color: #2B2D33 !important;
  color: white !important;
`;

const InfoSection = styled.div`
  background: hsl(0 0% 98%);
  border-radius: 8px;
  padding: 24px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  color: hsl(0 0% 8%);
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: hsl(0 0% 45%);
  font-size: 14px;
`;

const InfoValue = styled.span`
  color: hsl(0 0% 8%);
  font-size: 14px;
  font-weight: 500;
`;

const ParticipantsLink = styled.span`
  color: hsl(45 100% 50%);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface AuctionDetailViewProps {
  auction: {
    id: number;
    period: string;
    auctionAmount: string;
    bidsAmount: string;
    paymentDate: string;
    status: string;
  };
  onBack: () => void;
}

export default function AuctionDetailView({ auction, onBack }: AuctionDetailViewProps) {
  const formatPeriodForTitle = (period: string) => {
    // Convert "17.09.2025 12:20 - 31.12.2025 12:20" to "17 сентября 12:20 – 31 декабря 12:20"
    const [start, end] = period.split(' - ');
    const formatDate = (dateStr: string) => {
      const [datePart, timePart] = dateStr.split(' ');
      const [day, month, year] = datePart.split('.');
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                     'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      return `${parseInt(day)} ${months[parseInt(month) - 1]} ${timePart}`;
    };
    
    return `${formatDate(start)} – ${formatDate(end)}`;
  };

  const formatDateForInfo = (dateStr: string) => {
    // Convert "05.01.2025" to "05.01.2025"
    return dateStr;
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack} data-testid="button-back-to-auctions">
          <GoLeftIcon style={{ width: '16px', height: '16px' }} />
          Список аукционов
        </BackButton>
      </Header>

      <TitleSection>
        <Title data-testid="auction-detail-title">
          Аукцион {formatPeriodForTitle(auction.period)}
        </Title>
        <StatusContainer>
          <StatusBadge status={auction.status} />
        </StatusContainer>
      </TitleSection>

      <NotStartedSection>
        <InfoIconWrapper>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid hsl(0 0% 45%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'hsl(0 0% 45%)'
          }}>
            i
          </div>
        </InfoIconWrapper>
        <NotStartedTitle>Аукцион еще не начался</NotStartedTitle>
        <NotStartedSubtext>
          Вы можете загрузить еще поставки, если есть в планах
        </NotStartedSubtext>
        <LoadButton 
          data-testid="button-load-supplies"
          size="m"
        >
          <UploadIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Загрузить поставки
        </LoadButton>
      </NotStartedSection>

      <InfoSection>
        <InfoTitle>Информация об аукционе</InfoTitle>
        <InfoGrid>
          <InfoRow>
            <InfoLabel>Сумма аукциона</InfoLabel>
            <InfoValue data-testid="auction-amount">{auction.auctionAmount}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Дата ранней оплаты</InfoLabel>
            <InfoValue data-testid="early-payment-date">{formatDateForInfo(auction.paymentDate)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Участники аукциона</InfoLabel>
            <ParticipantsLink data-testid="participants-link">22 поставщика</ParticipantsLink>
          </InfoRow>
        </InfoGrid>
      </InfoSection>
    </Container>
  );
}