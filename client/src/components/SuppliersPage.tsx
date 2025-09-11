import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";

//todo: remove mock functionality
const suppliersData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    inn: "770022110266",
    discountRate: "—",
    status: "Активный"
  },
  {
    supplier: "ООО Тестовые данные",
    inn: "880021133",
    discountRate: "—",
    status: "Зарегистрирован"
  },
  {
    supplier: "АО Тестовая компания",
    inn: "7724673222",
    discountRate: "3,00 %",
    status: "Отклонен"
  },
  {
    supplier: "ПАО Москвов общество",
    inn: "7891363236",
    discountRate: "2,00 %",
    status: "Отклонен"
  },
  {
    supplier: "ИП Москв Мос Москвич",
    inn: "98002211952З",
    discountRate: "8,00 %",
    status: "Не активный"
  },
  {
    supplier: "ОАО Неcуществующая компания",
    inn: "1234221122",
    discountRate: "6,00 %",
    status: "Зарегистрирован",
    warning: true
  }
];

const columns = [
  { key: 'supplier', header: 'Поставщик' },
  { key: 'inn', header: 'ИНН' },
  { key: 'discountRate', header: 'Ставка дисконта' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string, row: any) => (
      <div className="flex items-center gap-2">
        <StatusBadge status={value} />
        {row.warning && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
      </div>
    )
  },
];

export default function SuppliersPage() {
  return (
    <DataTable
      title="Поставщики"
      columns={columns}
      data={suppliersData}
      onRowSelect={(rows) => console.log('Selected suppliers:', rows)}
      actions={
        <Button data-testid="button-add-supplier">
          <Plus className="w-4 h-4 mr-2" />
          Добавить поставщика
        </Button>
      }
      showFilters={false}
    />
  );
}