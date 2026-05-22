import { Controller } from "react-hook-form";
import { View } from "react-native";
import { BottomSheetModal } from "../../../../components/BottomSheetModal/BottomSheetModal";
import { Button } from "../../../../components/Button/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput/DatePickerInput";
import { Input } from "../../../../components/Input/Input";
import { InputCurrency } from "../../../../components/InputCurrency/InputCurrency";
import { Select } from "../../../../components/Select/Select";
import { Text } from "../../../../components/Text";
import { useNewTransactionModal } from "./useNewTransactionModal";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    isLoading,
    accounts,
    categories,
  } = useNewTransactionModal();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <BottomSheetModal
      open={isNewTransactionModalOpen}
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      onClose={closeNewTransactionModal}
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
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
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
        Criar
      </Button>

      <View style={{ height: 16 }} />
    </BottomSheetModal>
  );
}
