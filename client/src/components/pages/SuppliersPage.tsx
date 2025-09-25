import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import { Button, Modal, Input, Hint, Checkbox } from "vienna-ui";
import { AddIcon, WarningTrIcon, InfoRingIcon, Close16Icon, ChevronIcon } from "vienna.icons";

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

const InfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: hsl(216, 100%, 97%);
  border: 1px solid hsl(216, 100%, 85%);
  border-radius: 8px;
`;

const InfoContent = styled.div`
  color: hsl(216, 100%, 35%);
  font-size: 14px;
  line-height: 1.4;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: hsl(0 0% 9%);
`;

const FieldRow = styled.div`
  display: flex;
  gap: 16px;
`;

const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 25%);
  margin-bottom: 8px;
  display: block;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid hsl(0 0% 85%);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SearchOption = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid hsl(0 0% 95%);
  
  &:hover {
    background-color: hsl(0 0% 98%);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CompanyName = styled.div`
  font-weight: 500;
  color: hsl(0 0% 9%);
  margin-bottom: 4px;
`;

const CompanyDetails = styled.div`
  font-size: 12px;
  color: hsl(0 0% 45%);
  line-height: 1.3;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: hsl(216, 100%, 45%);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Mock data for INN search
const mockCompaniesData = [
  {
    inn: "1234221122",
    kpp: "459514892",
    ogrn: "5223213190630",
    name: "ООО Несуществующая компания"
  },
  {
    inn: "1234221221",
    kpp: "836752765",
    ogrn: "2721488172210",
    name: "ИП Счастливое Счастье Вчерашнее"
  },
  {
    inn: "7707083893",
    kpp: "540602001",
    ogrn: "1027700132195",
    name: "ПАО Сбербанк"
  },
  {
    inn: "7702070139",
    kpp: "997950001",
    ogrn: "1027739155878",
    name: "АО Альфа-Банк"
  },
  {
    inn: "1234567890",
    kpp: "123456789",
    ogrn: "1234567890123",
    name: "ООО Тестовая Компания"
  }
];

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
  },
  {
    company: "АО Кредиторский Кредитор",
    yieldRate: "1.00%",
    status: "Ждет приглашения",
    inn: "083422122",
    kpp: "157598698",
    ogrn: "8786069012582",
    email: "info@kreditor.com"
  },
  {
    company: "ООО Финансовые Решения",
    yieldRate: "2.50%",
    status: "Ждет приглашения", 
    inn: "123456789",
    kpp: "987654321",
    ogrn: "1234567890123",
    email: "contact@finresh.ru"
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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [suppliers, setSuppliers] = useState(suppliersData);
  
  // Form fields
  const [inn, setInn] = useState("");
  const [kpp, setKpp] = useState("");
  const [ogrn, setOgrn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [yieldRate, setYieldRate] = useState("");
  const [hideRate, setHideRate] = useState(false);
  
  // Detail form fields
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierYieldRate, setSupplierYieldRate] = useState("");
  
  // Search state
  const [searchResults, setSearchResults] = useState<typeof mockCompaniesData>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleInnSearch = (value: string) => {
    setInn(value);
    
    if (value.length >= 3) {
      const results = mockCompaniesData.filter(company =>
        company.inn.includes(value) || company.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchDropdown(results.length > 0);
    } else {
      setShowSearchDropdown(false);
    }
  };

  const handleYieldRateChange = (value: string) => {
    // Allow only numbers and decimal separator
    const numericValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setYieldRate(numericValue);
  };

  const selectCompany = (company: typeof mockCompaniesData[0]) => {
    setInn(company.inn);
    setKpp(company.kpp);
    setOgrn(company.ogrn);
    setCompanyName(company.name);
    setShowSearchDropdown(false);
  };

  const handleSubmit = () => {
    // Add new supplier with "На проверке" status
    const newSupplier = {
      company: companyName,
      yieldRate: yieldRate ? `${yieldRate}%` : "—",
      status: "На проверке"
    };
    
    setSuppliers([...suppliers, newSupplier]);
    
    // Reset form
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setInn("");
    setKpp("");
    setOgrn("");
    setCompanyName("");
    setYieldRate("");
    setHideRate(false);
    setShowSearchDropdown(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSupplierDoubleClick = (supplier: any) => {
    if (supplier.status === "Ждет приглашения") {
      setSelectedSupplier(supplier);
      setSupplierEmail(supplier.email || "");
      setSupplierYieldRate(supplier.yieldRate.replace('%', '') || "");
      setIsDetailModalOpen(true);
    }
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedSupplier(null);
    setSupplierEmail("");
    setSupplierYieldRate("");
  };

  const handleSendInvitation = () => {
    console.log('Sending invitation to:', supplierEmail);
    // Simulation only
  };

  const handleSaveYieldRate = () => {
    console.log('Saving yield rate:', supplierYieldRate);
    // Update supplier in the list
    const updatedSuppliers = suppliers.map(s => 
      s === selectedSupplier 
        ? { ...s, yieldRate: `${supplierYieldRate}%` }
        : s
    );
    setSuppliers(updatedSuppliers);
  };

  return (
    <>
      <DataTable
        title="Поставщики"
        columns={columns}
        data={suppliers}
        onRowSelect={(rows) => console.log('Selected suppliers:', rows)}
        onRowClick={handleSupplierDoubleClick}
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
          <BackButton onClick={handleCancel}>
            <ChevronIcon style={{ width: '16px', height: '16px' }} />
            Список поставщиков
          </BackButton>
          
          <ModalTitle>Новый поставщик</ModalTitle>
          
          <ModalContent>
            <Section>
              <SectionTitle>Основная информация</SectionTitle>
              
              <InfoSection>
                <InfoRingIcon style={{ width: '20px', height: '20px', color: 'hsl(216, 100%, 45%)', flexShrink: 0, marginTop: '2px' }} />
                <InfoContent>
                  После проверки поставщика вы сможете прислать ему приглашение на платформу
                </InfoContent>
              </InfoSection>

              <FieldRow>
                <FormField style={{ flex: 1, position: 'relative' }}>
                  <FieldLabel>ИНН</FieldLabel>
                  <Input
                    placeholder="10 цифр ИНН"
                    value={inn}
                    onChange={(e) => handleInnSearch(e.target.value)}
                    data-testid="input-supplier-inn"
                  />
                  {showSearchDropdown && (
                    <SearchDropdown>
                      {searchResults.map((company, index) => (
                        <SearchOption key={index} onClick={() => selectCompany(company)}>
                          <CompanyName>ИНН: {company.inn} КПП: {company.kpp}</CompanyName>
                          <CompanyDetails>ОГРН: {company.ogrn}</CompanyDetails>
                          <CompanyDetails>{company.name}</CompanyDetails>
                        </SearchOption>
                      ))}
                    </SearchDropdown>
                  )}
                </FormField>
                
                <FormField style={{ flex: 1 }}>
                  <FieldLabel>КПП</FieldLabel>
                  <Input
                    placeholder=""
                    value={kpp}
                    onChange={(e) => setKpp(e.target.value)}
                    data-testid="input-supplier-kpp"
                    disabled={true}
                  />
                </FormField>

                <FormField style={{ flex: 1 }}>
                  <FieldLabel>ОГРН</FieldLabel>
                  <Input
                    placeholder=""
                    value={ogrn}
                    onChange={(e) => setOgrn(e.target.value)}
                    data-testid="input-supplier-ogrn"
                    disabled={true}
                  />
                </FormField>
              </FieldRow>

              <FormField>
                <FieldLabel>Наименование</FieldLabel>
                <Input
                  placeholder=""
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  data-testid="input-supplier-name"
                  disabled={true}
                />
              </FormField>
            </Section>

            <Section>
              <SectionTitle>Условия сотрудничества</SectionTitle>
              
              <FormField>
                <FieldLabel>Ставка доходности</FieldLabel>
                <Input
                  placeholder="% годовых"
                  value={yieldRate}
                  onChange={(e) => handleYieldRateChange(e.target.value)}
                  data-testid="input-supplier-yield-rate"
                />
              </FormField>

              <Checkbox
                checked={hideRate}
                onChange={() => setHideRate(!hideRate)}
                data-testid="checkbox-hide-rate"
              >
                Поставщик не увидит ставку
              </Checkbox>
            </Section>
          </ModalContent>

          <ModalFooter>
            <Button 
              style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
              onClick={handleSubmit}
              disabled={!inn.trim() || !companyName.trim()}
              data-testid="button-submit-supplier"
            >
              Отправить на проверку
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>

      {/* Supplier Detail Modal */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={handleDetailModalClose}
        data-testid="modal-supplier-detail"
      >
        <ModalContainer>
          <BackButton onClick={handleDetailModalClose}>
            <ChevronIcon style={{ width: '16px', height: '16px' }} />
            Список поставщиков
          </BackButton>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <ModalTitle>Поставщик</ModalTitle>
            <StatusBadge status="Ждет приглашения" />
            <WarningTrIcon style={{ width: '16px', height: '16px', color: 'hsl(45, 100%, 50%)' }} />
          </div>
          
          <ModalContent>
            <Section>
              <SectionTitle>Основная информация</SectionTitle>

              <FieldRow>
                <FormField style={{ flex: 1 }}>
                  <FieldLabel>ИНН</FieldLabel>
                  <Input
                    value={selectedSupplier?.inn || ""}
                    disabled={true}
                    data-testid="input-detail-inn"
                  />
                </FormField>
                
                <FormField style={{ flex: 1 }}>
                  <FieldLabel>КПП</FieldLabel>
                  <Input
                    value={selectedSupplier?.kpp || ""}
                    disabled={true}
                    data-testid="input-detail-kpp"
                  />
                </FormField>

                <FormField style={{ flex: 1 }}>
                  <FieldLabel>ОГРН</FieldLabel>
                  <Input
                    value={selectedSupplier?.ogrn || ""}
                    disabled={true}
                    data-testid="input-detail-ogrn"
                  />
                </FormField>
              </FieldRow>

              <FormField>
                <FieldLabel>Наименование</FieldLabel>
                <Input
                  value={selectedSupplier?.company || ""}
                  disabled={true}
                  data-testid="input-detail-name"
                />
              </FormField>
            </Section>

            <Section>
              <SectionTitle>Приглашение поставщика</SectionTitle>
              
              <FormField>
                <FieldLabel>Электронная почта</FieldLabel>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <Input
                    placeholder="hpqek@foo.bar"
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                    data-testid="input-supplier-email"
                    style={{ flex: 1 }}
                  />
                  <Button 
                    style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
                    onClick={handleSendInvitation}
                    disabled={!supplierEmail.trim()}
                    data-testid="button-send-invitation"
                  >
                    Отправить приглашение
                  </Button>
                </div>
              </FormField>

              <InfoSection>
                <InfoRingIcon style={{ width: '20px', height: '20px', color: 'hsl(216, 100%, 45%)', flexShrink: 0, marginTop: '2px' }} />
                <InfoContent>
                  Время действия приглашения истекает, отправьте еще раз приглашение поставщику
                </InfoContent>
              </InfoSection>
            </Section>

            <Section>
              <SectionTitle>Условия сотрудничества</SectionTitle>
              
              <FormField>
                <FieldLabel>Ставка доходности</FieldLabel>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <Input
                    placeholder="% годовых"
                    value={supplierYieldRate}
                    onChange={(e) => handleYieldRateChange(e.target.value)}
                    data-testid="input-detail-yield-rate"
                    style={{ flex: 1 }}
                  />
                  <Button 
                    style={{ backgroundColor: '#FEE600', color: '#2B2D33' }}
                    onClick={handleSaveYieldRate}
                    disabled={!supplierYieldRate.trim()}
                    data-testid="button-save-yield-rate"
                  >
                    Сохранить ставку
                  </Button>
                </div>
              </FormField>

              <Checkbox
                checked={hideRate}
                onChange={() => setHideRate(!hideRate)}
                data-testid="checkbox-detail-hide-rate"
              >
                Поставщик не увидит ставку
              </Checkbox>
            </Section>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}