import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Button } from "../../../../components/Button/Button";
import { ChevronLeftIcon } from "../../../../components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRight";
import { CloseIcon } from "../../../../components/Icons/CloseIcon";
import { Text } from "../../../../components/Text";
import { useFiltersModal } from "./useFiltersModal";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {bankAccountId: string | undefined, year: number;}): void;
  rightAction?: React.ReactNode;
}

export function FiltersModal({open, onClose, onApplyFilters, rightAction}: FiltersModalProps) {
  const { selectedBankAccountId, handleSelectBankAccount, selectedYear, handleChangeYear, accounts } = useFiltersModal();

  return (
    <Modal
      visible={open}
      animationType="slide"
      presentationStyle='pageSheet'
    >

      <View style={{padding: 48}}>
        <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingBottom: 40, paddingTop: 28}}>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>

            <Text weight="600">Filtros</Text>

            <View>{rightAction}</View>
        </View>
        
        <View>
          <Text size={18} color="#343A40" weight="700">Conta</Text>

          <TouchableOpacity style={{marginTop: 24, marginLeft: 8, gap: 16}}>
            <Text size={16} color="#343A40">Nubank</Text>
            <Text size={16} color="#343A40">Inter</Text>
            <Text size={16} color="#343A40">XP Investimentos</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 80}}>
          <Text size={18} color="#343A40" weight="700">Ano</Text>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between' , marginTop: 24}}>
            <ChevronLeftIcon />
            <Text size={18} color="#343A40">{selectedYear}</Text>
            <ChevronRightIcon />
          </View>
        </View>

        <View style={{marginTop: 72}}>
          <Button 
            onPress={() => onApplyFilters({
              bankAccountId: selectedBankAccountId,
              year: selectedYear,
          })}>
            <Text color="#fff" weight="600">Aplicar Filtros</Text>
          </Button>
        </View>
      </View>  
    </Modal>
  )
}