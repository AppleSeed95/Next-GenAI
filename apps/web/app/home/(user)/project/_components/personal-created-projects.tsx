'use client'
import React, { useState } from "react";
import { ComboboxDemo } from "./platform-combobox";
import { ComboboxPopover } from "./state-combobox";
import { Comboboxsuggest } from "./suggestmode-combobox";


export function SearchOptions() {

   const [platform, setPlatform] = useState('');
   const [state, setState] = useState(true);
   const [mode, setMode] = useState('');

   return (

      <div className={'flex flex-row gap-4'}>
         <ComboboxDemo platform={""} onChange={() => {}} />
         <ComboboxPopover />
         <Comboboxsuggest pmode="" onChange={() => {}} />
      </div>
   )
}