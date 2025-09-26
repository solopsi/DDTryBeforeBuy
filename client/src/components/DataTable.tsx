import { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, Input, CustomTable, Datepicker, Pagination, Select } from "vienna-ui";
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

const FilterDateInput = styled(Datepicker)`
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
  gap: 16px;
`;

const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: hsl(0 0% 64%);
`;

// ViennaUI table styling
const TableContainer = styled.div`
  border: 1px solid hsl(0 0% 90%);
  border-radius: 8px;
  background: white;
  overflow: hidden;
  
  /* Style ViennaUI CustomTable components */
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
  }
  
  & th {
    font-weight: 500;
    color: hsl(0 0% 45%);
    font-size: 14px;
  }
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
  onRowClick?: (row: any) => void;
  actions?: React.ReactNode;
  showFilters?: boolean;
  showCheckboxes?: boolean;
}

export default function DataTable({ 
  title, 
  columns, 
  data, 
  onRowSelect,
  onRowClick,
  actions,
  showFilters = true,
  showCheckboxes = true 
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(60);
  const [previousDataLength, setPreviousDataLength] = useState(data.length);

  // Reset selected rows when data changes (e.g., items removed)
  useEffect(() => {
    if (data.length !== previousDataLength) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
      setPreviousDataLength(data.length);
    }
  }, [data.length, previousDataLength, onRowSelect]);

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event: any, data?: { value?: number }) => {
    if (data?.value) {
      setItemsPerPage(data.value);
      setCurrentPage(1);
    }
  };

  const handlePaginationChange = (event: any, data: { pageIndex: number; pageSize: number }) => {
    setCurrentPage(data.pageIndex + 1); // ViennaUI uses 0-based pageIndex
  };

  const filteredData = data.filter(row => {
    // Search filter
    const matchesSearch = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Status filter
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {actions}
      </Header>


      <TableContainer>
        <CustomTable>
          <CustomTable.Head>
            <CustomTable.Row>
              {showCheckboxes && (
                <CustomTable.Data>
                  <Checkbox
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    data-testid="checkbox-select-all"
                  />
                </CustomTable.Data>
              )}
              {columns.map((column) => (
                <CustomTable.Header key={column.key}>
                  {column.header}
                </CustomTable.Header>
              ))}
            </CustomTable.Row>
          </CustomTable.Head>
          <CustomTable.Body>
            {paginatedData.map((row, index) => {
              const originalIndex = startIndex + index;
              return (
                <CustomTable.Row
                  key={originalIndex}
                  data-testid={`row-item-${originalIndex}`}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {showCheckboxes && (
                    <CustomTable.Data>
                      <Checkbox
                        checked={selectedRows.has(originalIndex)}
                        onChange={(e) => handleRowSelect(originalIndex, e.target.checked)}
                        data-testid={`checkbox-row-${originalIndex}`}
                      />
                    </CustomTable.Data>
                  )}
                  {columns.map((column) => (
                    <CustomTable.Data key={column.key}>
                      {column.render ? 
                        column.render(row[column.key], row) : 
                        String(row[column.key])
                      }
                    </CustomTable.Data>
                  ))}
                </CustomTable.Row>
              );
            })}
          </CustomTable.Body>
        </CustomTable>
      </TableContainer>


      <Footer>
        <FooterText>
          Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} из {filteredData.length} записей
        </FooterText>
        
        <PaginationGroup>
          <PageSizeSelector>
            <span>Показывать по:</span>
            <Select
              value={itemsPerPage}
              onSelect={handlePageSizeChange}
              data-testid="select-page-size"
            >
              <Select.Option value={60}>60</Select.Option>
              <Select.Option value={120}>120</Select.Option>
              <Select.Option value={240}>240</Select.Option>
            </Select>
          </PageSizeSelector>
          
          <Pagination
            pageSize={itemsPerPage}
            totalItemsCount={filteredData.length}
            currentPage={currentPage - 1}
            onChange={handlePaginationChange}
            data-testid="pagination"
          />
        </PaginationGroup>
      </Footer>
    </Container>
  );
}