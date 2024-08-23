import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@kit/ui/select"

type Props = {
  onChange: (lang: string) => void;
}

export const SelectFormat: React.FC<Props> = (props) => {

  return (
    <Select onValueChange={(e) => { props.onChange(e); }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Format" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Format</SelectLabel>
          <SelectItem value="PNG">PNG</SelectItem>
          <SelectItem value="JPG">JPG</SelectItem>
          <SelectItem value="BMP">BMP</SelectItem>
          <SelectItem value="SVG">SVG</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
