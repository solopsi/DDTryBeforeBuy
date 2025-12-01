import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import { Button, Modal, Input } from "vienna-ui";
import { AddIcon } from "vienna.icons";

const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 400px;
`;

const ModalHeader = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const initialUsersData = [
  {
    user: "Первый пользователь",
    email: "user1@supplier.ru",
    status: "Активен"
  },
  {
    user: "—",
    email: "user2@supplier.ru",
    status: "Приглашение отправлено"
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
  const [users, setUsers] = useState(initialUsersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleAddUser = () => {
    if (newUserEmail.trim()) {
      const newUser = {
        user: "—",
        email: newUserEmail.trim(),
        status: "Приглашение отправлено"
      };
      setUsers([...users, newUser]);
      setNewUserEmail("");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setNewUserEmail("");
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable
        title="Пользователи"
        columns={columns}
        data={users}
        onRowSelect={(rows) => console.log('Selected users:', rows)}
        actions={
          <Button 
            data-testid="button-add-user"
            style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Добавить
          </Button>
        }
        showFilters={false}
        showCheckboxes={false}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCancel}
        data-testid="modal-add-user"
      >
        <ModalContent>
          <ModalHeader>Добавить пользователя</ModalHeader>
          <Input
            placeholder="Введите email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            data-testid="input-user-email"
          />
          <ModalActions>
            <Button 
              design="outline" 
              onClick={handleCancel}
              data-testid="button-cancel"
            >
              Отмена
            </Button>
            <Button 
              onClick={handleAddUser}
              style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
              data-testid="button-add-user-confirm"
            >
              Добавить
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </>
  );
}