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

export const SelectDemo:React.FC<Props> = (props) =>  {  

  return (
    <Select onValueChange={(e) => {props.onChange(e)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="German">Deutsch</SelectItem>
          <SelectItem value="Japanese">日本語</SelectItem>
          <SelectItem value="Chinese">中文</SelectItem>
          <SelectItem value="Spanish">España</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
