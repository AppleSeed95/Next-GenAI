"use client"

import * as React from "react"

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
// import { ProjectContext } from "../compaign/page"

type Mode = {
  value: string
  label: string
}

const modes: Mode[] = [
  {
    value: "autopilot",
    label: "Autopilot",
  },
  {
    value: "suggestmode",
    label: "Suggestmode",
  },
  // {
  //   value: "in progress",
  //   label: "In Progress",
  // },
  // {
  //   value: "done",
  //   label: "Done",
  // },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  // },
]

export function Comboboxsuggest() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Mode | null>(
    null
  )
  // const context = React.useContext(ProjectContext)

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.label}
              </>
            ) : (
              <>Set Mode</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change Mode" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {modes.map((mode) => (
                  <CommandItem
                    key={mode.value}
                    value={mode.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        modes.find((priority) => priority.value === value) ||
                        null
                        
                      )
                      setOpen(false)
                    }}
                  >
                    <span>{mode.label}</span>
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
