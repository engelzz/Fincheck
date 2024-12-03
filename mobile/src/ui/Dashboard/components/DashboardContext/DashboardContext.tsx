import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility(): void;
  isNewAccountModalOpen: boolean;
  closeNewAccountModal(): void;
  openNewAccountModal(): void;
  openEditAccountModal(bankAccount: BankAccount): void,
  closeEditAccountModal(): void,
  accountBeingEdited: null | BankAccount;
  isNewTransactionModalOpen: boolean;
  isEditAccountModalOpen: boolean,
  newTransactionType: 'INCOME' | 'EXPENSE' | null,
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'
  ): void;
  closeNewTransactionModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: {children: React.ReactNode}) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);


  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsAccountModalOpen(true)
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsAccountModalOpen(false)
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsTransactionModalOpen(true)
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsTransactionModalOpen(false)
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setIsEditAccountModalOpen(true)
    setAccountBeingEdited(bankAccount);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false)
    setIsEditAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
    value={{
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      closeNewAccountModal,
      openNewAccountModal,
      isNewTransactionModalOpen,
      openNewTransactionModal,
      closeNewTransactionModal,
      newTransactionType,
      isEditAccountModalOpen,
      openEditAccountModal,
      closeEditAccountModal,
      accountBeingEdited,
    }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
