import { TouchableOpacity, View } from "react-native";
import { MONTHS } from "../../../../../config/constants";
import { ChevronLeftIcon } from "../../../../components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRight";
import { Text } from "../../../../components/Text";
import { SwiperWrapper } from "./styles";

interface TransactionSwipperProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export function TransactionSwipper({ selectedMonth, onMonthChange }: TransactionSwipperProps) {
  function handlePrev() {
    onMonthChange(selectedMonth === 0 ? 11 : selectedMonth - 1);
  }

  function handleNext() {
    onMonthChange(selectedMonth === 11 ? 0 : selectedMonth + 1);
  }

  return (
    <SwiperWrapper>
      <TouchableOpacity onPress={handlePrev} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <ChevronLeftIcon />
      </TouchableOpacity>

      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Text size={14} weight="500" color="#343A40">
          {MONTHS[selectedMonth]}
        </Text>
      </View>

      <TouchableOpacity onPress={handleNext} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <ChevronRightIcon />
      </TouchableOpacity>
    </SwiperWrapper>
  );
}
