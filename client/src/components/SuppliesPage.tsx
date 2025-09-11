import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

//todo: remove mock functionality
const suppliesData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "—",
    invoiceDate: "28.08.2025",
    invoiceNumber: "invoice-env307",
    paymentDate: "17.09.2025",
    amount: "214 756,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Тестовая компания", 
    discount: "3,00 %",
    invoiceDate: "30.08.2025",
    invoiceNumber: "invoice-vcu103",
    paymentDate: "16.09.2025",
    amount: "817 554,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ПАО Москвов общество",
    discount: "2,00 %", 
    invoiceDate: "29.08.2025",
    invoiceNumber: "invoice-pou533",
    paymentDate: "17.09.2025",
    amount: "998 160,00 ₽",
    status: "Ждет отправки"
  }
];

const columns = [
  { key: 'supplier', header: 'Поставщик' },
  { key: 'discount', header: 'Ставка дисконта' },
  { key: 'invoiceDate', header: 'Дата счета' },
  { key: 'invoiceNumber', header: '№ счета' },
  { key: 'paymentDate', header: 'Дата оплаты' },
  { key: 'amount', header: 'Сумма оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function SuppliesPage() {
  return (
    <DataTable
      title="Поставки"
      columns={columns}
      data={suppliesData}
      onRowSelect={(rows) => console.log('Selected supplies:', rows)}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-load-supplies">
            <Download className="w-4 h-4 mr-2" />
            Загрузить
          </Button>
          <Button data-testid="button-notify-suppliers">
            Уведить поставщиков об отправкой
          </Button>
        </div>
      }
    />
  );
}