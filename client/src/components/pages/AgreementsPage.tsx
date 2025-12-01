import { useState } from "react";
import styled from "styled-components";
import DataTable from "../DataTable";
import StatusBadge from "../StatusBadge";
import { Button, Drawer, Select, Datepicker } from "vienna-ui";
import {
  DocumentIcon,
  ChevronIcon,
  EditIcon,
  CheckmarkRingIcon,
} from "vienna.icons";

const BottomActionBar = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(0 0% 9%);
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 24px;
  z-index: 1000;
  min-width: 500px;
`;

const ActionInfo = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: hsl(0 0% 70%);
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const DrawerContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 500px;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

const SigningMethodSection = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DocumentsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const DocumentCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
`;

const DocumentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const ChevronIconWrapper = styled.div<{ $isExpanded: boolean }>`
  transform: ${(props) =>
    props.$isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
`;

const DocumentHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CompanyName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const DocumentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  min-height: 20px;
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #666;
  line-height: 20px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const DrawerFooter = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;

const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #2b2d33;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 12px 0;
  color: #666;
`;

const CertificateItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
`;

const CertificateIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fee600;
  margin-top: 6px;
`;

const CertificateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const CertificateName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2b2d33;
  line-height: 1.4;
`;

const CertificateDate = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`;

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: #0066cc;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? "#FEE600" : "transparent")};
  color: ${(props) => (props.$isActive ? "#2B2D33" : "#666")};
  font-size: 14px;
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #2b2d33;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-end;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  color: #666;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;
`;

const FilterLink = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #333;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 48px;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #c3ebd7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #2d5a3d;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #2b2d33;
  margin: 0 0 32px 0;
  line-height: 1.3;
`;

interface AgreementsPageProps {
  userRole?: "buyer" | "supplier";
}

interface AgreementData {
  id: number;
  agreementDate: string;
  counterparty: string;
  earlyPayment: string;
  discount: string;
  paymentDate: string;
  status: string;
  contractNumber: string;
}

const supplierAgreementsData: AgreementData[] = [
  {
    id: 1,
    agreementDate: "27.11.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "447 350,00 ₽",
    discount: "2 736,00 ₽",
    paymentDate: "30.11.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-anf/177",
  },
  {
    id: 2,
    agreementDate: "25.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "849 361,00 ₽",
    discount: "9 290,00 ₽",
    paymentDate: "24.11.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-7of/520",
  },
  {
    id: 3,
    agreementDate: "25.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "577 384,00 ₽",
    discount: "2 845,00 ₽",
    paymentDate: "24.11.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-8kl/321",
  },
  {
    id: 4,
    agreementDate: "01.12.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "134 141,00 ₽",
    discount: "7 474,00 ₽",
    paymentDate: "01.12.2025",
    status: "Ждет финальной подписи",
    contractNumber: "contract-abc/111",
  },
  {
    id: 5,
    agreementDate: "29.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "715 762,00 ₽",
    discount: "1 514,00 ₽",
    paymentDate: "29.11.2025",
    status: "Ждет финальной подписи",
    contractNumber: "contract-def/222",
  },
  {
    id: 6,
    agreementDate: "30.11.2025",
    counterparty: "ИП Тестов Тест Тестович",
    earlyPayment: "643 152,00 ₽",
    discount: "1 876,00 ₽",
    paymentDate: "27.11.2025",
    status: "Отклонено",
    contractNumber: "contract-ghi/333",
  },
  {
    id: 7,
    agreementDate: "25.11.2025",
    counterparty: "ИП Тестов Тест Тестович",
    earlyPayment: "839 650,00 ₽",
    discount: "2 719,00 ₽",
    paymentDate: "26.11.2025",
    status: "Ждет финальной подписи",
    contractNumber: "contract-jkl/444",
  },
  {
    id: 8,
    agreementDate: "27.11.2025",
    counterparty: "ИП Тестов Тест Тестович",
    earlyPayment: "912 930,00 ₽",
    discount: "8 372,00 ₽",
    paymentDate: "28.11.2025",
    status: "Отклонено",
    contractNumber: "contract-mno/555",
  },
  {
    id: 9,
    agreementDate: "30.11.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "191 789,00 ₽",
    discount: "8 937,00 ₽",
    paymentDate: "01.12.2025",
    status: "Подписано",
    contractNumber: "contract-pqr/666",
  },
  {
    id: 10,
    agreementDate: "25.11.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "858 748,00 ₽",
    discount: "9 691,00 ₽",
    paymentDate: "27.11.2025",
    status: "Отклонено",
    contractNumber: "contract-stu/777",
  },
  {
    id: 11,
    agreementDate: "28.11.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "584 740,00 ₽",
    discount: "9 188,00 ₽",
    paymentDate: "25.11.2025",
    status: "На рассмотрении",
    contractNumber: "contract-vwx/888",
  },
  {
    id: 12,
    agreementDate: "29.11.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "310 745,00 ₽",
    discount: "8 246,00 ₽",
    paymentDate: "25.11.2025",
    status: "Подписано",
    contractNumber: "contract-yza/999",
  },
  {
    id: 13,
    agreementDate: "27.11.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "839 623,00 ₽",
    discount: "1 464,00 ₽",
    paymentDate: "28.11.2025",
    status: "Ждет финальной подписи",
    contractNumber: "contract-bcd/100",
  },
  {
    id: 14,
    agreementDate: "01.12.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "732 131,00 ₽",
    discount: "4 663,00 ₽",
    paymentDate: "01.12.2025",
    status: "Подписано",
    contractNumber: "contract-efg/101",
  },
  {
    id: 15,
    agreementDate: "26.11.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "527 491,00 ₽",
    discount: "9 964,00 ₽",
    paymentDate: "01.12.2025",
    status: "На рассмотрении",
    contractNumber: "contract-hij/102",
  },
  {
    id: 16,
    agreementDate: "01.12.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "243 577,00 ₽",
    discount: "5 463,00 ₽",
    paymentDate: "28.11.2025",
    status: "Просрочено",
    contractNumber: "contract-klm/103",
  },
  {
    id: 17,
    agreementDate: "26.11.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "646 165,00 ₽",
    discount: "5 468,00 ₽",
    paymentDate: "27.11.2025",
    status: "Ждет финальной подписи",
    contractNumber: "contract-nop/104",
  },
  {
    id: 18,
    agreementDate: "01.12.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "139 201,00 ₽",
    discount: "1 765,00 ₽",
    paymentDate: "27.11.2025",
    status: "Просрочено",
    contractNumber: "contract-qrs/105",
  },
  {
    id: 19,
    agreementDate: "27.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "489 136,00 ₽",
    discount: "2 961,00 ₽",
    paymentDate: "29.11.2025",
    status: "На рассмотрении",
    contractNumber: "contract-tuv/106",
  },
  {
    id: 20,
    agreementDate: "25.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "669 944,00 ₽",
    discount: "1 112,00 ₽",
    paymentDate: "01.12.2025",
    status: "Просрочено",
    contractNumber: "contract-wxy/107",
  },
  {
    id: 21,
    agreementDate: "25.11.2025",
    counterparty: "ПАО Моковое общество",
    earlyPayment: "446 271,00 ₽",
    discount: "4 463,00 ₽",
    paymentDate: "27.11.2025",
    status: "Отклонено",
    contractNumber: "contract-zab/108",
  },
];

const buyerAgreementsData = [
  {
    id: 1,
    agreementDate: "25.09.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "252 994,00 ₽",
    discount: "8 686,00 ₽",
    paymentDate: "21.09.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-vm3/731",
  },
  {
    id: 2,
    agreementDate: "23.09.2025",
    counterparty: "ООО Тестовые данные",
    earlyPayment: "869 650,00 ₽",
    discount: "9 623,00 ₽",
    paymentDate: "20.09.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-vm3/732",
  },
  {
    id: 3,
    agreementDate: "24.09.2025",
    counterparty: "АО Тестовая компания",
    earlyPayment: "736 926,00 ₽",
    discount: "5 711,00 ₽",
    paymentDate: "25.09.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-0vw/733",
  },
  {
    id: 4,
    agreementDate: "21.09.2025",
    counterparty: "ПАО Московское общество",
    earlyPayment: "336 396,00 ₽",
    discount: "6 997,00 ₽",
    paymentDate: "20.09.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-pao/734",
  },
  {
    id: 5,
    agreementDate: "22.09.2025",
    counterparty: "ИП Можак Мок Можакич",
    earlyPayment: "786 153,00 ₽",
    discount: "6 496,00 ₽",
    paymentDate: "21.09.2025",
    status: "Ждет вашей подписи",
    contractNumber: "contract-ip/735",
  },
];

export default function AgreementsPage({
  userRole = "buyer",
}: AgreementsPageProps) {
  const [selectedAgreements, setSelectedAgreements] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState<"review" | "success">("review");
  const [expandedDocuments, setExpandedDocuments] = useState<Set<number>>(
    new Set([0]),
  );
  const [activeTab, setActiveTab] = useState("outgoing");
  const [allAgreements, setAllAgreements] = useState(
    userRole === "supplier" ? supplierAgreementsData : buyerAgreementsData,
  );
  const [counterpartyFilter, setCounterpartyFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const tabs = [
    { id: "outgoing", label: "Исходящие" },
    { id: "incoming", label: "Входящие" },
    { id: "all", label: "Все соглашения" },
  ];

  const getFilteredAgreements = () => {
    let data = allAgreements;

    switch (activeTab) {
      case "outgoing":
        data = allAgreements.filter(
          (agreement) => agreement.status === "Ждет вашей подписи",
        );
        break;
      case "incoming":
        data = allAgreements.filter(
          (agreement) => agreement.status === "Ждет финальной подписи",
        );
        break;
      case "all":
        data = allAgreements;
        break;
    }

    if (counterpartyFilter) {
      data = data.filter(
        (agreement) => agreement.counterparty === counterpartyFilter,
      );
    }

    if (statusFilter && activeTab === "all") {
      const statusMap: { [key: string]: string } = {
        signed: "Подписано",
        pending: "Ждет вашей подписи",
        final: "Ждет финальной подписи",
        rejected: "Отклонено",
        review: "На рассмотрении",
        overdue: "Просрочено",
      };
      const targetStatus = statusMap[statusFilter];
      if (targetStatus) {
        data = data.filter((agreement) => agreement.status === targetStatus);
      }
    }

    return data;
  };

  const handleResetFilters = () => {
    setCounterpartyFilter("");
    setStatusFilter("");
  };

  const getColumns = () => {
    const counterpartyHeader =
      userRole === "supplier" ? "Покупатель" : "Поставщик";

    return [
      { key: "agreementDate", header: "Дата соглашения" },
      { key: "counterparty", header: counterpartyHeader },
      { key: "earlyPayment", header: "Сумма ранней оплаты" },
      { key: "discount", header: "Сумма скидки" },
      { key: "paymentDate", header: "Дата ранней оплаты" },
      {
        key: "status",
        header: "Статус",
        render: (value: string) => <StatusBadge status={value} />,
      },
    ];
  };

  const handleRowSelect = (rows: any[]) => {
    setSelectedAgreements(rows);
  };

  const calculateTotalEarlyPayment = () => {
    return selectedAgreements.reduce((total, agreement) => {
      const amount = parseFloat(agreement.earlyPayment.replace(/[^\d]/g, ""));
      return total + amount;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount / 100) + " ₽"
    );
  };

  const handleSignAndSend = () => {
    setDrawerStep("review");
    setIsDrawerOpen(true);
    setExpandedDocuments(new Set([0]));
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerStep("review");

    if (drawerStep === "success") {
      setActiveTab("all");
      setSelectedAgreements([]);
    }
  };

  const handleFinalSignAndSend = () => {
    const updatedAgreements = allAgreements.map((agreement) => {
      const isSelected = selectedAgreements.some(
        (selected) => selected.id === agreement.id,
      );
      return isSelected ? { ...agreement, status: "Подписано" } : agreement;
    });

    setAllAgreements(updatedAgreements);
    setDrawerStep("success");
  };

  const toggleDocumentExpansion = (index: number) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedDocuments(newExpanded);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedAgreements([]);
  };

  const getUniqueBuyers = () => {
    const unique = Array.from(
      new Set(allAgreements.map((a) => a.counterparty)),
    );
    return unique.filter(Boolean) as string[];
  };

  const groupByCounterparty = () => {
    const groups: { [key: string]: AgreementData[] } = {};

    selectedAgreements.forEach((agreement: AgreementData) => {
      const key = agreement.counterparty;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(agreement);
    });

    return groups;
  };

  return (
    <>
      <div>
        <h1
          style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 24px 0" }}
        >
          Соглашения
        </h1>

        <TabsContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>

        <FiltersContainer>
          <FilterGroup>
            <FilterLabel>
              {userRole === "supplier" ? "Покупатель" : "Поставщик"}
            </FilterLabel>
            <Select
              size="m"
              placeholder={
                userRole === "supplier" ? "Все покупатели" : "Все поставщики"
              }
              value={counterpartyFilter}
              onSelect={(e: any, data: any) =>
                setCounterpartyFilter(data?.value || "")
              }
              style={{ minWidth: "200px" }}
            >
              <Select.Option value="">
                {userRole === "supplier" ? "Все покупатели" : "Все поставщики"}
              </Select.Option>
              {getUniqueBuyers().map((buyer) => (
                <Select.Option key={buyer} value={buyer}>
                  {buyer}
                </Select.Option>
              ))}
            </Select>
          </FilterGroup>

          {activeTab !== "all" && (
            <>
              <FilterGroup>
                <FilterLabel>Дата</FilterLabel>
                <Select
                  size="m"
                  placeholder="Ранней оплаты"
                  style={{ minWidth: "150px" }}
                >
                  <Select.Option value="early">Ранней оплаты</Select.Option>
                  <Select.Option value="agreement">Соглашения</Select.Option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>&nbsp;</FilterLabel>
                <Datepicker
                  size="m"
                  placeholder="ДД.ММ.ГГГГ"
                  style={{ minWidth: "150px" }}
                  dropdownPortal={document.body}
                />
              </FilterGroup>
            </>
          )}

          {activeTab === "all" && (
            <>
              <FilterGroup>
                <FilterLabel>Статус</FilterLabel>
                <Select
                  size="m"
                  placeholder="Все статусы"
                  value={statusFilter}
                  onSelect={(e: any, data: any) =>
                    setStatusFilter(data?.value || "")
                  }
                  style={{ minWidth: "150px" }}
                >
                  <Select.Option value="">Все статусы</Select.Option>
                  <Select.Option value="signed">Подписано</Select.Option>
                  <Select.Option value="pending">
                    Ждет вашей подписи
                  </Select.Option>
                  <Select.Option value="final">
                    Ждет финальной подписи
                  </Select.Option>
                  <Select.Option value="rejected">Отклонено</Select.Option>
                  <Select.Option value="review">На рассмотрении</Select.Option>
                  <Select.Option value="overdue">Просрочено</Select.Option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Сумма ранней оплаты</FilterLabel>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <input
                    type="text"
                    placeholder="От"
                    style={{
                      width: "100px",
                      padding: "8px 12px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  <span style={{ color: "#666" }}>—</span>
                  <input
                    type="text"
                    placeholder="До"
                    style={{
                      width: "100px",
                      padding: "8px 12px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </FilterGroup>
            </>
          )}

          <FilterActions>
            <FilterLink>
              Еще фильтры <ChevronIcon />
            </FilterLink>
            <FilterLink style={{ color: "#999" }} onClick={handleResetFilters}>
              Сбросить
            </FilterLink>
          </FilterActions>
        </FiltersContainer>

        <DataTable
          title=""
          columns={getColumns()}
          data={getFilteredAgreements()}
          onRowSelect={activeTab !== "all" ? handleRowSelect : undefined}
          showCheckboxes={activeTab !== "all"}
        />
      </div>

      {selectedAgreements.length > 0 && activeTab !== "all" && (
        <BottomActionBar>
          <Button
            style={{ backgroundColor: "#FEE600", color: "#2B2D33" }}
            onClick={handleSignAndSend}
            data-testid="button-sign-and-send"
          >
            <EditIcon style={{ marginRight: "8px" }} />
            Подписать и отправить
          </Button>
          <ActionInfo>
            <InfoItem>
              <InfoLabel>Количество</InfoLabel>
              <InfoValue>{selectedAgreements.length}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Ранняя оплата</InfoLabel>
              <InfoValue>
                {formatCurrency(calculateTotalEarlyPayment())}
              </InfoValue>
            </InfoItem>
          </ActionInfo>
        </BottomActionBar>
      )}

      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <DrawerContent>
          {drawerStep === "review" ? (
            <>
              <DrawerHeader>
                <Title>Документы на подпись</Title>
                <CloseButton onClick={handleCloseDrawer}>×</CloseButton>
              </DrawerHeader>

              <SectionTitle>Выберите способ подписи</SectionTitle>

              <SigningMethodSection>
                <CertificateItem>
                  <CertificateIndicator />
                  <CertificateInfo>
                    <CertificateName>
                      -, (Sign) ТЕСТОВ Тест Тестович
                    </CertificateName>
                    <CertificateDate>
                      Выдан 30.04.2025 10:21:37. Действителен до 30.04.2026
                    </CertificateDate>
                  </CertificateInfo>
                </CertificateItem>
              </SigningMethodSection>

              <DocumentsList>
                {Object.entries(groupByCounterparty()).map(
                  ([counterparty, agreements], groupIndex) => (
                    <DocumentCard key={groupIndex}>
                      <DocumentHeader
                        onClick={() => toggleDocumentExpansion(groupIndex)}
                      >
                        <ChevronIconWrapper
                          $isExpanded={expandedDocuments.has(groupIndex)}
                        >
                          <ChevronIcon />
                        </ChevronIconWrapper>
                        <DocumentHeaderContent>
                          <CompanyName>{counterparty}</CompanyName>
                          <StyledBadge>
                            <DocumentIcon style={{ marginRight: "6px" }} />
                            Соглашение от {agreements[0].agreementDate}
                          </StyledBadge>
                        </DocumentHeaderContent>
                      </DocumentHeader>

                      <CollapsibleContent
                        $isOpen={expandedDocuments.has(groupIndex)}
                      >
                        <DocumentDetails>
                          <DetailRow>
                            <DetailLabel>Дата ранней оплаты</DetailLabel>
                            <DetailValue>
                              {agreements[0].paymentDate}
                            </DetailValue>
                          </DetailRow>
                          <DetailRow>
                            <DetailLabel>Сумма ранней оплаты</DetailLabel>
                            <DetailValue>
                              {agreements[0].earlyPayment}
                            </DetailValue>
                          </DetailRow>
                          <DetailRow>
                            <DetailLabel>Сумма скидки</DetailLabel>
                            <DetailValue>{agreements[0].discount}</DetailValue>
                          </DetailRow>
                          <DetailRow>
                            <DetailLabel>№ договора</DetailLabel>
                            <DetailValue>
                              {agreements[0].contractNumber}
                            </DetailValue>
                          </DetailRow>
                        </DocumentDetails>
                      </CollapsibleContent>
                    </DocumentCard>
                  ),
                )}
              </DocumentsList>

              <DrawerFooter>
                <Button
                  style={{ backgroundColor: "#FEE600", color: "#2B2D33" }}
                  onClick={handleFinalSignAndSend}
                  data-testid="button-final-sign-and-send"
                >
                  Подписать и отправить
                </Button>
                <Button
                  onClick={handleCloseDrawer}
                  data-testid="button-cancel-signing"
                >
                  Закрыть
                </Button>
              </DrawerFooter>
            </>
          ) : (
            <>
              <DrawerHeader>
                <div></div>
                <CloseButton onClick={handleCloseDrawer}>×</CloseButton>
              </DrawerHeader>

              <SuccessContainer>
                <SuccessIcon>
                  <CheckmarkRingIcon />
                </SuccessIcon>
                <SuccessTitle>
                  Соглашения подписаны и<br />
                  отправлены покупателям
                </SuccessTitle>
                <Button
                  onClick={handleCloseDrawer}
                  data-testid="button-close-success"
                >
                  Закрыть
                </Button>
              </SuccessContainer>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
