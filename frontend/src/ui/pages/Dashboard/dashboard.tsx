import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import Accounts from "./components/Accounts/Accounts";
import { DashboardContext, DashboardProvider } from "./components/DashboardContext/DashboardContext";
import { Fab } from "./components/Fab/Fab";
import { Transactions } from "./components/Transactions/Transactions";
import { EditAccountModal } from "./modals/EditAccountModal/editAccountModal";
import { NewAccountModal } from "./modals/NewAccountModal/newAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionsModal/newTransactionModal";


export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-center justify-between">
              <Logo className="text-teal-900 h-6"/>
              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>

              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
        </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
