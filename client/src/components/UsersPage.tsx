import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button } from "vienna-ui";
import { AddIcon } from "vienna.icons";

//todo: remove mock functionality
const usersData = [
  {
    user: "—",
    email: "d6sj8p@foo.bar",
    status: "Приглашение отправлено"
  },
  {
    user: "Иванов А.А",
    email: "0ezslq@foo.bar", 
    status: "Активный"
  },
  {
    user: "Алексеева А.И.",
    email: "y545j@foo.bar",
    status: "Заблокирован"
  },
  {
    user: "—",
    email: "v8k427@foo.bar",
    status: "Приглашение отправлено"
  },
  {
    user: "—", 
    email: "n0hrr@foo.bar",
    status: "Приглашение отправлено"
  },
  {
    user: "Петров А.А",
    email: "a7ychq@foo.bar",
    status: "Заблокирован"
  },
  {
    user: "Алексеева И.А.",
    email: "iz398m@foo.bar",
    status: "Активный"
  }
];

const columns = [
  { key: 'user', header: 'Пользователь' },
  { key: 'email', header: 'Электронная почта' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function UsersPage() {
  return (
    <DataTable
      title="Пользователи"
      columns={columns}
      data={usersData}
      onRowSelect={(rows) => console.log('Selected users:', rows)}
      actions={
        <Button 
          data-testid="button-add-user"
          style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
        >
          <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Добавить
        </Button>
      }
      showFilters={false}
    />
  );
}