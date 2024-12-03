import { TouchableOpacity, View } from "react-native";
import { EyeIcon } from "../../../components/Icons/EyeIcon";
import { Text } from "../../../components/Text";
import { AccountCard } from "../AccountsCard/AccountCard";
import { Accounts } from "./styles";

export function Account() {
  return (
    <Accounts>
      <Text color="#fff">Saldo total</Text>

      <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
        <Text color="#fff" weight="600" size={32}>R$ 100,00</Text>
        
        <TouchableOpacity style={{height: 8, width: 8, justifyContent: "center"}}>
          <EyeIcon open/>
        </TouchableOpacity>
      </View>

      <Text color="#fff" weight="600" size={18} style={{marginTop: 40, marginBottom: 16}}>Minhas Contas</Text>

      <AccountCard />
  </Accounts>
  )
}