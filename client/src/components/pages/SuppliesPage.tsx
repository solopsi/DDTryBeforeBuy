import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import FileUploadModal from "../FileUploadModal";
import DeleteConfirmModal from "../DeleteConfirmModal";
import Loader from "../Loader";
import { Button } from "vienna-ui/dist/Button";
import { Select } from "vienna-ui/dist/Select";
import { Input } from "vienna-ui/dist/Input";
import { DownloadIcon } from "vienna.icons";

// Styled components for tabs
const TabNavigation = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid hsl(0 0% 90%);
  padding-bottom: 0;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$active ? 'hsl(0 0% 8%)' : 'hsl(0 0% 64%)'};
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: ${props => props.$active ? '2px solid hsl(45 100% 50%)' : '2px solid transparent'};
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '500' : '400'};
  
  &:hover {
    color: hsl(0 0% 8%);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: end;
  margin-bottom: 16px;
  padding: 16px;
  background: hsl(0 0% 98%);
  border: 1px solid hsl(0 0% 93%);
  border-radius: 6px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  color: hsl(0 0% 64%);
  margin-bottom: 4px;
`;

const AmountRangeGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FilterButton = styled.button`
  background: none;
  border: 1px solid hsl(0 0% 80%);
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: hsl(0 0% 64%);
  
  &:hover {
    background: hsl(0 0% 96%);
    color: hsl(0 0% 8%);
  }
`;

//todo: remove mock functionality
const suppliesData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "2,15 %",
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
  },
  {
    supplier: "ООО Северная торговля",
    discount: "4,50 %",
    invoiceDate: "01.09.2025",
    invoiceNumber: "invoice-str825",
    paymentDate: "18.09.2025",
    amount: "1 245 890,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ИП Петрова Анна Сергеевна",
    discount: "3,65 %",
    invoiceDate: "02.09.2025", 
    invoiceNumber: "invoice-pas461",
    paymentDate: "19.09.2025",
    amount: "356 720,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Волжский машиностроительный завод",
    discount: "2,75 %",
    invoiceDate: "03.09.2025",
    invoiceNumber: "invoice-vmz739",
    paymentDate: "20.09.2025",
    amount: "2 134 567,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ООО Сибирские ресурсы",
    discount: "1,80 %",
    invoiceDate: "04.09.2025",
    invoiceNumber: "invoice-sir294",
    paymentDate: "21.09.2025",
    amount: "789 234,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ЗАО Технологии будущего",
    discount: "1,40 %",
    invoiceDate: "05.09.2025",
    invoiceNumber: "invoice-tbz156",
    paymentDate: "22.09.2025", 
    amount: "467 891,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ИП Сидоров Михаил Игоревич",
    discount: "3,25 %",
    invoiceDate: "06.09.2025",
    invoiceNumber: "invoice-smi673",
    paymentDate: "23.09.2025",
    amount: "623 445,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ПАО Энергосистемы",
    discount: "1,95 %",
    invoiceDate: "07.09.2025",
    invoiceNumber: "invoice-ens812",
    paymentDate: "24.09.2025",
    amount: "1 567 223,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "ООО Логистические решения",
    discount: "2,90 %",
    invoiceDate: "08.09.2025",
    invoiceNumber: "invoice-lrs948",
    paymentDate: "25.09.2025",
    amount: "892 156,00 ₽",
    status: "Ждет отправки"
  },
  {
    supplier: "АО Дальневосточная компания",
    discount: "4,10 %",
    invoiceDate: "09.09.2025",
    invoiceNumber: "invoice-dvk385",
    paymentDate: "26.09.2025",
    amount: "1 789 456,00 ₽",
    status: "Ждет отправки"
  }
];

// Data for "Awaiting Response" tab
const awaitingResponseData = [
  {
    supplier: "ООО Мегаснаб",
    discount: "3,20 %",
    invoiceDate: "10.09.2025",
    invoiceNumber: "invoice-mega401",
    paymentDate: "27.09.2025",
    amount: "892 345,00 ₽",
    status: "Ждет ответ"
  },
  {
    supplier: "АО Промышленные товары",
    discount: "2,80 %",
    invoiceDate: "12.09.2025",
    invoiceNumber: "invoice-prom502",
    paymentDate: "29.09.2025",
    amount: "1 567 890,00 ₽",
    status: "Ждет ответ"
  },
  {
    supplier: "ПАО Стройматериалы Плюс",
    discount: "1,75 %",
    invoiceDate: "14.09.2025",
    invoiceNumber: "invoice-stroy603",
    paymentDate: "01.10.2025",
    amount: "2 234 567,00 ₽",
    status: "Ждет ответ"
  },
  {
    supplier: "ООО Транспортные решения",
    discount: "4,25 %",
    invoiceDate: "16.09.2025",
    invoiceNumber: "invoice-trans704",
    paymentDate: "03.10.2025",
    amount: "1 123 456,00 ₽",
    status: "Ждет ответ"
  }
];

// Data for "Все поставки" tab
const allSuppliesData = [
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "—",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-j11/360",
    paymentDate: "09.10.2025",
    amount: "621 413,00 ₽",
    earlyPaymentAmount: "614 518,00 ₽", 
    earlyPaymentDate: "25.09.2025",
    status: "Подписана"
  },
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "—",
    invoiceDate: "21.09.2025",
    invoiceNumber: "invoice-no1/684",
    paymentDate: "11.10.2025",
    amount: "756 183,00 ₽",
    earlyPaymentAmount: "745 478,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Подписана"
  },
  {
    supplier: "ИП Тестов Тест Тестович",
    discount: "—",
    invoiceDate: "24.09.2025",
    invoiceNumber: "invoice-fu/603",
    paymentDate: "13.10.2025",
    amount: "521 282,00 ₽",
    earlyPaymentAmount: "512 206,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Ждет подписи"
  },
  {
    supplier: "ООО Тестовые данные",
    discount: "9,00 %",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-vmi/839",
    paymentDate: "14.10.2025",
    amount: "234 459,00 ₽",
    earlyPaymentAmount: "228 212,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Просрочена"
  },
  {
    supplier: "ООО Тестовые данные",
    discount: "9,00 %",
    invoiceDate: "22.09.2025",
    invoiceNumber: "invoice-4rif/190",
    paymentDate: "12.10.2025",
    amount: "784 492,00 ₽",
    earlyPaymentAmount: "—",
    earlyPaymentDate: "—",
    status: "Ждет ответа"
  },
  {
    supplier: "ООО Тестовые данные",
    discount: "9,00 %",
    invoiceDate: "25.09.2025",
    invoiceNumber: "invoice-uuf/715",
    paymentDate: "09.10.2025",
    amount: "369 527,00 ₽",
    earlyPaymentAmount: "367 895,00 ₽",
    earlyPaymentDate: "26.09.2025",
    status: "На рассмотрении"
  },
  {
    supplier: "ООО Тестовые данные",
    discount: "9,00 %",
    invoiceDate: "25.09.2025",
    invoiceNumber: "invoice-7ap/645",
    paymentDate: "11.10.2025",
    amount: "949 347,00 ₽",
    earlyPaymentAmount: "941 456,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Отклонена"
  },
  {
    supplier: "АО Тестовая компания",
    discount: "—",
    invoiceDate: "20.09.2025",
    invoiceNumber: "invoice-j12/711",
    paymentDate: "13.10.2025",
    amount: "952 192,00 ₽",
    earlyPaymentAmount: "948 814,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Ждет ответа"
  },
  {
    supplier: "АО Тестовая компания",
    discount: "—",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-wi7/575",
    paymentDate: "10.10.2025",
    amount: "303 627,00 ₽",
    earlyPaymentAmount: "299 505,00 ₽",
    earlyPaymentDate: "26.09.2025",
    status: "Просрочена"
  },
  {
    supplier: "АО Тестовая компания",
    discount: "—",
    invoiceDate: "22.09.2025",
    invoiceNumber: "invoice-fu/471",
    paymentDate: "14.10.2025",
    amount: "792 230,00 ₽",
    earlyPaymentAmount: "789 082,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Ждет подписи"
  },
  {
    supplier: "ПАО Москвов общество",
    discount: "6,00 %",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-cle/700",
    paymentDate: "15.10.2025",
    amount: "464 056,00 ₽",
    earlyPaymentAmount: "—",
    earlyPaymentDate: "—",
    status: "Ждет ответа"
  },
  {
    supplier: "ПАО Москвов общество",
    discount: "6,00 %",
    invoiceDate: "24.09.2025",
    invoiceNumber: "invoice-rf3/323",
    paymentDate: "09.10.2025",
    amount: "838 781,00 ₽",
    earlyPaymentAmount: "—",
    earlyPaymentDate: "—",
    status: "Ждет ответа"
  },
  {
    supplier: "ПАО Москвов общество",
    discount: "6,00 %",
    invoiceDate: "24.09.2025",
    invoiceNumber: "invoice-l57/319",
    paymentDate: "16.10.2025",
    amount: "246 045,00 ₽",
    earlyPaymentAmount: "237 061,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Ждет ответа"
  },
  {
    supplier: "ИП Москв Мск Москвич",
    discount: "7,00 %",
    invoiceDate: "19.09.2025",
    invoiceNumber: "invoice-qz/870",
    paymentDate: "15.10.2025",
    amount: "621 203,00 ₽",
    earlyPaymentAmount: "—",
    earlyPaymentDate: "—",
    status: "Ждет ответа"
  },
  {
    supplier: "ИП Москв Мск Москвич",
    discount: "7,00 %",
    invoiceDate: "19.09.2025",
    invoiceNumber: "invoice-nj/326",
    paymentDate: "10.10.2025",
    amount: "611 156,00 ₽",
    earlyPaymentAmount: "605 980,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Ждет подписи"
  },
  {
    supplier: "ИП Москв Мск Москвич",
    discount: "7,00 %",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-r41/333",
    paymentDate: "12.10.2025",
    amount: "131 635,00 ₽",
    earlyPaymentAmount: "122 519,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Просрочена"
  },
  {
    supplier: "ИП Москв Мск Москвич",
    discount: "7,00 %",
    invoiceDate: "23.09.2025",
    invoiceNumber: "invoice-urd/996",
    paymentDate: "11.10.2025",
    amount: "500 622,00 ₽",
    earlyPaymentAmount: "498 053,00 ₽",
    earlyPaymentDate: "25.09.2025",
    status: "Подписана"
  }
];

const columns = [
  { key: 'supplier', header: 'Поставщик' },
  { key: 'discount', header: 'Ставка доходности' },
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

// Columns for "Все поставки" view
const allSuppliesColumns = [
  { key: 'supplier', header: 'Поставщик' },
  { key: 'discount', header: 'Ставка доходности' },
  { key: 'invoiceDate', header: 'Дата счета' },
  { key: 'invoiceNumber', header: '№ счета' },
  { key: 'paymentDate', header: 'Дата оплаты' },
  { key: 'amount', header: 'Сумма оплаты' },
  { key: 'earlyPaymentAmount', header: 'Сумма ранней оплаты' },
  { key: 'earlyPaymentDate', header: 'Дата ранней оплаты' },
  { 
    key: 'status', 
    header: 'Статус',
    render: (value: string) => <StatusBadge status={value} />
  },
];

export default function SuppliesPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("on-shipment");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [currentSuppliesData, setCurrentSuppliesData] = useState(suppliesData);

  // Get data and columns based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "all-supplies":
        return allSuppliesData;
      case "awaiting-response":
        return awaitingResponseData;
      case "with-error":
        return []; // Пустой массив для вкладки "С ошибкой"
      case "on-shipment":
        return currentSuppliesData;
      default:
        return currentSuppliesData;
    }
  };
  
  const currentData = getCurrentData();
  const currentColumns = activeTab === "all-supplies" ? allSuppliesColumns : columns;

  const handleDeleteSupplies = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    setActiveTab("on-shipment");
    setIsLoading(true);
    
    // Simulate deletion process with 1.5 second delay
    setTimeout(() => {
      setCurrentSuppliesData([]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const renderFilters = () => {
    // На отправку - Поставщик, Сумма оплаты, Дата оплаты
    if (activeTab === "on-shipment") {
      return (
        <FiltersSection>
          <FilterGroup>
            <FilterLabel>Поставщик</FilterLabel>
            <Select
              placeholder="Все поставщики"
              data-testid="filter-supplier"
            >
              <Select.Option value="all">Все поставщики</Select.Option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Сумма оплаты</FilterLabel>
            <AmountRangeGroup>
              <Input
                placeholder="От"
                style={{ width: '100px' }}
                data-testid="filter-amount-from"
              />
              <span>—</span>
              <Input
                placeholder="До"
                style={{ width: '100px' }}
                data-testid="filter-amount-to"
              />
            </AmountRangeGroup>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Дата оплаты</FilterLabel>
            <Input
              placeholder="ДД.ММ.ГГГГ"
              style={{ width: '140px' }}
              data-testid="filter-payment-date"
            />
          </FilterGroup>

          <FilterButton data-testid="button-reset-filters">
            Сбросить
          </FilterButton>
        </FiltersSection>
      );
    }

    // Ждут вашего ответа - Поставщик, Сумма оплаты, Дата оплаты
    if (activeTab === "awaiting-response") {
      return (
        <FiltersSection>
          <FilterGroup>
            <FilterLabel>Поставщик</FilterLabel>
            <Select
              placeholder="Все поставщики"
              data-testid="filter-supplier"
            >
              <Select.Option value="all">Все поставщики</Select.Option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Сумма оплаты</FilterLabel>
            <AmountRangeGroup>
              <Input
                placeholder="От"
                style={{ width: '100px' }}
                data-testid="filter-amount-from"
              />
              <span>—</span>
              <Input
                placeholder="До"
                style={{ width: '100px' }}
                data-testid="filter-amount-to"
              />
            </AmountRangeGroup>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Дата оплаты</FilterLabel>
            <Input
              placeholder="ДД.ММ.ГГГГ"
              style={{ width: '140px' }}
              data-testid="filter-payment-date"
            />
          </FilterGroup>

          <FilterButton data-testid="button-reset-filters">
            Сбросить
          </FilterButton>
        </FiltersSection>
      );
    }

    // С ошибкой - Причина ошибки, Дата загрузки
    if (activeTab === "with-error") {
      return (
        <FiltersSection>
          <FilterGroup>
            <FilterLabel>Причина ошибки</FilterLabel>
            <Select
              placeholder="Все ошибки"
              data-testid="filter-error-reason"
            >
              <Select.Option value="all">Все ошибки</Select.Option>
              <Select.Option value="payment-amount-error">Ошибка в сумме оплаты</Select.Option>
              <Select.Option value="payment-date-expired">Истекла дата оплаты</Select.Option>
              <Select.Option value="invoice-date-not-arrived">Дата счета не наступила</Select.Option>
              <Select.Option value="contract-date-not-arrived">Дата договора не наступила</Select.Option>
              <Select.Option value="supplier-not-found">Поставщик не найден</Select.Option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Дата загрузки</FilterLabel>
            <Input
              placeholder="ДД.ММ.ГГГГ"
              style={{ width: '140px' }}
              data-testid="filter-upload-date"
            />
          </FilterGroup>

          <FilterButton data-testid="button-reset-filters">
            Сбросить
          </FilterButton>
        </FiltersSection>
      );
    }

    // Все поставки - Полный набор фильтров
    if (activeTab === "all-supplies") {
      return (
        <>
          <FiltersSection>
            <FilterGroup>
              <FilterLabel>Поставщик</FilterLabel>
              <Select
                placeholder="Все поставщики"
                data-testid="filter-supplier"
              >
                <Select.Option value="all">Все поставщики</Select.Option>
                <Select.Option value="testov">ИП Тестов Тест Тестович</Select.Option>
                <Select.Option value="test-data">ООО Тестовые данные</Select.Option>
                <Select.Option value="test-company">АО Тестовая компания</Select.Option>
                <Select.Option value="moskovoe">ПАО Москвов общество</Select.Option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Статус</FilterLabel>
              <Select
                placeholder="Все статусы"
                data-testid="filter-status"
              >
                <Select.Option value="all">Все статусы</Select.Option>
                <Select.Option value="signed">Подписана</Select.Option>
                <Select.Option value="awaiting-signature">Ждет подписи</Select.Option>
                <Select.Option value="overdue">Просрочена</Select.Option>
                <Select.Option value="under-review">На рассмотрении</Select.Option>
                <Select.Option value="rejected">Отклонена</Select.Option>
                <Select.Option value="awaiting-response">Ждет ответа</Select.Option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Сумма оплаты</FilterLabel>
              <AmountRangeGroup>
                <Input
                  placeholder="От"
                  style={{ width: '100px' }}
                  data-testid="filter-amount-from"
                />
                <span>—</span>
                <Input
                  placeholder="До"
                  style={{ width: '100px' }}
                  data-testid="filter-amount-to"
                />
              </AmountRangeGroup>
            </FilterGroup>


            <FilterButton 
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              data-testid="button-more-filters"
            >
              {showMoreFilters ? 'Скрыть фильтры' : 'Еще фильтры'}
            </FilterButton>
          </FiltersSection>
          
          {showMoreFilters && (
            <FiltersSection>
              <FilterGroup>
                <FilterLabel>Дата оплаты</FilterLabel>
                <AmountRangeGroup>
                  <Input
                    placeholder="ДД.ММ.ГГГГ"
                    style={{ width: '120px' }}
                    data-testid="filter-payment-date-from"
                  />
                  <span>—</span>
                  <Input
                    placeholder="ДД.ММ.ГГГГ"
                    style={{ width: '120px' }}
                    data-testid="filter-payment-date-to"
                  />
                </AmountRangeGroup>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Дата ранней оплаты</FilterLabel>
                <AmountRangeGroup>
                  <Input
                    placeholder="ДД.ММ.ГГГГ"
                    style={{ width: '120px' }}
                    data-testid="filter-early-payment-date-from"
                  />
                  <span>—</span>
                  <Input
                    placeholder="ДД.ММ.ГГГГ"
                    style={{ width: '120px' }}
                    data-testid="filter-early-payment-date-to"
                  />
                </AmountRangeGroup>
              </FilterGroup>
            </FiltersSection>
          )}
        </>
      );
    }

    return null;
  };

  const renderActions = () => {
    if (activeTab === "all-supplies") {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            design="primary"
            onClick={handleDeleteSupplies}
            data-testid="button-delete-supplies"
          >
            Удалить поставки на отправку
          </Button>
          <Button 
            design="outline"
            onClick={() => setIsUploadModalOpen(true)}
            data-testid="button-upload-supplies"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <DownloadIcon style={{ width: '16px', height: '16px' }} />
              Загрузить
            </div>
          </Button>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          design="primary"
          onClick={handleDeleteSupplies}
          data-testid="button-delete-supplies"
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
    );
  };

  return (
    <PageContainer>
      <TitleSection>
        <TitleRow>
          <Title>Поставки</Title>
          {renderActions()}
        </TitleRow>
        <TabNavigation>
          <TabButton 
            $active={activeTab === "on-shipment"}
            onClick={() => setActiveTab("on-shipment")}
            data-testid="nav-not-shipped"
          >
            На отправку
          </TabButton>
          <TabButton 
            $active={activeTab === "awaiting-response"}
            onClick={() => setActiveTab("awaiting-response")}
            data-testid="nav-awaiting-response"
          >
            Ждет вашего ответа
          </TabButton>
          <TabButton 
            $active={activeTab === "with-error"}
            onClick={() => setActiveTab("with-error")}
            data-testid="nav-with-error"
          >
            С ошибкой
          </TabButton>
          <TabButton 
            $active={activeTab === "all-supplies"}
            onClick={() => setActiveTab("all-supplies")}
            data-testid="nav-all-supplies"
          >
            Все поставки
          </TabButton>
        </TabNavigation>
      </TitleSection>

      {renderFilters()}

      <DataTable
        title=""
        columns={currentColumns}
        data={currentData}
        onRowSelect={(rows) => console.log('Selected supplies:', rows)}
      />
      
      <FileUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      
      <Loader 
        isVisible={isLoading}
        text="Удаление поставок..."
      />
    </PageContainer>
  );
}