import { View } from "react-native";
import { CashIcon } from "../../../components/Icons/BankAccountTypeIcon/CashIcon";
import { Text } from "../../../components/Text";
import { AccountsCard } from "./styles";

export function AccountCard() {
  return (
    <AccountsCard style={{borderBottomWidth: 4, borderBottomColor: '#AE3EC9'}}>
      <View>
        <CashIcon />
        <Text color="#343A40" weight="500" style={{marginTop: 16}}>Carteira</Text>
      </View>

      <View style={{gap: 2}}>
        <Text color="#343A40" weight="500">R$ 123,00</Text>
        <Text color="#868e96" size={14}>Saldo Atual</Text>
      </View>
    </AccountsCard>
  )
}