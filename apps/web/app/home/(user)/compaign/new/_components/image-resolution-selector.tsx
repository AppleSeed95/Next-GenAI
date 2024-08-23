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

export const SelectResolution: React.FC<Props> = (props) => {

  return (
    <Select onValueChange={(e) => { props.onChange(e); }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Resolution" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Resolution</SelectLabel>
          <SelectItem value="1024x1024">1024x1024</SelectItem>
          <SelectItem value="256x256">256x256</SelectItem>
          <SelectItem value="512x512">512x512</SelectItem>
          <SelectItem value="1792x1024">1792x1024</SelectItem>
          <SelectItem value="1024x1792">1024x1792</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
