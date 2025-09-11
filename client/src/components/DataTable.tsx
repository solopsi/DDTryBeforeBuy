import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Calendar
} from "lucide-react";
import StatusBadge from "./StatusBadge";

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
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
              data-testid="input-search"
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-48" data-testid="select-supplier">
              <SelectValue placeholder="Все поставщики" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все поставщики</SelectItem>
              {/* //todo: remove mock functionality */}
              <SelectItem value="test">ИП Тестов</SelectItem>
              <SelectItem value="moscow">АО Тестовая компания</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
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

          <Button variant="outline" size="sm" data-testid="button-clear-filters">
            Сбросить
          </Button>
        </div>
      )}

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedRows.size === data.length && data.length > 0}
                    onCheckedChange={handleSelectAll}
                    data-testid="checkbox-select-all"
                  />
                </th>
                {columns.map((column) => (
                  <th key={column.key} className="p-4 text-left font-medium">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => {
                const originalIndex = startIndex + index;
                return (
                  <tr 
                    key={originalIndex} 
                    className="border-b hover:bg-muted/50 transition-colors"
                    data-testid={`row-item-${originalIndex}`}
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedRows.has(originalIndex)}
                        onCheckedChange={(checked) => handleRowSelect(originalIndex, !!checked)}
                        data-testid={`checkbox-row-${originalIndex}`}
                      />
                    </td>
                    {columns.map((column) => (
                      <td key={column.key} className="p-4">
                        {column.render ? 
                          column.render(row[column.key], row) : 
                          String(row[column.key])
                        }
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRows.size > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <Search className="w-4 h-4" />
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
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  data-testid={`button-page-${page}`}
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="button-next-page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}