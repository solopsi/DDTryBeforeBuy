import { useState, useMemo } from "react";
import styled from "styled-components";
import { Drawer } from "vienna-ui";
import { Button, Input, Checkbox } from "vienna-ui";
import { SearchIcon } from "vienna.icons";

interface Supplier {
  id: number;
  name: string;
  deliveryCount: number;
  totalAmount: number;
}

interface SupplierSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedSuppliers: number[]) => void;
}

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
`;

const DrawerHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid hsl(0 0% 90%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0;
`;

const ResetLink = styled.button`
  background: none;
  border: none;
  color: hsl(219 95% 53%);
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: hsl(219 95% 43%);
  }
`;


const DrawerBody = styled.div`
  flex: 1;
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchSection = styled.div`
  position: relative;
`;

const SearchInputContainer = styled.div`
  position: relative;
  
  .vienna-input {
    padding-left: 40px;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(0 0% 64%);
  z-index: 2;
  pointer-events: none;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterCheckbox = styled.div`
  .vienna-checkbox {
    accent-color: hsl(45 100% 50%);
  }
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: hsl(0 0% 8%);
  cursor: pointer;
`;

const SuppliersList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SupplierItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  
  &:hover {
    background: hsl(0 0% 98%);
  }
`;

const SupplierCheckbox = styled.div`
  margin-top: 2px;
  
  .vienna-checkbox input[type="checkbox"]:checked {
    background-color: hsl(45 100% 50%);
    border-color: hsl(45 100% 50%);
  }
  
  .vienna-checkbox input[type="checkbox"]:checked::after {
    background-color: hsl(45 100% 50%);
  }
`;

const SupplierInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SupplierName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  line-height: 1.3;
`;

const SupplierDetails = styled.div`
  font-size: 12px;
  color: hsl(0 0% 64%);
  line-height: 1.3;
`;

const DrawerFooter = styled.div`
  padding: 24px;
  border-top: 1px solid hsl(0 0% 90%);
  display: flex;
  gap: 12px;
`;

const SaveButton = styled(Button)`
  background-color: hsl(45 100% 50%) !important;
  border-color: hsl(45 100% 50%) !important;
  color: hsl(0 0% 8%) !important;
  flex: 1;
  
  &:hover {
    background-color: hsl(45 100% 45%) !important;
    border-color: hsl(45 100% 45%) !important;
  }
`;

const CancelButton = styled(Button)`
  flex: 1;
`;

// Mock данные поставщиков из скриншота
const mockSuppliers: Supplier[] = [
  { id: 1, name: "ИП Тестов Тест Тестович", deliveryCount: 435, totalAmount: 785986529 },
  { id: 2, name: "ООО Тестовые данные", deliveryCount: 0, totalAmount: 0 },
  { id: 3, name: "АО Тестовая компания", deliveryCount: 257, totalAmount: 252379881 },
  { id: 4, name: "ПАО Моховое общество", deliveryCount: 0, totalAmount: 0 },
  { id: 5, name: "ИП Мохов Мох Мохович", deliveryCount: 0, totalAmount: 0 },
  { id: 6, name: "ОАО Несуществующая компания", deliveryCount: 0, totalAmount: 0 },
  { id: 7, name: "ООО Моховый концерн", deliveryCount: 0, totalAmount: 0 },
  { id: 8, name: "ПАО Моховая группа предприятий", deliveryCount: 676, totalAmount: 552130231 },
  { id: 9, name: "ИП Счастливое Счастье Вчерашнее", deliveryCount: 0, totalAmount: 0 },
  { id: 10, name: "АО Кредиторский Кредитор", deliveryCount: 982, totalAmount: 495450170 },
  { id: 11, name: "ООО Клиентский кредитор", deliveryCount: 546, totalAmount: 860125236 },
  { id: 12, name: "ИП Кредиторов Кредитор Кредиторович", deliveryCount: 0, totalAmount: 0 },
  { id: 13, name: "ПАО Кредитная моховая организация", deliveryCount: 316, totalAmount: -474128433 },
  { id: 14, name: "ООО Иностранная тестовая компания", deliveryCount: 700, totalAmount: 863199238 },
  { id: 15, name: "АО Жаркое лето", deliveryCount: 263, totalAmount: 705032951 }
];

export default function SupplierSelectionDrawer({ 
  isOpen, 
  onClose, 
  onSave 
}: SupplierSelectionDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>(
    // По умолчанию все поставщики выбраны
    mockSuppliers.map(supplier => supplier.id)
  );
  const [onlyProblematicSuppliers, setOnlyProblematicSuppliers] = useState(false);

  // Фильтрация поставщиков по поисковому запросу
  const filteredSuppliers = useMemo(() => {
    return mockSuppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Форматирование суммы с разделителями тысяч
  const formatAmount = (amount: number): string => {
    if (amount === 0) return "0,00 ₽";
    
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    
    const formatted = new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absAmount);
    
    return `${isNegative ? '-' : ''}${formatted.replace('.', ',')} ₽`;
  };

  const handleSupplierToggle = (supplierId: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSuppliers(mockSuppliers.map(supplier => supplier.id));
  };

  const handleDeselectAll = () => {
    setSelectedSuppliers([]);
  };

  const handleSave = () => {
    onSave(selectedSuppliers);
  };

  const selectedCount = selectedSuppliers.length;
  const totalCount = mockSuppliers.length;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      data-testid="supplier-selection-drawer"
    >
      <DrawerContent>
        <DrawerHeader>
          <HeaderLeft>
            <HeaderTitle>Участники аукциона {totalCount}</HeaderTitle>
            <ResetLink 
              onClick={handleDeselectAll}
              data-testid="button-reset-all"
            >
              Сбросить всех ({totalCount})
            </ResetLink>
          </HeaderLeft>
        </DrawerHeader>

        <DrawerBody>
          <SearchSection>
            <SearchInputContainer>
              <SearchIconWrapper>
                <SearchIcon style={{ width: '16px', height: '16px' }} />
              </SearchIconWrapper>
              <Input
                placeholder="Поиск участника"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-supplier"
              />
            </SearchInputContainer>
          </SearchSection>

          <FilterSection>
            <FilterCheckbox>
              <Checkbox
                checked={onlyProblematicSuppliers}
                onChange={(e) => setOnlyProblematicSuppliers(e.target.checked)}
                data-testid="checkbox-problematic-suppliers"
              />
            </FilterCheckbox>
            <FilterLabel>
              Только поставщики с заблуженными поставками
            </FilterLabel>
          </FilterSection>

          <SuppliersList>
            {filteredSuppliers.map(supplier => (
              <SupplierItem key={supplier.id} data-testid={`supplier-item-${supplier.id}`}>
                <SupplierCheckbox>
                  <Checkbox
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => handleSupplierToggle(supplier.id)}
                    data-testid={`checkbox-supplier-${supplier.id}`}
                  />
                </SupplierCheckbox>
                <SupplierInfo>
                  <SupplierName>{supplier.name}</SupplierName>
                  <SupplierDetails>
                    Количество поставок: {supplier.deliveryCount} | Сумма общая: {formatAmount(supplier.totalAmount)}
                  </SupplierDetails>
                </SupplierInfo>
              </SupplierItem>
            ))}
          </SuppliersList>
        </DrawerBody>

        <DrawerFooter>
          <SaveButton 
            onClick={handleSave}
            data-testid="button-save-suppliers"
          >
            Сохранить
          </SaveButton>
          <CancelButton 
            design="outline"
            onClick={onClose}
            data-testid="button-cancel-suppliers"
          >
            Отмена
          </CancelButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}