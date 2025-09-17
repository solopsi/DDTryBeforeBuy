import styled from "styled-components";

interface BidsBreakdown {
  green: string;
  yellow: string;
  red: string;
  total: string;
}

interface ColoredBidsAmountProps {
  breakdown: BidsBreakdown;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TotalAmount = styled.div`
  font-weight: 500;
  color: hsl(0 0% 8%);
`;

const BreakdownContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
`;

const AmountBadge = styled.span<{ $color: 'green' | 'yellow' | 'red' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${({ $color }) => {
    switch ($color) {
      case 'green':
        return `
          background: hsl(142 76% 36% / 0.1);
          color: hsl(142 76% 36%);
          border: 1px solid hsl(142 76% 36% / 0.2);
        `;
      case 'yellow':
        return `
          background: hsl(45 100% 50% / 0.1);
          color: hsl(45 100% 35%);
          border: 1px solid hsl(45 100% 50% / 0.3);
        `;
      case 'red':
        return `
          background: hsl(0 84% 60% / 0.1);
          color: hsl(0 84% 60%);
          border: 1px solid hsl(0 84% 60% / 0.2);
        `;
    }
  }}
`;

export default function ColoredBidsAmount({ breakdown }: ColoredBidsAmountProps) {
  return (
    <Container data-testid="colored-bids-amount">
      <TotalAmount data-testid="total-bids-amount">{breakdown.total}</TotalAmount>
      <BreakdownContainer>
        <AmountBadge $color="green" data-testid="green-amount">
          {breakdown.green}
        </AmountBadge>
        <AmountBadge $color="yellow" data-testid="yellow-amount">
          {breakdown.yellow}
        </AmountBadge>
        <AmountBadge $color="red" data-testid="red-amount">
          {breakdown.red}
        </AmountBadge>
      </BreakdownContainer>
    </Container>
  );
}