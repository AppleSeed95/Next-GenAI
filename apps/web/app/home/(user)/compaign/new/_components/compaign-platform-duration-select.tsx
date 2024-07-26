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

export const SelectDuration:React.FC<Props> = (props) =>  {  

  return (
    <Select onValueChange={(e) => {props.onChange(e)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Duration" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Posting Per</SelectLabel>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
