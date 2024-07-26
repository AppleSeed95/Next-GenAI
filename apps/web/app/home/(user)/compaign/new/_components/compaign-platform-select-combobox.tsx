"use client"

import * as React from "react"

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
import { useTranslation } from "react-i18next"

type pPlatform = {
  value: string
  label: string
}

const pPlatforms: pPlatform[] = [
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "tiktok",
    label: "TikTok",
  },
  {
    value: "wordpress",
    label: "Wordpress",
  },
  {
    value: "contao",
    label: "Contao",
  },
  {
    value: "joomla",
    label: "Joomla",
  },
]

type Props = {
  onChange: (pPlatform: string) => void,
}


export function PlatformSelectForCompaingnComboboxDemo(props: Props) {
  const [open, setOpen] = React.useState(false)
  const [selectedpPlatform, setSelectedpPlatform] = React.useState<pPlatform | null>(
    {
      value: "linkedin",
      label: "LinkedIn",
    },
  )
  const { t } = useTranslation();

  return (
    <div className="flex w-full sm:items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[200px] justify-start"
          >
            {selectedpPlatform ? (
              <>
                {selectedpPlatform.label}
              </>
            ) : (
              <>{t('pPlatform')}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change pPlatform..." />
            <CommandList>
              <CommandEmpty>{t('No results found.')}</CommandEmpty>
              <CommandGroup>
                {pPlatforms.map((pPlatform) => (
                  <CommandItem
                    key={pPlatform.value}
                    value={pPlatform.value}
                    onSelect={(value) => {
                      setSelectedpPlatform(
                        pPlatforms.find((priority) => priority.value === value) ||
                        null
                      )
                      console.log(value)
                      props.onChange(value)
                      setOpen(false)
                    }}
                  >
                    <span>{pPlatform.label}</span>
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
