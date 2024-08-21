import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../hooks/useBankAccounts";
import { useWindowWidth } from "../../../../../hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export default function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching} = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValueVisibility,
    areValuesVisible,
    openNewAccountModal,
    isLoading: isFetching,
    accounts,
    currentBalance,
  }
}
