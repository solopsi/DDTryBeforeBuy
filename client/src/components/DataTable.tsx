import { useState } from "react";
import styled from "styled-components";
import { Button } from "vienna-ui/dist/Button";
import { Checkbox } from "vienna-ui/dist/Checkbox"; 
import { Input } from "vienna-ui/dist/Input";
import StatusBadge from "./StatusBadge";

// Styled icons using text-based alternatives
const SearchIcon = styled.span`
  font-size: 14px;
  color: hsl(0 0% 64%);
`;
const CalendarIcon = styled.span`
  font-size: 14px;
  color: hsl(0 0% 64%);
`;
const ChevronLeftIcon = styled.span`
  font-size: 12px;
  color: hsl(0 0% 64%);
`;
const ChevronRightIcon = styled.span`
  font-size: 12px;
  color: hsl(0 0% 64%);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {actions}
      </div>

      {showFilters && (
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 flex-1">
            <SearchIcon>⌕</SearchIcon>
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
              data-testid="input-search"
            />
          </div>
          
          <select className="w-48 px-3 py-2 border rounded" data-testid="select-supplier">
            <option value="all">Все поставщики</option>
            <option value="test">ИП Тестов</option>
            <option value="moscow">АО Тестовая компания</option>
          </select>

          <div className="flex items-center gap-2">
            <CalendarIcon>◊</CalendarIcon>
            <Input 
              type="date" 
              className="w-32"
              data-testid="input-date-from"
            />
            <span className="text-muted-foreground">—</span>
            <Input 
              type="date" 
              className="w-32"
              data-testid="input-date-to"
            />
          </div>

          <Button design="outline" size="s" data-testid="button-clear-filters">
            Сбросить
          </Button>
        </div>
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
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <SearchIcon>⚙</SearchIcon>
          <span>Настроить перед отправкой</span>
          <span>Количество: {selectedRows.size}</span>
          <span>Оплата: {selectedRows.size * 567420} ₽</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} из {filteredData.length} записей
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            design="outline"
            size="s"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="button-prev-page"
          >
            <ChevronLeftIcon>‹</ChevronLeftIcon>
          </Button>
          
          <div className="flex items-center gap-1">
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
          </div>
          
          <Button
            design="outline"
            size="s"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="button-next-page"
          >
            <ChevronRightIcon>›</ChevronRightIcon>
          </Button>
        </div>
      </div>
    </div>
  );
}