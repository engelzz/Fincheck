import { SafeAreaView, View } from "react-native";

import { Logo } from "../components/Icons/Logo";
import { UserMenu } from "../components/UserMenu/userMenu";
import { Account } from "./components/Accounts/Account";
import { DashboardContext, DashboardProvider } from "./components/DashboardContext/DashboardContext";
import { Fab } from "./components/Transactions/Fab/Fab";
import { Transaction } from "./components/Transactions/Transaction";
import { Container, Header } from "./styles";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
          {({ accountBeingEdited }) => (
            <SafeAreaView>
            <Container>
              <Header>
                <Logo color="#087f5b"/>
    
                <UserMenu />
              </Header>
    
              <View style={{gap: 16}}>
                <View style={{width: '100%'}}>
                  <Account />
                </View>
    
                <View style={{width: '100%'}}>
                  <Transaction />
                </View>
              </View>
            </Container>
              <SafeAreaView style={{alignItems: 'flex-end', right: 16, bottom: 16}}>
                <Fab />
              </SafeAreaView>
            </SafeAreaView>
          )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}