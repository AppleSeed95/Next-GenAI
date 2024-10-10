'use client'

import { Heading } from "@kit/ui/heading";
import { Card } from "@kit/ui/card";
import { Button } from "@kit/ui/button";
import { PageBody } from "@kit/ui/page";
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { useState } from "react";
import { IconSelect, Icons } from "../../../_components/icons";
import { DateTimePicker } from "./date-time-picker/date-time-picker";
import { SelectDuration } from "./compaign-platform-duration-select";
import { Input } from "@kit/ui/input";
import MultiSelectableCheckboxGroup, { Option } from "./compaign-platform-multi-type-select";
import { PlatformSelectForCompaingnComboboxDemo } from "./compaign-platform-select-combobox";
import { Label } from "@kit/ui/label";
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group"
import {
   Alert,
   AlertDescription,
   AlertTitle,
} from "@kit/ui/alert"
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { WithAnimation } from "~/home/(user)/_components/animated-element";

type Props = {
   setCurrentStep: (v: number) => void,
   projectValue: ProjectsType,
   generatedTopicIdeas: string,
   setGeneratedTopicIdeas: (data: string) => void,
   onChange: (projectValue: ProjectsType) => void,
   previousStep: number,
   nextStep: number
}

const options = [
   { value: 'tips_and_tricks', label: 'Tipps & Tricks', state: false },
   { value: 'howto', label: 'Howto', state: false },
   { value: 'tutorial', label: 'Tutorial', state: false },
   { value: 'fun', label: 'Fun', state: false },
   { value: 'knowledge', label: 'Knowledge', state: false },
   { value: 'product_placement', label: 'Product placement', state: false },
   { value: 'interesting_facts', label: 'Interesting facts', state: false },
   { value: 'entertainment_fun_humor', label: 'Entertainment/Fun/Humor', state: false },
   { value: 'guide', label: 'Guide', state: false },
   { value: 'entertainment', label: 'Entertainment', state: false },
   { value: 'advisor', label: 'Advisor', state: false },
];


export function CompaignpPlatformSelect(props: Props) {
   const { t } = useTranslation();
   const [platform, setPlatform] = useState<string>(props.projectValue.pPlatform);
   const [platformurl, setPlatformUrl] = useState<string>('');
   const [index, setIndex] = useState([0]);
   const [message, setMessage] = useState('');
   const [selectedOptions, setSelectedOptions] = useState<string[]>(JSON.parse(props.projectValue.pAtmosphere));
   const [error, setError] = useState('');


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
   const handleNext = () => {

      if (!(selectedOptions.length > 0)) {
         setError('Please select at least one atmosphere.');
         return;
      }
      props.setCurrentStep(props.nextStep);
   }
   return (
      <PageBody>
         <WithAnimation mode="zoom">
            <div className={'flex flex-col gap-4 bg-neutral-100 dark:bg-[#000208] p-[50px] mx-[200px] mb-[20px] rounded-lg shadow-lg '}>
               {/* <div className={'flex flex-col sm:flex-row justify-between'}>
               <div className={'flex flex-row justify-between sm:gap-4'}>
                  <pPlatformSelectForCompaingnComboboxDemo onChange={(data) => { setpPlatform(data), props.onChange({ ...props.projectValue, pPlatform: data }) }} />
                  <ComboboxDemoDetail pPlatformurl={props.projectValue.pPlatformurl} onChange={(data) => { setpPlatformUrl(data), props.onChange({ ...props.projectValue, pPlatformurl: data }) }} />
               </div>
            </div> */}
               <div className={'flex justify-center'}>
                  <IconSelect platform={props.projectValue.pPlatform as string} />
               </div>
               <div className="flex flex-col gap-[10px] w-full">
                  <Label className="font-bold text-[16px]" children={t('Target Platform')} />
                  <PlatformSelectForCompaingnComboboxDemo onChange={(data) => { setPlatform(data), props.onChange({ ...props.projectValue, pPlatform: data }) }} currentPlatform={props.projectValue.pPlatform}/>
               </div>
               <div className="flex flex-col gap-[10px] w-full">
                  <Label className="font-bold text-[16px]" children={t('Post settings')} />
                  <div className="flex items-center flex-row gap-3">
                     <Input
                        type="number"
                        max={3}
                        min={0}
                        value={props.projectValue.pCnt}
                        onChange={(e) => {
                           const value = parseInt(e.target.value)
                           props.onChange({ ...props.projectValue, pCnt: value })
                        }}
                        placeholder="input number of count"
                        className={'w-[200px] [moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
                     />
                     <RadioGroup
                        onValueChange={(data: string) => {
                           props.onChange({ ...props.projectValue, pPostMode: data });
                        }}
                        value={props.projectValue.pPostMode}
                        className="h-full w-full" defaultValue="Active">
                        <div className="flex items-center gap-[10px] h-full">
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem value="weekly" />
                              <Label >Per week</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" />
                              <Label >Per month</Label>
                           </div>
                        </div>
                     </RadioGroup>
                     {/* <SelectDuration onChange={() => { }} /> */}
                  </div>
               </div>
               <div className="flex flex-col gap-[10px] w-full">
                  <Label className="font-bold text-[16px]" children={t('Campaign atmosphere')} />
                  <div className={'flex flex-col gap-4'}>
                     <div className="flex">
                        <MultiSelectableCheckboxGroup
                           options={options}
                           onChange={(data) => {
                              setSelectedOptions(data);
                              props.onChange({ ...props.projectValue, pAtmosphere: JSON.stringify(data) });
                           }}
                           selectedOptions={selectedOptions}
                        />
                     </div>
                     {/* <ContentTopicSuggestion selectedOptions={options} topic={props.projectValue.pMainTopic} isAuto={props.projectValue.pMode} onChange={() => { setSelectedOptions([]) }} generatedTopicIdeas={props.generatedTopicIdeas} setGeneratedTopicIdeas={(data) => props.setGeneratedTopicIdeas(data)} /> */}
                  </div>
               </div>
               {error !== '' && <div className="my-[20px]">
                  <Alert variant="destructive">
                     <div className="flex gap-[10px]">
                        <AlertCircle className="h-6 w-6" />
                        <div>
                           <AlertTitle>Error</AlertTitle>
                           <AlertDescription>
                              {error}
                           </AlertDescription>
                        </div>
                     </div>
                  </Alert>
               </div>}
               <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                  <Button variant={'outline'} onClick={() => props.setCurrentStep(0)}><ChevronLeft /> Prev</Button>
                  <Button variant={'outline'} onClick={handleNext}>Next <ChevronRight /></Button>
               </div>
               {/* <div className={'flex flex-col gap-4 px-7 py-6 justify-center sm:justify-between items-center'}>
               <div className={'flex flex-col gap-4'}>
                  {index.map((id) => (
                     <div className={'flex flex-row gap-2 items-center'}>
                        <DateTimePicker key={id} />
                        <Button key={id} variant={'outline'} children={t('delete')} onClick={() => deleteDateTimePicker(id)} disabled={index.length === 0} />
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

               <div className={'flex flex-col gap-4'}>
                  <MultiSelectableCheckboxGroup
                     options={options}
                     onChange={(data) => { setSelectedOptions(data) }}
                  />
                  <ContentTopicSuggestion selectedOptions={options} topic={props.projectValue.pMainTopic} isAuto={props.projectValue.pMode} onChange={() => { setSelectedOptions([]) }} generatedTopicIdeas={props.generatedTopicIdeas} setGeneratedTopicIdeas={(data) => props.setGeneratedTopicIdeas(data)} />
               </div>
            </div> */}
            </div>
         </WithAnimation>
      </PageBody>
   );
}