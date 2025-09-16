import styled from "styled-components";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

// ViennaUI-styled badge
const StyledBadge = styled.span<{ $statusType: string }>`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  
  ${props => {
    const status = props.$statusType.toLowerCase();
    
    if (status.includes("активный") || status.includes("в процессе")) {
      return `
        background-color: hsl(120, 60%, 90%);
        color: hsl(120, 60%, 25%);
        border: 1px solid hsl(120, 60%, 80%);
      `;
    }
    
    if (status.includes("отклонен") || status.includes("заблокирован")) {
      return `
        background-color: hsl(0, 60%, 90%);
        color: hsl(0, 60%, 25%);
        border: 1px solid hsl(0, 60%, 80%);
      `;
    }
    
    if (status.includes("ждет") || status.includes("отправлено")) {
      return `
        background-color: hsl(45, 60%, 90%);
        color: hsl(45, 60%, 25%);
        border: 1px solid hsl(45, 60%, 80%);
      `;
    }
    
    if (status.includes("зарегистрирован") || status.includes("приглашение")) {
      return `
        background-color: hsl(210, 60%, 90%);
        color: hsl(210, 60%, 25%);
        border: 1px solid hsl(210, 60%, 80%);
      `;
    }
    
    return `
      background-color: hsl(0, 0%, 90%);
      color: hsl(0, 0%, 45%);
      border: 1px solid hsl(0, 0%, 80%);
    `;
  }}
`;

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  return (
    <StyledBadge 
      $statusType={status}
      data-testid={`badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {status}
    </StyledBadge>
  );
}