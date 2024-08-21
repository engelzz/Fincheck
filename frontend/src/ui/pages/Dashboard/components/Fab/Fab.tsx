import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { Income } from "../../../../components/icons/categories/income/Income";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="w-12 h-12 bg-teal-900 text-white rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <Expense />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
            <Income/>
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
