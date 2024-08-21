import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { FormatDate } from "../../utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({ error, className, value, onChange }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
          type="button"
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all",
            "outline-none text-left relative pt-4",
            error && "!border-red-900",
            className
          )}
        >
          <span className="text-xs text-gray-700 pointer-events-none top-2 absolute left-[13px]">Data</span>

          <span>
            {FormatDate(selectedDate)}
          </span>
        </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate}/>
        </Popover.Content>
      </Popover.Root>

      {error && (
      <div className="flex items-center gap-2 mt-2 text-red-900" >
        <CrossCircledIcon />

        <span className="text-xs">{error}</span>
      </div>
    )}
    </div>
  );
}
