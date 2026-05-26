import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import { EmptyState } from "../../../../assets/images/emptyState";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { FormatDate } from "../../../../utils/formatDate";
import { BlurredValue } from "../../../components/BlurredValue/BlurredValue";
import { CategoryIcon } from "../../../components/Icons/categories/CategoryIcon";
import { FilterIcon } from "../../../components/Icons/FilterIcon";
import { Text } from "../../../components/Text";
import { EditTransactionModal } from "../Modals/EditTransactionModal/EditTransactionModal";
import { FiltersModal } from "./FiltersModal/FiltersModal";
import {
  Header,
  TransactionCard,
  TransactionDetails,
  Transactions,
} from "./styles";
import { TransactionSwipper } from "./TransactionSwiper/TransactionSwiper";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown/TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

export function Transaction() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  return (
    <Transactions>
      {isEditModalOpen && (
        <EditTransactionModal
          open={isEditModalOpen}
          transaction={transactionBeingEdited}
          onClose={handleCloseEditModal}
        />
      )}

      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
        onApplyFilters={handleApplyFilters}
      />

      <Header>
        <TransactionTypeDropdown
          selectedType={filters.type}
          onSelect={handleChangeFilters("type")}
        />

        <TouchableOpacity onPress={handleOpenFiltersModal}>
          <FilterIcon />
        </TouchableOpacity>
      </Header>

      <TransactionSwipper
        selectedMonth={filters.month}
        onMonthChange={handleChangeFilters("month")}
      />

      {isInitialLoading && (
        <View style={{ paddingVertical: 32, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#087f5b" />
        </View>
      )}

      {!isInitialLoading && isLoading && (
        <View style={{ paddingVertical: 32, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#087f5b" />
        </View>
      )}

      {!isInitialLoading && !isLoading && transactions.length === 0 && (
        <View style={{ alignItems: "center", paddingVertical: 32, gap: 16 }}>
          <EmptyState />
          <Text color="#6c757d" size={14} style={{ textAlign: "center" }}>
            Não encontramos nenhuma transação!
          </Text>
        </View>
      )}

      {!isInitialLoading && !isLoading && transactions.length > 0 && (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={{ marginTop: 8 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOpenEditModal(item)}
              activeOpacity={0.8}
            >
              <TransactionCard>
                <View style={{ alignItems: "center" }}>
                  <CategoryIcon
                    type={item.type === "EXPENSE" ? "expense" : "income"}
                    category={item.category?.icon}
                  />
                </View>

                <TransactionDetails>
                  <Text weight="600">{item.name}</Text>
                  <Text color="#868E96" size={14}>
                    {FormatDate(new Date(item.date))}
                  </Text>
                </TransactionDetails>

                <BlurredValue visible={areValuesVisible} tint="light" intensity={55} borderRadius={4}>
                  <Text
                    weight="500"
                    color={item.type === "EXPENSE" ? "#E03131" : "#2f9e44"}
                  >
                    {item.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(item.value)}
                  </Text>
                </BlurredValue>
              </TransactionCard>
            </TouchableOpacity>
          )}
        />
      )}
    </Transactions>
  );
}
