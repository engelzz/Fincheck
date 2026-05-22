import { useState } from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from '../Icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../Icons/ChevronRight';
import { CloseIcon } from '../Icons/CloseIcon';
import { Text } from '../Text';
import {
  ConfirmButton,
  Container,
  DateButton,
  DateText,
  DragHandle,
  ErrorText,
  Header,
  HeaderSpacer,
  MonthItem,
  Overlay,
  OverlayTouchable,
  PickerRow,
  PickerSection,
  PickerSectionTitle,
  Sheet,
} from './styles';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

interface DatePickerInputProps {
  value: Date;
  onChange(date: Date): void;
  error?: string;
}

export function DatePickerInput({ value, onChange, error }: DatePickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(value.getDate());
  const [month, setMonth] = useState(value.getMonth());
  const [year, setYear] = useState(value.getFullYear());

  function handleOpen() {
    setDay(value.getDate());
    setMonth(value.getMonth());
    setYear(value.getFullYear());
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    const maxDay = new Date(year, month + 1, 0).getDate();
    onChange(new Date(year, month, Math.min(day, maxDay)));
    setIsOpen(false);
  }

  function handleChangeDay(step: number) {
    setDay((prev) => {
      const maxDay = new Date(year, month + 1, 0).getDate();
      const next = prev + step;
      if (next < 1) return maxDay;
      if (next > maxDay) return 1;
      return next;
    });
  }

  const formatted = `${String(value.getDate()).padStart(2, '0')}/${String(
    value.getMonth() + 1,
  ).padStart(2, '0')}/${value.getFullYear()}`;

  return (
    <Container>
      <DateButton onPress={handleOpen} hasError={!!error}>
        <DateText>{formatted}</DateText>
      </DateButton>
      {error && <ErrorText>{error}</ErrorText>}

      <Modal visible={isOpen} animationType="slide" transparent statusBarTranslucent>
        <Overlay>
          <OverlayTouchable activeOpacity={1} onPress={handleClose} />
          <Sheet>
            <DragHandle />
            <Header>
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <CloseIcon />
              </TouchableOpacity>
              <Text weight="600" size={16} color="#212529">
                Data
              </Text>
              <HeaderSpacer />
            </Header>

            <PickerSection>
              <PickerSectionTitle>Dia</PickerSectionTitle>
              <PickerRow>
                <TouchableOpacity
                  onPress={() => handleChangeDay(-1)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <ChevronLeftIcon />
                </TouchableOpacity>
                <Text size={18} weight="600" color="#212529">
                  {String(day).padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  onPress={() => handleChangeDay(1)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <ChevronRightIcon />
                </TouchableOpacity>
              </PickerRow>
            </PickerSection>

            <PickerSection>
              <PickerSectionTitle>Mês</PickerSectionTitle>
              <FlatList
                data={MONTHS}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <MonthItem isSelected={index === month} onPress={() => setMonth(index)}>
                    <Text
                      size={14}
                      weight={index === month ? '600' : undefined}
                      color={index === month ? '#087f5b' : '#495057'}
                    >
                      {item}
                    </Text>
                  </MonthItem>
                )}
              />
            </PickerSection>

            <PickerSection>
              <PickerSectionTitle>Ano</PickerSectionTitle>
              <PickerRow>
                <TouchableOpacity
                  onPress={() => setYear((y) => y - 1)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <ChevronLeftIcon />
                </TouchableOpacity>
                <Text size={18} weight="600" color="#212529">
                  {year}
                </Text>
                <TouchableOpacity
                  onPress={() => setYear((y) => y + 1)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <ChevronRightIcon />
                </TouchableOpacity>
              </PickerRow>
            </PickerSection>

            <ConfirmButton onPress={handleConfirm}>
              <Text weight="600" color="#fff">
                Confirmar
              </Text>
            </ConfirmButton>
          </Sheet>
        </Overlay>
      </Modal>
    </Container>
  );
}
