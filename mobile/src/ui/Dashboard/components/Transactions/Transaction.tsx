import React from "react";
import { TouchableOpacity, View } from "react-native";

import { FormatDate } from "../../../../utils/formatDate";
import { CategoryIcon } from "../../../components/Icons/categories/CategoryIcon";
import { ChevronDownIcon } from "../../../components/Icons/ChevronDownIcon";
import { FilterIcon } from "../../../components/Icons/FilterIcon";
import { TransactionsIcon } from "../../../components/Icons/TransactionsIcon";
import { Text } from "../../../components/Text";
import { FiltersModal } from "./FiltersModal/FiltersModal";
import { Header, TransactionCard, TransactionDetails, Transactions } from "./styles";
import { TransactionSwipper } from "./TransactionSwiper/TransactionSwiper";
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
    isEditModalOpen,
    transactionBeingEdited,
    handleCloseEditModal,
    handleOpenEditModal,
  } = useTransactionsController();

  return (
    <Transactions>
      <FiltersModal
          open={isFiltersModalOpen}
          onClose={handleCloseFiltersModal}
          onApplyFilters={handleApplyFilters}
      />
      
      <Header>
       <TouchableOpacity style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
        <TransactionsIcon />

        <Text color="#343A40" weight="500" size={14}>Transações</Text>

        <ChevronDownIcon />
       </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenFiltersModal}>
          <FilterIcon />
        </TouchableOpacity>
        
      </Header>

      <View style={{marginTop: 8, marginBottom: 8}}>
        <TransactionSwipper />
      </View>
      
      {/* <View 
        style={{alignItems: "center", justifyContent: "center",}}
      >
        <EmptyState />

        <Text>
          Você ainda não cadastrou nada, você pode começar por suas contas,
          depois receitas e despesas :)
        </Text>
      </View> */}

      <TransactionCard>
        <View style={{alignItems: 'center'}}>
          <CategoryIcon 
            type="expense"
          />
        </View>

        <TransactionDetails>
            <Text weight="600">Conta de Luz</Text>

            <Text color="#868E96" size={14}>{FormatDate(new Date())}</Text>
          </TransactionDetails>

        <Text weight="500" color="#E03131">-R$100,00</Text>
      </TransactionCard>
    </Transactions>
  )
}