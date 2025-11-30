import { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, Input, CustomTable, Select } from "vienna-ui";
import { GoLeftIcon } from "vienna.icons";
import { YIELD_RATE_OPTIONS } from "./YieldRateSelect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
`;

const InfoItem = styled.div`
  color: hsl(0 0% 45%);
  
  span {
    color: hsl(0 0% 8%);
    font-weight: 500;
  }
`;

const InfoMessage = styled.div`
  background: hsl(0 0% 95%);
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  color: hsl(0 0% 45%);
`;

const FiltersSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  background: hsl(0 0% 98%);
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: hsl(0 0% 45%);
  white-space: nowrap;
`;

const AttractivenessChips = styled.div`
  display: flex;
  gap: 8px;
`;

const AttractivenessChip = styled.button<{ $color: 'red' | 'orange' | 'green'; $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => {
    if (props.$active) {
      switch (props.$color) {
        case 'red': return 'hsl(0 70% 85%)';
        case 'orange': return 'hsl(35 70% 85%)';
        case 'green': return 'hsl(120 70% 85%)';
        default: return 'hsl(0 0% 90%)';
      }
    } else {
      switch (props.$color) {
        case 'red': return 'hsl(0 70% 95%)';
        case 'orange': return 'hsl(35 70% 95%)';
        case 'green': return 'hsl(120 70% 95%)';
        default: return 'hsl(0 0% 98%)';
      }
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
  
  border-color: ${props => {
    switch (props.$color) {
      case 'red': return 'hsl(0 70% 85%)';
      case 'orange': return 'hsl(35 70% 85%)';
      case 'green': return 'hsl(120 70% 85%)';
      default: return 'hsl(0 0% 90%)';
    }
  }};
`;

const RangeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RangeInput = styled(Input)`
  width: 80px;
`;

const RangeSeparator = styled.span`
  color: hsl(0 0% 64%);
`;

const ResetButton = styled(Button)`
  margin-left: auto;
`;

const TableContainer = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
  
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

const TableRow = styled.tr<{ $selected?: boolean }>`
  background: ${props => props.$selected ? 'hsl(35 70% 95%)' : 'white'} !important;
  
  &:hover {
    background: ${props => props.$selected ? 'hsl(35 70% 90%)' : 'hsl(0 0% 98%)'} !important;
  }
`;

const RiskIndicator = styled.span<{ $risk: 'low' | 'medium' | 'high' }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => {
    switch (props.$risk) {
      case 'high': return 'hsl(0 70% 50%)';
      case 'medium': return 'hsl(35 90% 50%)';
      case 'low': return 'hsl(120 70% 50%)';
      default: return 'hsl(0 0% 50%)';
    }
  }};
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

interface AuctionOfferSelectionViewProps {
  auction: {
    id: number;
    period: string;
    auctionAmount: string;
    paymentDate: string;
  };
  onBack: () => void;
  onCreateAgreements?: () => void;
}

export default function AuctionOfferSelectionView({ auction, onBack, onCreateAgreements }: AuctionOfferSelectionViewProps) {
  // Pre-select 5 rows as shown in the screenshot (rows 3, 5, 11, 13, 14)
  const [selectedOffers, setSelectedOffers] = useState<Set<number>>(new Set([3, 5, 11, 13, 14]));
  const [attractivenessFilter, setAttractivenessFilter] = useState<'low' | 'medium' | 'high'>('medium');
  const [rateFrom, setRateFrom] = useState("");
  const [rateTo, setRateTo] = useState("");

  // Extended dataset based on the screenshot with risk indicators
  const offersData = [
    {
      id: 1,
      profitabilityRate: "97,00%",
      discount: "76,32%",
      earlyPaymentAmount: "7 715,00 ₽",
      paymentAmount: "415 275,00 ₽",
      paymentDate: "03.10.2025",
      invoiceDate: "10.09.2025",
      invoiceNumber: "invoice-lwh/179",
      supplier: "ИП Мохов Мох Мохович",
      risk: "high" as const,
      earlyPaymentNumeric: 7715,
      discountNumeric: 316717.68
    },
    {
      id: 2,
      profitabilityRate: "99,00%",
      discount: "13,91%",
      earlyPaymentAmount: "4 327,00 ₽",
      paymentAmount: "807 195,00 ₽",
      paymentDate: "01.10.2025",
      invoiceDate: "11.09.2025",
      invoiceNumber: "invoice-uo0/262",
      supplier: "ИП Мохов Мох Мохович",
      risk: "high" as const,
      earlyPaymentNumeric: 4327,
      discountNumeric: 112280.44
    },
    {
      id: 3,
      profitabilityRate: "92,00%",
      discount: "79,15%",
      earlyPaymentAmount: "7 207,00 ₽",
      paymentAmount: "276 483,00 ₽",
      paymentDate: "05.10.2025",
      invoiceDate: "14.09.2025",
      invoiceNumber: "invoice-7uy/617",
      supplier: "ПАО Мохское общество",
      risk: "high" as const,
      earlyPaymentNumeric: 7207,
      discountNumeric: 218834.55
    },
    {
      id: 4,
      profitabilityRate: "56,00%",
      discount: "44,76%",
      earlyPaymentAmount: "3 214,00 ₽",
      paymentAmount: "356 656,00 ₽",
      paymentDate: "01.10.2025",
      invoiceDate: "11.09.2025",
      invoiceNumber: "invoice-e13/959",
      supplier: "АО Тестовая компания",
      risk: "low" as const,
      earlyPaymentNumeric: 3214,
      discountNumeric: 159659.81
    },
    {
      id: 5,
      profitabilityRate: "95,00%",
      discount: "17,33%",
      earlyPaymentAmount: "8 300,00 ₽",
      paymentAmount: "315 739,00 ₽",
      paymentDate: "07.10.2025",
      invoiceDate: "16.09.2025",
      invoiceNumber: "invoice-ry1/630",
      supplier: "АО Тестовая компания",
      risk: "high" as const,
      earlyPaymentNumeric: 8300,
      discountNumeric: 54738.69
    },
    {
      id: 6,
      profitabilityRate: "95,00%",
      discount: "51,24%",
      earlyPaymentAmount: "4 734,00 ₽",
      paymentAmount: "435 105,00 ₽",
      paymentDate: "01.10.2025",
      invoiceDate: "16.09.2025",
      invoiceNumber: "invoice-uic/625",
      supplier: "ООО Тестовые данные",
      risk: "high" as const,
      earlyPaymentNumeric: 4734,
      discountNumeric: 222918.82
    },
    {
      id: 7,
      profitabilityRate: "73,00%",
      discount: "98,11%",
      earlyPaymentAmount: "6 264,00 ₽",
      paymentAmount: "491 613,00 ₽",
      paymentDate: "03.10.2025",
      invoiceDate: "15.09.2025",
      invoiceNumber: "invoice-2m3/764",
      supplier: "ООО Тестовые данные",
      risk: "medium" as const,
      earlyPaymentNumeric: 6264,
      discountNumeric: 482129.46
    },
    {
      id: 8,
      profitabilityRate: "77,00%",
      discount: "97,86%",
      earlyPaymentAmount: "1 813,00 ₽",
      paymentAmount: "741 871,00 ₽",
      paymentDate: "07.10.2025",
      invoiceDate: "10.09.2025",
      invoiceNumber: "invoice-nv/633",
      supplier: "ООО Тестовые данные",
      risk: "medium" as const,
      earlyPaymentNumeric: 1813,
      discountNumeric: 725989.31
    },
    {
      id: 9,
      profitabilityRate: "76,00%",
      discount: "62,40%",
      earlyPaymentAmount: "2 029,00 ₽",
      paymentAmount: "290 161,00 ₽",
      paymentDate: "03.10.2025",
      invoiceDate: "12.09.2025",
      invoiceNumber: "invoice-5b2/480",
      supplier: "ООО Тестовые данные",
      risk: "medium" as const,
      earlyPaymentNumeric: 2029,
      discountNumeric: 181000.42
    },
    {
      id: 10,
      profitabilityRate: "30,00%",
      discount: "46,98%",
      earlyPaymentAmount: "7 038,00 ₽",
      paymentAmount: "786 356,00 ₽",
      paymentDate: "30.09.2025",
      invoiceDate: "13.09.2025",
      invoiceNumber: "invoice-aux/311",
      supplier: "ИП Мохов Мох Мохович",
      risk: "low" as const,
      earlyPaymentNumeric: 7038,
      discountNumeric: 369460.69
    },
    {
      id: 11,
      profitabilityRate: "78,00%",
      discount: "19,32%",
      earlyPaymentAmount: "1 827,00 ₽",
      paymentAmount: "443 357,00 ₽",
      paymentDate: "05.10.2025",
      invoiceDate: "14.09.2025",
      invoiceNumber: "invoice-t17/288",
      supplier: "ИП Мохов Мох Мохович",
      risk: "medium" as const,
      earlyPaymentNumeric: 1827,
      discountNumeric: 85616.54
    },
    {
      id: 12,
      profitabilityRate: "95,00%",
      discount: "32,02%",
      earlyPaymentAmount: "6 652,00 ₽",
      paymentAmount: "593 577,00 ₽",
      paymentDate: "30.09.2025",
      invoiceDate: "14.09.2025",
      invoiceNumber: "invoice-zat/544",
      supplier: "ПАО Мохское общество",
      risk: "high" as const,
      earlyPaymentNumeric: 6652,
      discountNumeric: 190036.85
    },
    {
      id: 13,
      profitabilityRate: "64,00%",
      discount: "85,80%",
      earlyPaymentAmount: "2 251,00 ₽",
      paymentAmount: "370 311,00 ₽",
      paymentDate: "02.10.2025",
      invoiceDate: "15.09.2025",
      invoiceNumber: "invoice-31s/194",
      supplier: "ПАО Мохское общество",
      risk: "medium" as const,
      earlyPaymentNumeric: 2251,
      discountNumeric: 317626.64
    },
    {
      id: 14,
      profitabilityRate: "64,00%",
      discount: "57,62%",
      earlyPaymentAmount: "4 995,00 ₽",
      paymentAmount: "448 734,00 ₽",
      paymentDate: "01.10.2025",
      invoiceDate: "10.09.2025",
      invoiceNumber: "invoice-z5j/969",
      supplier: "ПАО Мохское общество",
      risk: "medium" as const,
      earlyPaymentNumeric: 4995,
      discountNumeric: 258541.91
    },
    {
      id: 15,
      profitabilityRate: "77,00%",
      discount: "72,39%",
      earlyPaymentAmount: "4 244,00 ₽",
      paymentAmount: "169 086,00 ₽",
      paymentDate: "03.10.2025",
      invoiceDate: "12.09.2025",
      invoiceNumber: "invoice-po4/995",
      supplier: "АО Тестовая компания",
      risk: "medium" as const,
      earlyPaymentNumeric: 4244,
      discountNumeric: 122431.45
    },
    {
      id: 16,
      profitabilityRate: "66,00%",
      discount: "36,95%",
      earlyPaymentAmount: "3 819,00 ₽",
      paymentAmount: "510 477,00 ₽",
      paymentDate: "02.10.2025",
      invoiceDate: "11.09.2025",
      invoiceNumber: "invoice-ghc/256",
      supplier: "ООО Тестовые данные",
      risk: "medium" as const,
      earlyPaymentNumeric: 3819,
      discountNumeric: 188621.24
    }
  ];

  const handleOfferSelect = (offerId: number, checked: boolean) => {
    const newSelectedOffers = new Set(selectedOffers);
    if (checked) {
      newSelectedOffers.add(offerId);
    } else {
      newSelectedOffers.delete(offerId);
    }
    setSelectedOffers(newSelectedOffers);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allOfferIds = offersData.map(offer => offer.id);
      setSelectedOffers(new Set(allOfferIds));
    } else {
      setSelectedOffers(new Set());
    }
  };

  const handleAttractivenessFilter = (filter: 'low' | 'medium' | 'high') => {
    setAttractivenessFilter(filter);
  };

  const handleResetFilters = () => {
    setAttractivenessFilter('medium');
    setRateFrom("");
    setRateTo("");
  };

  // Calculate summary values for selected offers
  const calculateSummary = () => {
    const selectedOffersData = offersData.filter(offer => selectedOffers.has(offer.id));
    const totalEarlyPayment = selectedOffersData.reduce((sum, offer) => sum + offer.earlyPaymentNumeric, 0);
    const totalDiscount = selectedOffersData.reduce((sum, offer) => sum + offer.discountNumeric, 0);
    
    return {
      count: selectedOffers.size,
      totalEarlyPayment: totalEarlyPayment.toLocaleString('ru-RU'),
      totalDiscount: Math.round(totalDiscount).toLocaleString('ru-RU')
    };
  };

  const handleCreateAgreements = () => {
    if (onCreateAgreements) {
      onCreateAgreements();
    }
  };

  const summary = calculateSummary();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton onClick={onBack} data-testid="button-back-to-auction">
            <GoLeftIcon style={{ width: '16px', height: '16px' }} />
            К аукциону
          </BackButton>
          <Title data-testid="offer-selection-title">Выбор предложений</Title>
        </HeaderLeft>
        <HeaderRight>
          <InfoItem>
            Дата ранней оплаты <span data-testid="early-payment-date">12.09.2025</span>
          </InfoItem>
          <InfoItem>
            Сумма аукциона <span data-testid="auction-amount">695 314,00 ₽</span>
          </InfoItem>
        </HeaderRight>
      </Header>

      <InfoMessage data-testid="info-message">
        Создать соглашения из аукциона можно один раз, после создания аукцион будет закрыт
      </InfoMessage>

      <FiltersSection>
        <FilterGroup>
          <FilterLabel>Ставка доходности</FilterLabel>
          <AttractivenessChips>
            <AttractivenessChip
              $color="red"
              $active={attractivenessFilter === 'low'}
              onClick={() => handleAttractivenessFilter('low')}
              data-testid="chip-low-attractiveness"
            >
              Низкая
            </AttractivenessChip>
            <AttractivenessChip
              $color="orange"
              $active={attractivenessFilter === 'medium'}
              onClick={() => handleAttractivenessFilter('medium')}
              data-testid="chip-medium-attractiveness"
            >
              Средняя
            </AttractivenessChip>
            <AttractivenessChip
              $color="green"
              $active={attractivenessFilter === 'high'}
              onClick={() => handleAttractivenessFilter('high')}
              data-testid="chip-high-attractiveness"
            >
              Высокая
            </AttractivenessChip>
          </AttractivenessChips>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Ставка доходности</FilterLabel>
          <RangeInputs>
            <Select
              value={rateFrom}
              onSelect={(e: any, data?: { value?: string }) => data?.value && setRateFrom(data.value)}
              placeholder="От"
              data-testid="input-rate-from"
              style={{ width: '100px' }}
            >
              {YIELD_RATE_OPTIONS.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            <RangeSeparator>—</RangeSeparator>
            <Select
              value={rateTo}
              onSelect={(e: any, data?: { value?: string }) => data?.value && setRateTo(data.value)}
              placeholder="До"
              data-testid="input-rate-to"
              style={{ width: '100px' }}
            >
              {YIELD_RATE_OPTIONS.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </RangeInputs>
        </FilterGroup>

        <ResetButton
          design="outline"
          size="s"
          onClick={handleResetFilters}
          data-testid="button-reset-filters"
        >
          Сбросить
        </ResetButton>
      </FiltersSection>

      <TableContainer>
        <CustomTable>
          <CustomTable.Head>
            <CustomTable.Row>
              <CustomTable.Data>
                <Checkbox
                  checked={selectedOffers.size === offersData.length && offersData.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  data-testid="checkbox-select-all"
                />
              </CustomTable.Data>
              <CustomTable.Header>Ставка доходности</CustomTable.Header>
              <CustomTable.Header>Скидка</CustomTable.Header>
              <CustomTable.Header>Сумма ранней оплаты</CustomTable.Header>
              <CustomTable.Header>Сумма оплаты</CustomTable.Header>
              <CustomTable.Header>Дата оплаты</CustomTable.Header>
              <CustomTable.Header>Дата счета</CustomTable.Header>
              <CustomTable.Header>№ счета</CustomTable.Header>
              <CustomTable.Header>Поставщик</CustomTable.Header>
            </CustomTable.Row>
          </CustomTable.Head>
          <CustomTable.Body>
            {offersData.map((offer) => (
              <TableRow key={offer.id} $selected={selectedOffers.has(offer.id)} data-testid={`offer-row-${offer.id}`}>
                <CustomTable.Data>
                  <Checkbox
                    checked={selectedOffers.has(offer.id)}
                    onChange={(e) => handleOfferSelect(offer.id, e.target.checked)}
                    data-testid={`checkbox-offer-${offer.id}`}
                  />
                </CustomTable.Data>
                <CustomTable.Data data-testid={`profitability-rate-${offer.id}`}>
                  <RiskIndicator $risk={offer.risk} />
                  {offer.profitabilityRate}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`discount-${offer.id}`}>
                  {offer.discount}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`early-payment-amount-${offer.id}`}>
                  {offer.earlyPaymentAmount}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`payment-amount-${offer.id}`}>
                  {offer.paymentAmount}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`payment-date-${offer.id}`}>
                  {offer.paymentDate}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`invoice-date-${offer.id}`}>
                  {offer.invoiceDate}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`invoice-number-${offer.id}`}>
                  {offer.invoiceNumber}
                </CustomTable.Data>
                <CustomTable.Data data-testid={`supplier-${offer.id}`}>
                  {offer.supplier}
                </CustomTable.Data>
              </TableRow>
            ))}
          </CustomTable.Body>
        </CustomTable>
      </TableContainer>

      {selectedOffers.size > 0 && (
        <SummaryPanel data-testid="summary-panel">
          <SummaryInfo>
            <SummaryItem data-testid="selected-count">
              Количество: <span>{summary.count}</span>
            </SummaryItem>
            <SummaryItem data-testid="total-early-payment">
              Ранняя оплата: <span>{summary.totalEarlyPayment} ₽</span>
            </SummaryItem>
            <SummaryItem data-testid="total-discount">
              Скидка: <span>{summary.totalDiscount} ₽</span>
            </SummaryItem>
          </SummaryInfo>
          <CreateAgreementsButton
            onClick={handleCreateAgreements}
            data-testid="button-create-agreements"
          >
            Сформировать соглашения
          </CreateAgreementsButton>
        </SummaryPanel>
      )}
    </Container>
  );
}