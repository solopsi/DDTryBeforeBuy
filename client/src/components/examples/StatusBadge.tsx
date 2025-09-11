import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2 flex-wrap">
        <StatusBadge status="Активный" />
        <StatusBadge status="В процессе" />
        <StatusBadge status="Ждет отправки" />
        <StatusBadge status="Отклонен" />
        <StatusBadge status="Зарегистрирован" />
        <StatusBadge status="Заблокирован" />
        <StatusBadge status="Приглашение отправлено" />
      </div>
    </div>
  );
}