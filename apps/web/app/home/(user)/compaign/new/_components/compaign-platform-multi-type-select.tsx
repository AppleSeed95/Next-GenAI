import { Input } from '@kit/ui/input';

import { Checkbox } from "@kit/ui/checkbox"


import React, { useState } from 'react';

export type Option = {
   value: string,
   label: string,
   state: boolean,
}

export type MultiOption = {
   options: Option[],
   onChange: (options: string[]) => void,
   selectedOptions: string[]
}
const MultiSelectableCheckboxGroup = (props: MultiOption) => {


   const option1 = props.options.slice(0, 5);
   const option2 = props.options.slice(5);
   const [selected, setSelected] = useState<string[]>(props.selectedOptions);
   return (
      <div className='flex flex-row gap-3'>
         <div className={'flex flex-col gap-1'}>
            {option1.map((option) => (
               <div key={option.value} className={'flex flex-row items-center gap-2 '}>
                  <Checkbox
                     onCheckedChange={(value) => {
                        let nextSelected = selected;
                        if (!value) {
                           nextSelected = (selected.filter(((t) => t !== option.value)));
                        } else {
                           nextSelected = ([...selected, option.value]);
                        }
                        setSelected(nextSelected)
                        props.onChange(nextSelected)
                     }}
                     checked={props.selectedOptions.some((a) => a === option.value)}
                     id={option.value} />
                  <label htmlFor={option.value}>{option.label}</label>
               </div>
            ))}
         </div>
         <div className={'flex flex-col gap-1'}>
            {option2.map((option) => (
               <div key={option.value} className={'flex flex-row items-center gap-2'}>
                  <Checkbox
                     onCheckedChange={(value) => {
                        let nextSelected = selected;
                        if (!value) {
                           nextSelected = (selected.filter(((t) => t !== option.value)));
                        } else {
                           nextSelected = ([...selected, option.value]);
                        }
                        setSelected(nextSelected)
                        props.onChange(nextSelected)
                     }}
                     checked={props.selectedOptions.some((a) => a === option.value)}
                     id={option.value} />
                  <label htmlFor={option.value}>{option.label}</label>
               </div>
            ))}
         </div>
      </div>
   );
};

export default MultiSelectableCheckboxGroup;