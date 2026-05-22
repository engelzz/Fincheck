import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "../components/Icons/Logo";
import { UserMenu } from "../components/UserMenu/userMenu";
import { Account } from "./components/Accounts/Account";
import {
  DashboardContext,
  DashboardProvider,
} from "./components/DashboardContext/DashboardContext";
import { EditAccountModal } from "./components/Modals/EditAccountModal/EditAccountModal";
import { NewAccountModal } from "./components/Modals/NewAccountModal/NewAccountModal";
import { NewTransactionModal } from "./components/Modals/NewTransactionModal/NewTransactionModal";
import { Fab } from "./components/Transactions/Fab/Fab";
import { Transaction } from "./components/Transactions/Transaction";
import { Container, FabContainer, Header } from "./styles";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <SafeAreaView style={{ flex: 1 }}>
            <Container
              contentContainerStyle={{ padding: 8, paddingBottom: 80 }}
            >
              <Header>
                <Logo color="#087f5b" />

                <UserMenu />
              </Header>

              <View style={{ gap: 16 }}>
                <View style={{ width: "100%" }}>
                  <Account />
                </View>

                <View style={{ width: "100%" }}>
                  <Transaction />
                </View>
              </View>
            </Container>

            <FabContainer>
              <Fab />
            </FabContainer>

            <NewAccountModal />
            <EditAccountModal />
            <NewTransactionModal />
          </SafeAreaView>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
