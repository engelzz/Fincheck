import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { EyeIcon } from "../../../components/Icons/EyeIcon";
import { PlusIcon } from "../../../components/Icons/PlusIcon";
import { Spinner } from "../../../components/Icons/Spinner";
import { Text } from "../../../components/Text";
import { AccountCard } from "../AccountsCard/AccountCard";
import { Accounts } from "./styles";
import { useAccountsController } from "./useAccountsController";

export function Account() {
  const {
    accounts,
    isLoading,
    currentBalance,
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useAccountsController();

  const { width } = useWindowDimensions();
  const cardWidth = width - 80;

  return (
    <Accounts>
      <Text color="#fff">Saldo Total</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginTop: 4,
        }}
      >
        <Text
          color="#fff"
          weight="600"
          size={32}
          style={
            !areValuesVisible
              ? {
                  color: "transparent",
                  textShadowColor: "rgba(255,255,255,0.9)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 12,
                }
              : undefined
          }
        >
          {formatCurrency(currentBalance)}
        </Text>

        <TouchableOpacity
          style={{ height: 24, width: 24, justifyContent: "center" }}
          onPress={toggleValueVisibility}
        >
          <EyeIcon open={areValuesVisible} />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Spinner color="rgba(255,255,255,0.5)" size={32} />
        </View>
      )}

      {!isLoading && (
        <>
          <Text
            color="#fff"
            weight="600"
            size={18}
            style={{ marginTop: 40, marginBottom: 16 }}
          >
            Minhas Contas
          </Text>

          {accounts.length === 0 ? (
            <TouchableOpacity
              style={{
                height: 200,
                borderRadius: 16,
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: "#2f9e44",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
              onPress={openNewAccountModal}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  borderWidth: 2,
                  borderStyle: "dashed",
                  borderColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlusIcon />
              </View>
              <Text
                color="#fff"
                weight="600"
                size={14}
                style={{ textAlign: "center", width: 128 }}
              >
                Cadastre uma nova conta
              </Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + 16}
              decelerationRate="fast"
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              renderItem={({ item }) => (
                <AccountCard data={item} cardWidth={cardWidth} />
              )}
            />
          )}
        </>
      )}
    </Accounts>
  );
}
