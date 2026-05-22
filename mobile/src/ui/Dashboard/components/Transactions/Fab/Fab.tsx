import { useContext, useState } from "react";
import { View } from "react-native";
import { BankAccountIcon } from "../../../../components/Icons/BankAccountIcon";
import { CloseIcon } from "../../../../components/Icons/CloseIcon";
import { ExpensesIcon } from "../../../../components/Icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/Icons/IncomeIcon";
import { PlusIcon } from "../../../../components/Icons/PlusIcon";
import { Text } from "../../../../components/Text";
import { DashboardContext } from "../../DashboardContext/DashboardContext";
import {
  FabButton,
  FabMenu,
  FabMenuLabel,
  FabMenuRow
} from "./styles";

export function Fab() {
  const [isOpen, setIsOpen] = useState(false);
  const { openNewTransactionModal, openNewAccountModal } =
    useContext(DashboardContext);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function handleNewExpense() {
    setIsOpen(false);
    openNewTransactionModal("EXPENSE");
  }

  function handleNewIncome() {
    setIsOpen(false);
    openNewTransactionModal("INCOME");
  }

  function handleNewAccount() {
    setIsOpen(false);
    openNewAccountModal();
  }

  return (
    <View style={{ alignItems: "flex-end" }}>
      {isOpen && (
        <FabMenu>
          <FabMenuRow onPress={handleNewExpense}>
            <ExpensesIcon />
            <FabMenuLabel>
              <Text size={14} weight="600" color="#212529">
                Nova Despesa
              </Text>
            </FabMenuLabel>
          </FabMenuRow>

          <FabMenuRow onPress={handleNewIncome}>
            <IncomeIcon />

            <FabMenuLabel>
              <Text size={14} weight="600" color="#212529">
                Nova Receita
              </Text>
            </FabMenuLabel>
          </FabMenuRow>

          <FabMenuRow onPress={handleNewAccount}>
            <BankAccountIcon />
            <FabMenuLabel>
              <Text size={14} weight="600" color="#212529">
                Nova Conta
              </Text>
            </FabMenuLabel>
          </FabMenuRow>
        </FabMenu>
      )}

      <FabButton onPress={toggle} activeOpacity={isOpen ? 0.9 : 0.2}>
        {isOpen ? <CloseIcon color="#fff" /> : <PlusIcon />}
      </FabButton>
    </View>
  );
}
