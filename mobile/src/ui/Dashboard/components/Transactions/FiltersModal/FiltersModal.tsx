import React from "react";
import { FlatList, Modal, TouchableOpacity } from "react-native";
import { Button } from "../../../../components/Button/Button";
import { ChevronLeftIcon } from "../../../../components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRight";
import { CloseIcon } from "../../../../components/Icons/CloseIcon";
import { Text } from "../../../../components/Text";
import { useFiltersModal } from "./useFiltersModal";
import {
  AccountItem,
  ButtonSection,
  DragHandle,
  Header,
  HeaderSpacer,
  Overlay,
  OverlayTouchable,
  Separator,
  SectionTitle,
  Sheet,
  YearRow,
  YearSection,
} from "./styles";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  } = useFiltersModal();

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <Overlay>
        <OverlayTouchable activeOpacity={1} onPress={onClose} />

        <Sheet>
          <DragHandle />

          <Header>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <CloseIcon />
            </TouchableOpacity>

            <Text weight="600" size={16} color="#212529">
              Filtros
            </Text>

            <HeaderSpacer />
          </Header>

          <SectionTitle>
            <Text weight="700" size={18} color="#212529">
              Conta
            </Text>
          </SectionTitle>

          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 16 }}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({ item }) => (
              <AccountItem onPress={() => handleSelectBankAccount(item.id)}>
                <Text
                  size={16}
                  color={selectedBankAccountId === item.id ? "#087f5b" : "#495057"}
                  weight={selectedBankAccountId === item.id ? "600" : "500"}
                >
                  {item.name}
                </Text>
              </AccountItem>
            )}
          />

          <YearSection>
            <Text weight="700" size={18} color="#212529">
              Ano
            </Text>

            <YearRow>
              <TouchableOpacity
                onPress={() => handleChangeYear(-1)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <ChevronLeftIcon />
              </TouchableOpacity>

              <Text size={18} weight="600" color="#212529">
                {selectedYear}
              </Text>

              <TouchableOpacity
                onPress={() => handleChangeYear(1)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <ChevronRightIcon />
              </TouchableOpacity>
            </YearRow>
          </YearSection>

          <ButtonSection>
            <Button
              onPress={() =>
                onApplyFilters({
                  bankAccountId: selectedBankAccountId,
                  year: selectedYear,
                })
              }
            >
              Aplicar Filtros
            </Button>
          </ButtonSection>
        </Sheet>
      </Overlay>
    </Modal>
  );
}
