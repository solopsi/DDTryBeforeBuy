import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";

//todo: remove mock functionality
const agreementsData = [
  {
    agreementDate: "29.08.2025",
    supplier: "ИП Тестов Тест Тестович",
    earlyPayment: "274 013,00 ₽",
    discount: "7 491,00 ₽",
    paymentDate: "28.08.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "01.09.2025",
    supplier: "ИП Тестов Тест Тестович",
    earlyPayment: "122 639,00 ₽",
    discount: "9 939,00 ₽",
    paymentDate: "31.08.2025",
    status: "Ждет вашей подписи"
  },
  {
    agreementDate: "01.09.2025",
    supplier: "ООО Тестовые данные",
    earlyPayment: "964 252,00 ₽",
    discount: "4 661,00 ₽",
    paymentDate: "31.08.2025",
    status: "Ждет вашей подписи"
  }
];

const columns = [
  { key: 'agreementDate', header: 'Дата соглашения' },
  { key: 'supplier', header: 'Поставщик' },
  { key: 'earlyPayment', header: 'Сумма ранней оплаты' },
  { key: 'discount', header: 'Сумма скидки' },
  { key: 'paymentDate', header: 'Дата ранней оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function AgreementsPage() {
  return (
    <DataTable
      title="Соглашения"
      columns={columns}
      data={agreementsData}
      onRowSelect={(rows) => console.log('Selected agreements:', rows)}
    />
  );
}