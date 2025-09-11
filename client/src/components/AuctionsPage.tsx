import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

//todo: remove mock functionality
const auctionsData = [
  {
    period: "28.08.2025 13:16 - 29.08.2025 13:16",
    auctionAmount: "481 425,00 ₽",
    bidsAmount: "721 826,00 ₽",
    paymentDate: "28.08.2025",
    status: "В процессе"
  },
  {
    period: "02.09.2025 13:16 - 29.08.2025 13:16",
    auctionAmount: "674 236,00 ₽",
    bidsAmount: "871 885,00 ₽",
    paymentDate: "27.08.2025",
    status: "В процессе"
  },
  {
    period: "30.08.2025 13:16 - 02.09.2025 13:16",
    auctionAmount: "401 250,00 ₽",
    bidsAmount: "—",
    paymentDate: "01.09.2025",
    status: "Запланирован"
  },
  {
    period: "01.09.2025 13:16 - 30.08.2025 13:16",
    auctionAmount: "240 110,00 ₽",
    bidsAmount: "—",
    paymentDate: "28.08.2025",
    status: "Запланирован"
  }
];

const columns = [
  { key: 'period', header: 'Период проведения' },
  { key: 'auctionAmount', header: 'Сумма аукциона' },
  { key: 'bidsAmount', header: 'Сумма ставок' },
  { key: 'paymentDate', header: 'Дата ранней оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function AuctionsPage() {
  return (
    <DataTable
      title="Аукционы"
      columns={columns}
      data={auctionsData}
      onRowSelect={(rows) => console.log('Selected auctions:', rows)}
      actions={
        <Button data-testid="button-create-auction">
          <Plus className="w-4 h-4 mr-2" />
          Создать
        </Button>
      }
      showFilters={false}
    />
  );
}