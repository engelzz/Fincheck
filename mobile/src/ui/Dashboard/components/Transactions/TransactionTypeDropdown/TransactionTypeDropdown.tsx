import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ChevronDownIcon } from "../../../../components/Icons/ChevronDownIcon";
import { ExpensesIcon } from "../../../../components/Icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/Icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/Icons/TransactionsIcon";
import { Text } from "../../../../components/Text";

type TransactionType = "INCOME" | "EXPENSE" | undefined;

interface TransactionTypeDropdownProps {
  selectedType: TransactionType;
  onSelect: (type: TransactionType) => void;
}

const OPTIONS = [
  { label: "Transações", type: undefined as TransactionType, Icon: TransactionsIcon },
  { label: "Receitas", type: "INCOME" as TransactionType, Icon: IncomeIcon },
  { label: "Despesas", type: "EXPENSE" as TransactionType, Icon: ExpensesIcon },
];

function getSelectedOption(type: TransactionType) {
  return OPTIONS.find((o) => o.type === type) ?? OPTIONS[0];
}

export function TransactionTypeDropdown({
  selectedType,
  onSelect,
}: TransactionTypeDropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = getSelectedOption(selectedType);
  const SelectedIcon = selected.Icon;

  function handleSelect(type: TransactionType) {
    onSelect(type);
    setOpen(false);
  }

  return (
    <View style={{ zIndex: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.7}
      >
        <SelectedIcon />
        <Text color="#343A40" weight="500" size={14}>
          {selected.label}
        </Text>
        <ChevronDownIcon />
      </TouchableOpacity>

      {open && (
        <View
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            backgroundColor: "#fff",
            borderRadius: 16,
            paddingVertical: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            minWidth: 180,
            zIndex: 10,
          }}
        >
          <FlatList
            data={OPTIONS}
            keyExtractor={(item) => item.label}
            scrollEnabled={false}
            renderItem={({ item: { label, type, Icon } }) => {
              const isActive = type === selectedType;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(type)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: isActive ? "#f8f9fa" : "transparent",
                  }}
                >
                  <Icon />
                  <Text
                    weight={isActive ? "600" : "500"}
                    size={14}
                    color={isActive ? "#212529" : "#495057"}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
