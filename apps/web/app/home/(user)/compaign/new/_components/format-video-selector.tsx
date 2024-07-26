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

export const SelectFormatVideo:React.FC<Props> = (props) =>  {  

  return (
    <Select onValueChange={(e) => {props.onChange(e)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Format" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Format</SelectLabel>
          <SelectItem value="English">MP4 </SelectItem>
          <SelectItem value="German">AVI</SelectItem>
          <SelectItem value="Japanese">WMV</SelectItem>
          <SelectItem value="Chinese">MKV</SelectItem>
          <SelectItem value="Chinese">MOV/QT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
