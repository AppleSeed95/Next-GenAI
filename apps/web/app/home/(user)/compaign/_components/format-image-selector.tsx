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

export const SelectFormat:React.FC<Props> = (props) =>  {  

  return (
    <Select onValueChange={(e) => {props.onChange(e)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Format" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Format</SelectLabel>
          <SelectItem value="English">PNG</SelectItem>
          <SelectItem value="German">JPG</SelectItem>
          <SelectItem value="Japanese">BMP</SelectItem>
          <SelectItem value="Chinese">SVG</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
