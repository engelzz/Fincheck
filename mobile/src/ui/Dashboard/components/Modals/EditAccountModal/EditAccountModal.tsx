import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "../../../../components/BottomSheetModal/BottomSheetModal";
import { Button } from "../../../../components/Button/Button";
import { ColorPickerInput } from "../../../../components/ColorPickerInput/ColorPickerInput";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/Icons/TrashIcon";
import { Input } from "../../../../components/Input/Input";
import { InputCurrency } from "../../../../components/InputCurrency/InputCurrency";
import { Select } from "../../../../components/Select/Select";
import { Text } from "../../../../components/Text";
import { useEditAccountModal } from "./useEditAccountModal";

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CHECKING", label: "Conta Corrente" },
  { value: "INVESTMENT", label: "Investimentos" },
  { value: "CASH", label: "Dinheiro Físico" },
];

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    control,
    errors,
    handleSubmit,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountModal();

  return (
    <>
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />

      <BottomSheetModal
        open={isEditAccountModalOpen && !isDeleteModalOpen}
        title="Editar Conta"
        onClose={closeEditAccountModal}
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
          Salvar
        </Button>

        <View style={{ height: 16 }} />
      </BottomSheetModal>
    </>
  );
}
