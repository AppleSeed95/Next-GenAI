import { Input } from '@kit/ui/input';
import React, { useState } from 'react';

export type Option = {
   value: string,
   label: string,
}

export type MultiOption = {
   options: Option[],
   onSelectionChange: (options: Option[]) => void,
}
const MultiSelectableCheckboxGroup = (props: MultiOption) => {
   const [selectedOptions, setSelectedOptions] = useState<Option[]>(
      [{ value: 'tips_and_tricks', label: 'Tipps & Tricks' }]
   );

   const handleCheckboxChange = (event: number) => {
      //  const { value, checked } = ;

      //  if (checked) {
      //    setSelectedOptions(value);
      //  } else {
      //    setSelectedOptions(selectedOptions.filter((option) => option !== value));
      //  }

      // Call the provided callback with the updated selected options
      props.onSelectionChange(selectedOptions);
   };

   return (
      <div className='flex flex-col gap-1'>
         {props.options.map((option) => (
            <div key={option.value} className={'flex flex-row gap-2 '}>
               <Input className={'appearance-none w-auto h-auto border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none'}
                  type="checkbox"
                  id={option.value}
                  value={option.value}
               />
               <label htmlFor={option.value}>{option.label}</label>
            </div>
         ))}
      </div>
   );
};

export default MultiSelectableCheckboxGroup;