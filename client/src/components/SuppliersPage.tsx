import { useState } from "react";
import styled from "styled-components";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import { Button, Modal, Input, Hint } from "vienna-ui";
import { AddIcon, WarningTrIcon } from "vienna.icons";

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: hsl(0 0% 9%);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid hsl(0 0% 90%);
  padding-top: 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RequiredIndicator = styled.span`
  color: #d32f2f;
  font-size: 12px;
`;

const suppliersData = [
  {
    company: "ООО \"Поставщик 1\"",
    yieldRate: "21%",
    status: "Активен"
  },
  {
    company: "ООО \"Поставщик 2\"",
    yieldRate: "21%",
    status: "Активен"
  },
  {
    company: "ИП \"Поставщиков Поставщик\"",
    yieldRate: "25%",
    status: "Активен"
  },
  {
    company: "ООО \"Поставщик 3\"",
    yieldRate: "21%",
    status: "Приглашение отправлено"
  }
];

const columns = [
  { key: 'company', header: 'Название компании' },
  { key: 'yieldRate', header: 'Ставка доходности' },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [yieldRate, setYieldRate] = useState("");

  const handleSubmit = () => {
    // Visual simulation only - don't actually save
    console.log('Adding supplier:', { email, yieldRate });
    setIsModalOpen(false);
    setEmail("");
    setYieldRate("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEmail("");
    setYieldRate("");
  };

  return (
    <>
      <DataTable
        title="Поставщики"
        columns={columns}
        data={suppliersData}
        onRowSelect={(rows) => console.log('Selected suppliers:', rows)}
        actions={
          <Button 
            data-testid="button-add-supplier"
            style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Добавить поставщика
          </Button>
        }
        showFilters={true}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCancel}
        data-testid="modal-add-supplier"
      >
        <ModalContainer>
          <ModalTitle>Добавить поставщика</ModalTitle>
          
          <ModalContent>
            <FormField>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-supplier-email"
                required
              />
              <RequiredIndicator>*</RequiredIndicator>
            </FormField>
            
            <FormField>
              <Input
                placeholder="Ставка доходности"
                value={yieldRate}
                onChange={(e) => setYieldRate(e.target.value)}
                data-testid="input-supplier-yield-rate"
              />
              <Hint design="dark">
                Ввод ставки не обязателен
              </Hint>
            </FormField>
          </ModalContent>

          <ModalFooter>
            <Button 
              design="outline" 
              onClick={handleCancel}
              data-testid="button-cancel-supplier"
            >
              Отмена
            </Button>
            <Button 
              design="primary" 
              onClick={handleSubmit}
              disabled={!email.trim()}
              data-testid="button-submit-supplier"
            >
              Добавить
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  );
}