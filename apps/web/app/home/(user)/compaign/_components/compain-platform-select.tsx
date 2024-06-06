'use client'

import { Heading } from "@kit/ui/heading";
import { ComboboxDemo } from "../../project/_components/platform-combobox";
import { ComboboxDemoDetail } from "./compaign-page-details";
import { Card } from "@kit/ui/card";
import { Button } from "@kit/ui/button";
import { PageBody } from "@kit/ui/page";
import { useTranslation } from "react-i18next";
import { ProjectsType } from "./personal-compaign-creator-container";
import { useState } from "react";
import { IconSelect, Icons } from "../../_components/icons";
import { DateTimePicker } from "./date-time-picker/date-time-picker";
import { SelectDuration } from "./compaign-platform-duration-select";
import { Input } from "@kit/ui/input";
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group";
import { Label } from "@kit/ui/label";
import MultiSelectableCheckboxGroup, { Option } from "./compaign-platform-multi-type-select";

type Props = {
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}




export function CompaignPlatformSelect(props: Props) {
   const { t } = useTranslation();
   const [platform, setPlatform] = useState<string>(props.projectValue.platform);
   const [platformurl, setPlatformUrl] = useState<string>('');
   const [index, setIndex] = useState([0]);
   const [message, setMessage] = useState('')

   const handleAdd = () => {
      if (index.length < 3) {
         setIndex([...index, index.length + 1]);
      } else {
         setMessage(t("It can't be increased any further."))
      }
   }

   const deleteDateTimePicker = (idToDelete: number) => {
      setIndex(index.filter(id => id !== idToDelete));
      setMessage('');
   }

   const options = [
      { value: 'tips_and_tricks', label: 'Tipps & Tricks' },
      { value: 'howto', label: 'Howto' },
      { value: 'tutorial', label: 'Tutorial' },
      { value: 'fun', label: 'Fun' },
      { value: 'knowledge', label: 'Knowledge' },
      { value: 'product_placement', label: 'Product placement' },
      // { value: 'interesting_facts', label: 'Interesting facts' },
      // { value: 'entertainment_fun_humor', label: 'Entertainment/Fun/Humor' },
      // { value: 'guide', label: 'Guide' },
      // { value: 'entertainment', label: 'Entertainment' },
      // { value: 'advisor', label: 'Advisor' },
   ];

   const handleSelectionChange = (selectedOptions: Option[]) => {
      selectedOptions.map((option) => {
         console.log(option);
      })
   }

   return (
      <PageBody>
         <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-row gap-6'}>
               <Heading level={5} children={t('Plattform')} />
               <ComboboxDemo platform={props.projectValue.platform} onChange={(data) => { setPlatform(data), props.onChange({ ...props.projectValue, platform: data }) }} />
               <ComboboxDemoDetail platformurl={props.projectValue.platformurl} onChange={(data) => { setPlatformUrl(data), props.onChange({ ...props.projectValue, platformurl: data }) }} />
            </div>
            <Card className={'flex flex-row px-7 py-6 justify-between items-center'}>
               <div className={''}>
                  <IconSelect platform={props.projectValue.platform as string} />
               </div>
               <div className={'flex flex-col gap-4'}>
                  {index.map((id) => (
                     <div className={'flex flex-row gap-2 items-center'}>
                        <DateTimePicker key={id} />
                        <Button variant={'outline'} children={t('delete')} onClick={() => deleteDateTimePicker(id)} disabled={index.length === 0} />
                     </div>
                  ))}
                  <Heading level={6} children={t(message)} />
                  <Button variant={'outline'} className={'flex flex-row gap-2'} onClick={handleAdd}>
                     <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                     </svg>
                     <Heading level={5} children={t('Add more')} />
                  </Button>
               </div>
               <div className="flex flex-row gap-3">
                  <Input
                     type="number"
                     max={3}
                     value={index.length}
                     placeholder="input number of count"
                     className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
                  />
                  <SelectDuration onChange={() => { }} />
               </div>
               <div className={'flex flex-col gap-4'}>
                  <MultiSelectableCheckboxGroup
                     options={options}
                     onSelectionChange={handleSelectionChange}
                  />
                  <Button variant={'outline'} className={'flex flex-row gap-2'} >
                     <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                     </svg>
                     <Heading level={5} children={t('Add more type')} />
                  </Button>
               </div>
            </Card>
         </div>
      </PageBody>
   );
}