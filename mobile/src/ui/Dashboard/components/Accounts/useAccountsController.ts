import { useMemo } from "react";
import { useBankAccounts } from "../../../../hooks/useBankAccounts";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } = useDashboard();
  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(
    () => accounts.reduce((total, account) => total + account.currentBalance, 0),
    [accounts]
  );

  return {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    accounts,
    isLoading: isFetching,
    currentBalance,
  };
}
