import styled from "styled-components";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button } from "vienna-ui";
import { AddIcon, WarningTrIcon } from "vienna.icons";

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

//todo: remove mock functionality
const suppliersData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    inn: "770022110266",
    discountRate: "—",
    status: "На проверке"
  },
  {
    supplier: "ООО Тестовые данные",
    inn: "880021133",
    discountRate: "—",
    status: "Ждет приглашения"
  },
  {
    supplier: "АО Тестовая компания",
    inn: "7724673222",
    discountRate: "3,00 %",
    status: "Приглашен"
  },
  {
    supplier: "ПАО Москвов общество",
    inn: "7891363236",
    discountRate: "2,00 %",
    status: "Регистрируется"
  },
  {
    supplier: "ИП Москв Мос Москвич",
    inn: "98002211952З",
    discountRate: "8,00 %",
    status: "Активный"
  },
  {
    supplier: "ОАО Неcуществующая компания",
    inn: "1234221122",
    discountRate: "6,00 %",
    status: "Отклонен",
    warning: true
  },
  {
    supplier: "ИП Неактивная компания",
    inn: "9998887766",
    discountRate: "—",
    status: "Неактивен"
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
      <StatusContainer>
        <StatusBadge status={value} />
        {row.warning && <WarningTrIcon style={{ width: '16px', height: '16px', color: 'hsl(45, 100%, 50%)' }} />}
      </StatusContainer>
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
        <Button 
          data-testid="button-add-supplier"
          style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
        >
          <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Добавить поставщика
        </Button>
      }
      showFilters={true}
    />
  );
}