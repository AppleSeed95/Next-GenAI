"use client"

import * as React from "react"
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react"

import { cn } from "@kit/ui/utils"
import { Button } from "@kit/ui/button"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@kit/ui/command"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@kit/ui/popover"

type State = {
  value: string
  label: string
  icon: LucideIcon
}

const states: State[] = [
//   {
//     value: "backlog",
//     label: "Backlog",
//     icon: HelpCircle,
//   },
//   {
//     value: "todo",
//     label: "Todo",
//     icon: Circle,
//   },
//   {
//     value: "in progress",
//     label: "In Progress",
//     icon: ArrowUpCircle,
//   },
  {
    value: "active",
    label: "Active",
    icon: CheckCircle2,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: XCircle,
  },
]

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedState, setSelectedState] = React.useState<State | null>(
    null
  )

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedState ? (
              <>
                <selectedState.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedState.label}
              </>
            ) : (
              <>Set state</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change state..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    value={state.value}
                    onSelect={(value) => {
                      setSelectedState(
                        states.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <state.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        state.value === selectedState?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{state.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
