import { Controller } from "react-hook-form";
import { View } from "react-native";
import { BottomSheetModal } from "../../../../components/BottomSheetModal/BottomSheetModal";
import { Button } from "../../../../components/Button/Button";
import { ColorPickerInput } from "../../../../components/ColorPickerInput/ColorPickerInput";
import { Input } from "../../../../components/Input/Input";
import { InputCurrency } from "../../../../components/InputCurrency/InputCurrency";
import { Select } from "../../../../components/Select/Select";
import { Text } from "../../../../components/Text";
import { useNewAccountModal } from "./useNewAccountModal";

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CHECKING", label: "Conta Corrente" },
  { value: "INVESTMENT", label: "Investimentos" },
  { value: "CASH", label: "Dinheiro" },
];

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    control,
    errors,
    handleSubmit,
    isLoading,
  } = useNewAccountModal();

  return (
    <BottomSheetModal
      open={isNewAccountModalOpen}
      title="Nova Conta"
      onClose={closeNewAccountModal}
    >
      <View style={{ marginBottom: 24 }}>
        <Text color="#6c757d" size={12}>
          Saldo Inicial
        </Text>
        <Controller
          control={control}
          name="initialBalance"
          render={({ field: { onChange, value } }) => (
            <InputCurrency
              value={value}
              onChange={onChange}
              error={errors.initialBalance?.message}
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
              placeholder="Nome da Conta"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Tipo"
              value={value}
              onChange={onChange}
              options={ACCOUNT_TYPE_OPTIONS}
              error={errors.type?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="color"
          render={({ field: { onChange, value } }) => (
            <ColorPickerInput
              value={value}
              onChange={onChange}
              error={errors.color?.message}
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
