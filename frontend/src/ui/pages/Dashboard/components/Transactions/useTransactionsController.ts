import { useEffect, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transasction";
import { TransactionsFilters } from "../../../../../app/services/TransactionsService/getAll";
import { useTransactions } from "../../../../../hooks/useTransactions";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen,] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);


  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const { transactions, isLoading, isInitialLoading, refetch } = useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [refetch, filters])

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleApplyFilters({bankAccountId, year}: {bankAccountId: string | undefined, year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction)
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null)
  }


  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading: isLoading,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    transactionBeingEdited,
    isEditModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
  }
}
