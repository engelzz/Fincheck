import { Swiper, SwiperSlide } from "swiper/react";
import emptyStateImage from "../../../../../assets/empty-state.svg";
import { MONTHS } from "../../../../../config/constants";
import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { FormatDate } from "../../../../../utils/formatDate";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Spinner } from "../../../../components/Spinner";
import { EditTransactionModal } from "../../modals/EditTransactionsModal/editTransactionModal";
import { FiltersModal } from "./FiltersModal/FiltersModal";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

export default function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    transactions,
    isInitialLoading,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionBeingEdited
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex);
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1">
            {isLoading && (
              <div className="flex items-center flex-col h-full justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex items-center flex-col h-full justify-center">
                <img src={emptyStateImage} alt="empty state" />

                <p className="text-gray-700">
                  Não encontramos nenhuma transação
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>

                {transactionBeingEdited && (
                  <EditTransactionModal open={isEditModalOpen} onClose={handleCloseEditModal} transaction={transactionBeingEdited}/>
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    role="button"
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {FormatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-red-800 tracking-[-0.5px] font-medium",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800",
                        !areValuesVisible && "blur-sm"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "- " : "+ "}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}

                <div className="mt-4">
                  <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon type="income" />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          Salario
                        </strong>
                        <span className="text-sm text-gray-600">
                          03/12/2024
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-green-800 tracking-[-0.5px] font-medium",
                        !areValuesVisible && "blur-sm"
                      )}
                    >
                      {formatCurrency(10000.9)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
