import { TouchableOpacity, View } from "react-native";
import { BankAccount } from "../../../../app/entities/BankAccount";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { BlurredValue } from "../../../components/BlurredValue/BlurredValue";
import { BankAccountTypeIcon } from "../../../components/Icons/BankAccountTypeIcon";
import { Text } from "../../../components/Text";
import { useDashboard } from "../DashboardContext/useDashboard";
import { AccountsCard } from "./styles";

interface AccountCardProps {
  data: BankAccount;
  cardWidth?: number;
}

export function AccountCard({ data, cardWidth }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <TouchableOpacity
      onPress={() => openEditAccountModal(data)}
      activeOpacity={0.9}
    >
      <AccountsCard
        style={{
          borderBottomWidth: 4,
          borderBottomColor: data.color,
          ...(cardWidth ? { width: cardWidth } : {}),
        }}
      >
        <View>
          <BankAccountTypeIcon type={data.type} />
          <Text color="#343A40" weight="500" style={{ marginTop: 16 }}>
            {data.name}
          </Text>
        </View>

        <View style={{ gap: 2 }}>
          <BlurredValue visible={areValuesVisible} tint="light" intensity={55} borderRadius={6}>
            <Text color="#343A40" weight="500">
              {formatCurrency(data.currentBalance)}
            </Text>
          </BlurredValue>
          <Text color="#868e96" size={14}>
            Saldo Atual
          </Text>
        </View>
      </AccountsCard>
    </TouchableOpacity>
  );
}
