import styled from "styled-components";
import { Button } from "vienna-ui";
import { GoLeftIcon, CalendarIcon, DocIcon } from "vienna.icons";
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

const DecisionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  text-align: center;
`;

const CalendarIconWrapper = styled.div`
  color: hsl(0 0% 45%);
  font-size: 48px;
  margin-bottom: 16px;
`;

const DecisionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: hsl(0 0% 8%);
`;

const DecisionSubtext = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0;
`;

const CreateAgreementButton = styled(Button)`
  background-color: #2B2D33 !important;
  color: white !important;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  color: hsl(0 0% 8%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RatingButton = styled(Button)`
  background-color: #FEE600 !important;
  color: #2B2D33 !important;
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

const AttractivenessSection = styled.div`
  margin-bottom: 32px;
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

const AttractivenessChips = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const AttractivenessChip = styled.div<{ $color: 'red' | 'orange' | 'green' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.$color) {
      case 'red': return 'hsl(0 70% 95%)';
      case 'orange': return 'hsl(35 70% 95%)';
      case 'green': return 'hsl(120 70% 95%)';
      default: return 'hsl(0 0% 98%)';
    }
  }};
  color: ${props => {
    switch (props.$color) {
      case 'red': return 'hsl(0 70% 35%)';
      case 'orange': return 'hsl(35 70% 35%)';
      case 'green': return 'hsl(120 70% 35%)';
      default: return 'hsl(0 0% 45%)';
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
`;

const ExplanationText = styled.p`
  font-size: 14px;
  color: hsl(0 0% 45%);
  margin: 0 0 8px 0;
  line-height: 1.5;
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

interface AuctionAwaitingDecisionViewProps {
  auction: {
    id: number;
    period: string;
    auctionAmount: string;
    bidsAmount: any;
    paymentDate: string;
    status: string;
  };
  onBack: () => void;
  onCreateAgreement?: () => void;
}

export default function AuctionAwaitingDecisionView({ auction, onBack, onCreateAgreement }: AuctionAwaitingDecisionViewProps) {
  const formatPeriodForTitle = (period: string) => {
    // Convert "11.09.2025 12:20 - 16.09.2025 12:20" to "11 сентября 12:20 – 16 сентября 12:20"
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
    return dateStr;
  };

  const handleCreateAgreement = () => {
    onCreateAgreement?.();
  };

  const handleSupplierRating = () => {
    // TODO: Implement navigation to supplier rating
    console.log('Viewing supplier rating for auction:', auction.id);
  };

  const handleParticipantsClick = () => {
    // TODO: Implement navigation to participants view
    console.log('Viewing participants for auction:', auction.id);
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

      <DecisionSection>
        <CalendarIconWrapper>
          <CalendarIcon style={{ width: '48px', height: '48px', color: 'hsl(0 0% 45%)' }} />
        </CalendarIconWrapper>
        <DecisionTitle>Аукцион завершился. Примите решение до 11 сентября</DecisionTitle>
        <DecisionSubtext>
          Создайте соглашения на основе предложений поставщиков
        </DecisionSubtext>
        <CreateAgreementButton 
          data-testid="button-create-agreement"
          size="m"
          onClick={handleCreateAgreement}
        >
          Создать соглашение
        </CreateAgreementButton>
      </DecisionSection>

      <Section>
        <SectionTitle>
          Предложения поставщиков
          <RatingButton 
            data-testid="button-supplier-rating"
            size="s"
            onClick={handleSupplierRating}
          >
            Рейтинг по поставщикам
          </RatingButton>
        </SectionTitle>
        <OffersGrid>
          <OfferCard $color="red" data-testid="offer-card-red">
            <OfferAmount>2 297 652,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              4 поставки
            </OfferDetails>
          </OfferCard>
          <OfferCard $color="orange" data-testid="offer-card-orange">
            <OfferAmount>4 939 793,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              9 поставок
            </OfferDetails>
          </OfferCard>
          <OfferCard $color="green" data-testid="offer-card-green">
            <OfferAmount>4 130 098,00 ₽</OfferAmount>
            <OfferDetails>
              <DocIcon style={{ width: '14px', height: '14px' }} />
              9 поставок
            </OfferDetails>
          </OfferCard>
        </OffersGrid>
      </Section>

      <AttractivenessSection>
        <AttractivenessBadge>
          Цвет показывает привлекательность предложений поставщиков
        </AttractivenessBadge>
        <AttractivenessChips>
          <AttractivenessChip $color="red">Низкая</AttractivenessChip>
          <AttractivenessChip $color="orange">Средняя</AttractivenessChip>
          <AttractivenessChip $color="green">Высокая</AttractivenessChip>
        </AttractivenessChips>
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
      </AttractivenessSection>

      <InfoSection>
        <InfoTitle>Информация об аукционе</InfoTitle>
        <InfoGrid>
          <InfoRow>
            <InfoLabel>Сумма аукциона</InfoLabel>
            <InfoValue data-testid="auction-amount">695 314,00 ₽</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Дата ранней оплаты</InfoLabel>
            <InfoValue data-testid="early-payment-date">{formatDateForInfo(auction.paymentDate)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Участники аукциона</InfoLabel>
            <ParticipantsLink 
              data-testid="participants-link"
              onClick={handleParticipantsClick}
            >
              22 поставщика
            </ParticipantsLink>
          </InfoRow>
        </InfoGrid>
      </InfoSection>
    </Container>
  );
}