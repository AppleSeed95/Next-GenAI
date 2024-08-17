"use client"

import { Calendar } from "@kit/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kit/ui/popover"
import { Button } from "@kit/ui/button";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { cn } from "@kit/ui/utils";
import { DateRange } from "@kit/ui/calendar";
import { useTranslation } from "react-i18next";
import { DateRangeType } from "../../compaign/new/_components/compaign-header";

type DatePickerWithRangeProps = {
  className?: string,
  dateRange?: DateRangeType,
  onChange: (dateRange: DateRangeType) => void,
  from: string,
  to: string
}

export function DatePickerWithRange({
  from,
  to,
  className,
  dateRange,
  onChange
}: DatePickerWithRangeProps) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: from?.length > 0 ? new Date(from) : undefined,
    to: from?.length > 0 ? addDays(new Date(to), 0) : undefined,
  })

  const { t } = useTranslation();
  useEffect(() => {
    setDate({
      from: from?.length > 0 ? new Date(from) : undefined,
      to: from?.length > 0 ? addDays(new Date(to), 0) : undefined,
    })
  }, [from, to]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{t('Pick a date')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(v: DateRange | undefined) => {
              setDate(v);
              if (v) {
                onChange(v);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}