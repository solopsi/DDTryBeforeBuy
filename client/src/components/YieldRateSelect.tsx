import { Select } from "vienna-ui";
import styled from "styled-components";

const YIELD_RATE_OPTIONS = [
  { value: "19.5", label: "19,5%" },
  { value: "20", label: "20%" },
  { value: "20.5", label: "20,5%" },
  { value: "21", label: "21%" },
];

const StyledSelect = styled(Select)`
  width: 100%;
`;

interface YieldRateSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "data-testid"?: string;
}

export default function YieldRateSelect({ 
  value, 
  onChange, 
  placeholder = "Выберите ставку",
  "data-testid": testId
}: YieldRateSelectProps) {
  const handleSelect = (event: any, data?: { value?: string }) => {
    if (data?.value) {
      onChange(data.value);
    }
  };

  return (
    <StyledSelect
      value={value}
      onSelect={handleSelect}
      placeholder={placeholder}
      data-testid={testId}
    >
      {YIELD_RATE_OPTIONS.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </StyledSelect>
  );
}

export { YIELD_RATE_OPTIONS };
