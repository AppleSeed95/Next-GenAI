import React from "react";
import { HeaderPart } from "./header-part";
import { LastDataProvider } from "./last-project-data";
import { ComboboxDemo } from "./platform-combobox";
import { Search } from "./searchDialog";
import { ComboboxPopover } from "./state-combobox";
import { Comboboxsuggest } from "./suggestmode-combobox";


export function PersonalCreatedProjectsContainer(
   props: React.PropsWithChildren<{
      userId:string;
   }>
) {
   return (
      <div className={'flex flex-col gap-4'}>
         <div className={'flex flex-col gap-4'}>
            <HeaderPart />
            <div className={'flex flex-row gap-4'}>
               <Search />
               <ComboboxDemo />
               <ComboboxPopover />
               <Comboboxsuggest pmode="" onChange={() => {}}/>
            </div>
         </div>
         <LastDataProvider />
      </div>
   )
}