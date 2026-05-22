import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Transaction } from "../../../../../app/entities/Transasction";
import { BottomSheetModal } from "../../../../components/BottomSheetModal/BottomSheetModal";
import { Button } from "../../../../components/Button/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput/DatePickerInput";
import { TrashIcon } from "../../../../components/Icons/TrashIcon";
import { Input } from "../../../../components/Input/Input";
import { InputCurrency } from "../../../../components/InputCurrency/InputCurrency";
import { Select } from "../../../../components/Select/Select";
import { Text } from "../../../../components/Text";
import { useEditTransactionModal } from "./useEditTransactionModal";

interface EditTransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose(): void;
}

export function EditTransactionModal({
  open,
  transaction,
  onClose,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    isLoading,
    accounts,
    categories,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete,
  } = useEditTransactionModal(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  return (
    <>
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        title={
          isExpense
            ? "Tem certeza que deseja excluir essa despesa?"
            : "Tem certeza que deseja excluir essa receita?"
        }
        description="Ao excluir a transação, o saldo da conta será atualizado automaticamente."
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />

      <BottomSheetModal
        open={open && !isDeleteModalOpen}
        title={isExpense ? "Editar Despesa" : "Editar Receita"}
        onClose={onClose}
        rightAction={
          <TouchableOpacity
            onPress={handleOpenDeleteModal}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <TrashIcon />
          </TouchableOpacity>
        }
      >
        <View style={{ marginBottom: 24 }}>
          <Text color="#6c757d" size={12}>
            {isExpense ? "Valor da despesa" : "Valor da receita"}
          </Text>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={errors.value?.message}
              />
            )}
          />
        </View>

        <View style={{ gap: 16, marginBottom: 24 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                value={value}
                onChange={onChange}
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                error={errors.categoryId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                value={value}
                onChange={onChange}
                options={accounts.map((a) => ({ value: a.id, label: a.name }))}
                error={errors.bankAccountId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </View>

        <Button onPress={handleSubmit} loading={isLoading}>
          Salvar
        </Button>

        <View style={{ height: 16 }} />
      </BottomSheetModal>
    </>
  );
}
