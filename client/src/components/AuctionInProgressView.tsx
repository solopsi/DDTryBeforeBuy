import styled from "styled-components";
import { Button } from "vienna-ui";
import { UploadIcon, GoLeftIcon, DocIcon, RefreshRepeatIcon } from "vienna.icons";
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

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const UpdateButton = styled(Button)`
  background-color: #FEE600 !important;
  color: #2B2D33 !important;
`;

const LastUpdated = styled.span`
  color: hsl(0 0% 45%);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  color: hsl(0 0% 8%);
`;

const OffersGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const OfferCard = styled.div<{ $color: 'red' | 'orange' | 'green' }>`
  padding: 16px;
  border-radius: 8px;
  background: ${props => {
    switch (props.$color) {
      case 'red': return 'hsl(0 70% 95%)';
      case 'orange': return 'hsl(35 70% 95%)';
      case 'green': return 'hsl(120 70% 95%)';
      default: return 'hsl(0 0% 98%)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$color) {
      case 'red': return 'hsl(0 70% 85%)';
      case 'orange': return 'hsl(35 70% 85%)';
      case 'green': return 'hsl(120 70% 85%)';
      default: return 'hsl(0 0% 90%)';
    }
  }};
  flex: 1;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OfferAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin-bottom: 8px;
`;

const OfferDetails = styled.div`
  font-size: 14px;
  color: hsl(0 0% 45%);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AttractivenessBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  background: hsl(0 0% 95%);
  margin-bottom: 16px;
  font-size: 14px;
  color: hsl(0 0% 45%);
`;

const ExplanationText = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0;
  line-height: 1.5;
`;

const SuppliesCard = styled.div`
  background: hsl(0 0% 98%);
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SuppliesAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: hsl(0 0% 8%);
`;

const SuppliesCount = styled.div`
  font-size: 14px;
  color: hsl(0 0% 45%);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddSuppliesButton = styled(Button)`
  background-color: transparent !important;
  border: 1px solid hsl(0 0% 80%) !important;
  color: hsl(0 0% 8%) !important;
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

const RatingButton = styled(Button)`
  background-color: #FEE600 !important;
  color: #2B2D33 !important;
  margin-top: 16px;
`;

interface AuctionInProgressViewProps {
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

export default function AuctionInProgressView({ auction, onBack }: AuctionInProgressViewProps) {
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
    // Convert "01.01.2025" to "01.01.2025"
    return dateStr;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
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

      <ActionsSection>
        <UpdateButton data-testid="button-update-data" size="m">
          <RefreshRepeatIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Обновить данные
        </UpdateButton>
        <LastUpdated>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid hsl(0 0% 45%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            color: 'hsl(0 0% 45%)'
          }}>
            ⏰
          </div>
          Данные актуальны на {getCurrentTime()}
        </LastUpdated>
      </ActionsSection>

      <Section>
        <SectionTitle>Предложения поставщиков</SectionTitle>
        <OffersGrid>
          <OfferCard $color="red">
            <OfferAmount>2 297 652,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              4 поставки
            </OfferDetails>
          </OfferCard>
          <OfferCard $color="orange">
            <OfferAmount>4 939 793,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              9 поставок
            </OfferDetails>
          </OfferCard>
          <OfferCard $color="green">
            <OfferAmount>4 130 098,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              9 поставок
            </OfferDetails>
          </OfferCard>
        </OffersGrid>
        <RatingButton data-testid="button-supplier-rating">
          Рейтинг по поставщикам
        </RatingButton>
      </Section>

      <Section>
        <AttractivenessBadge>
          Цвет показывает привлекательность предложений поставщиков
        </AttractivenessBadge>
        <ExplanationText>
          Привлекательность рассчитывается по скидке, которую предложили поставщики.
        </ExplanationText>
        <br />
        <ExplanationText>
          <strong>Пример</strong>
        </ExplanationText>
        <ExplanationText>
          Один поставщик предложил скидку 3%, а другой поставщик — 5%. Скидка 3% менее привлекательна, 
          поэтому попадет в красную или желтую группу. Поставщик может увеличить скидку, чтобы повысить 
          свои шансы. Тогда его предложение будет в зеленой группе.
        </ExplanationText>
      </Section>

      <Section>
        <SectionTitle>Поставки</SectionTitle>
        <SuppliesCard>
          <div>
            <SuppliesAmount>1 432 668,00 ₽</SuppliesAmount>
            <SuppliesCount>
              <DocIcon style={{ width: '16px', height: '16px' }} />
              3 поставки
            </SuppliesCount>
          </div>
          <AddSuppliesButton data-testid="button-add-supplies">
            Добавить поставки
          </AddSuppliesButton>
        </SuppliesCard>
      </Section>

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