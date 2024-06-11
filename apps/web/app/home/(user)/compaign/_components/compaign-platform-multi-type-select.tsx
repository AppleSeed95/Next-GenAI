import { Input } from '@kit/ui/input';
import React, { useState } from 'react';

export type Option = {
   value: string,
   label: string,
   state: boolean,
}

export type MultiOption = {
   options: Option[],
   onChange: (options: Option[]) => void,
}
const MultiSelectableCheckboxGroup = (props: MultiOption) => {
   const option1 = props.options.slice(0, 5);
   const option2 = props.options.slice(5);
   const [isSelected, setIsSelected] = useState(false);
   console.log(props.options);

   return (
      <div className='flex flex-row gap-3'>
         <div className={'flex flex-col gap-1'}>
            {option1.map((option) => (
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
         <div className={'flex flex-col gap-1'}>
            {option2.map((option) => (
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
      </div>
   );
};

export default MultiSelectableCheckboxGroup;