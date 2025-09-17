import { useState } from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import FileUploadModal from "./FileUploadModal";
import { Button } from "vienna-ui/dist/Button";
import { DownloadIcon } from "vienna.icons";

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <DataTable
        title="Поставки"
        columns={columns}
        data={suppliesData}
        onRowSelect={(rows) => console.log('Selected supplies:', rows)}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              design="primary"
              data-testid="button-notify-suppliers"
            >
              Удалить поставки на отправку
            </Button>
            <Button 
              design="outline" 
              onClick={() => setIsUploadModalOpen(true)}
              data-testid="button-load-supplies"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <DownloadIcon style={{ width: '16px', height: '16px' }} />
                Загрузить
              </div>
            </Button>
          </div>
        }
      />
      
      <FileUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}