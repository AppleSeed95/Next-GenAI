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

type Platform = {
  value: string
  label: string
}

const platforms: Platform[] = [
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
  onChange: (platform: string) => void,
}


export function PlatformSelectForCompaingnComboboxDemo(props: Props) {
  const [open, setOpen] = React.useState(false)
  const [selectedPlatform, setSelectedPlatform] = React.useState<Platform | null>(
    null
  )
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedPlatform ? (
              <>
                {selectedPlatform.label}
              </>
            ) : (
              <>{t('Platform')}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change Platform..." />
            <CommandList>
              <CommandEmpty>{t('No results found.')}</CommandEmpty>
              <CommandGroup>
                {platforms.map((platform) => (
                  <CommandItem
                    key={platform.value}
                    value={platform.value}
                    onSelect={(value) => {
                      setSelectedPlatform(
                        platforms.find((priority) => priority.value === value) ||
                        null
                      )
                      console.log(value)
                      props.onChange(value)
                      setOpen(false)
                    }}
                  >
                    <span>{platform.label}</span>
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
