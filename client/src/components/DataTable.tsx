import { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, Input } from "vienna-ui";
import StatusBadge from "./StatusBadge";

// ViennaUI Icons
import { CalendarIcon, DocSearchIcon, UpChevronIcon } from "vienna.icons";

// Styled icon wrapper
const IconWrapper = styled.span`
  font-size: 14px;
  color: hsl(0 0% 64%);
  display: inline-flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;
// Layout containers
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: hsl(0 0% 98%);
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const FilterGroupSmall = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSelect = styled.select`
  width: 192px;
  padding: 8px 12px;
  border: 1px solid hsl(0 0% 80%);
  border-radius: 4px;
  font-size: 14px;
`;

const FilterDateInput = styled(Input)`
  width: 128px;
`;

const DateSeparator = styled.span`
  color: hsl(0 0% 64%);
`;

const SelectionBar = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(0 0% 9%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterText = styled.div`
  font-size: 14px;
  color: hsl(0 0% 64%);
`;

const PaginationGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ViennaUI-styled table components
const TableContainer = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const ViennaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: hsl(0 0% 98%);
`;

const TableBody = styled.tbody`
  & tr:hover {
    background: hsl(0 0% 98%);
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid hsl(0 0% 93%);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: hsl(0 0% 45%);
  font-size: 14px;
`;

interface DataTableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: DataTableColumn[];
  data: any[];
  onRowSelect?: (selectedRows: any[]) => void;
  actions?: React.ReactNode;
  showFilters?: boolean;
}

export default function DataTable({ 
  title, 
  columns, 
  data, 
  onRowSelect,
  actions,
  showFilters = true 
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    setSelectedRows(newSelectedRows);
    
    const selectedData = Array.from(newSelectedRows).map(i => data[i]);
    onRowSelect?.(selectedData);
    console.log('Selected rows:', selectedData.length);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = data.map((_, index) => index);
      setSelectedRows(new Set(allIndices));
      onRowSelect?.(data);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {actions}
      </Header>

      {showFilters && (
        <FilterSection>
          <FilterGroup>
            <IconWrapper><DocSearchIcon /></IconWrapper>
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </FilterGroup>
          
          <FilterSelect data-testid="select-supplier">
            <option value="all">Все поставщики</option>
            <option value="test">ИП Тестов</option>
            <option value="moscow">АО Тестовая компания</option>
          </FilterSelect>

          <FilterGroupSmall>
            <IconWrapper><CalendarIcon /></IconWrapper>
            <FilterDateInput 
              type="date" 
              data-testid="input-date-from"
            />
            <DateSeparator>—</DateSeparator>
            <FilterDateInput 
              type="date" 
              data-testid="input-date-to"
            />
          </FilterGroupSmall>

          <Button design="outline" size="s" data-testid="button-clear-filters">
            Сбросить
          </Button>
        </FilterSection>
      )}

      <TableContainer>
        <ViennaTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  data-testid="checkbox-select-all"
                />
              </TableCell>
              {columns.map((column) => (
                <TableHeaderCell key={column.key}>
                  {column.header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              const originalIndex = startIndex + index;
              return (
                <TableRow
                  key={originalIndex}
                  data-testid={`row-item-${originalIndex}`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(originalIndex)}
                      onChange={(e) => handleRowSelect(originalIndex, e.target.checked)}
                      data-testid={`checkbox-row-${originalIndex}`}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? 
                        column.render(row[column.key], row) : 
                        String(row[column.key])
                      }
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </ViennaTable>
      </TableContainer>

      {selectedRows.size > 0 && (
        <SelectionBar>
          <IconWrapper><DocSearchIcon /></IconWrapper>
          <span>Настроить перед отправкой</span>
          <span>Количество: {selectedRows.size}</span>
          <span>Оплата: {selectedRows.size * 567420} ₽</span>
        </SelectionBar>
      )}

      <Footer>
        <FooterText>
          Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} из {filteredData.length} записей
        </FooterText>
        
        <PaginationGroup>
          <Button
            design="outline"
            size="s"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="button-prev-page"
          >
            <IconWrapper><UpChevronIcon style={{ transform: 'rotate(-90deg)' }} /></IconWrapper>
          </Button>
          
          <PageNumbers>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  design={currentPage === page ? "primary" : "outline"}
                  size="s"
                  onClick={() => setCurrentPage(page)}
                  data-testid={`button-page-${page}`}
                >
                  {page}
                </Button>
              );
            })}
          </PageNumbers>
          
          <Button
            design="outline"
            size="s"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="button-next-page"
          >
            <IconWrapper><UpChevronIcon style={{ transform: 'rotate(90deg)' }} /></IconWrapper>
          </Button>
        </PaginationGroup>
      </Footer>
    </Container>
  );
}