"use client"

import { Calendar } from "@kit/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@kit/ui/popover"
import { Button } from "@kit/ui/button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { cn } from "@kit/ui/utils";
import { DateRange } from "@kit/ui/calendar";

export function DatePickerWithRange({
   className,
 }: React.HTMLAttributes<HTMLDivElement>) {
   const [date, setDate] = useState<DateRange | undefined>({
     from: new Date(),
     to: addDays(new Date(), 0),
   })
  
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
               <span>Pick a date</span>
             )}
           </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
           <Calendar
             initialFocus
             mode="range"
             defaultMonth={date?.from}
             selected={date}
             onSelect={setDate}
             numberOfMonths={2}
           />
         </PopoverContent>
       </Popover>
     </div>
   )
 }