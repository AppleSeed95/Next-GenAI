'use client'
import { PageBody } from "@kit/ui/page";
import { DatePickerWithRange } from "../../project/_components/datePicker";
import { Input } from "@kit/ui/input";
import { Comboboxsuggest } from "../../project/_components/suggestmode-combobox";
import { useTranslation } from "react-i18next";
import { Label } from "@kit/ui/label";
import { ProjectsType } from "./personal-compaign-creator-container";
import React, { useState } from "react";
import { ModeSelectComboDemo } from "./compaign-mode-select-combobox";
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group"
import { Button } from "@kit/ui/button";
import {
   Alert,
   AlertDescription,
   AlertTitle,
} from "@kit/ui/alert"
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"




type Props = {
   currentStep: number,
   setCurrentStep: (v: number) => void,
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}

// export type DateRangeType = {
//    from: Date,
//    to: Date
// }

export function CompaignHeader(props: Props) {
   const { t } = useTranslation();
   const [error, setError] = useState('');
   // const [dateRange, setDateRange] = useState<DateRangeType>({
   //    from: props.projectValue.pstartDate,
   //    to: props.projectValue.pendDate,
   // })

   const handleNext = () => {
      if (props.projectValue.pName === '') {
         setError('Please input project name.');
         return;
      }
      if (props.projectValue.pMainTopic === '') {
         setError('Please input  main topic.');
         return;
      }
      if (props.projectValue.pSubTopic === '') {
         setError('Please input sub topic.');
         return;
      }
      props.setCurrentStep(1)
   }
   return (
      <PageBody className={'flex flex-col gap-10'}>
         <div className="mx-[200px] mb-[20px] p-[50px] bg-[#000208] rounded-lg shadow-lg">

            <div className={'flex flex-col gap-4'}>
               <div className={'flex justify-between sm:flex-row gap-4'}>
                  <div className="flex gap-[20px]  flex-wrap">
                     <div className="flex flex-col gap-[10px]">
                        <Label children={t('Project Duration')} />
                        <DatePickerWithRange />
                     </div>
                     <div className="flex flex-col gap-[10px]">
                        <Label children={t('Project State')} />
                        <RadioGroup
                           onValueChange={(data: string) => {
                              props.onChange({ ...props.projectValue, pstate: data === 'Active' });
                           }}
                           value={props.projectValue.pstate ? 'Active' : 'Inactive'}
                           className="h-full" defaultValue="Active">
                           <div className="flex items-center gap-[10px] h-full">
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="Active" />
                                 <Label >Active</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="Inactive" />
                                 <Label >Inactive</Label>
                              </div>
                           </div>
                        </RadioGroup>
                     </div>

                     {/* <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={props.projectValue.pstate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           props.onChange({ ...props.projectValue, pstate: !props.projectValue.pstate })
                        }} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                     </label> */}
                  </div>
               </div>
               <div className={'flex flex-col flex-wrap gap-2 sm:flex-row gap-5 '}>
                  <div className={'flex flex-row gap-2 items-center flex-1'}>
                     <div className="flex grow flex-col gap-[10px]">
                        <Label children={t('ProjectName')} />
                        <Input value={props.projectValue.pName} placeholder={t('Input project name')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pName: e.target.value }) }} />
                     </div>
                  </div>
                  <div className={'flex justify-end'}>
                     <div className="flex grow flex-col gap-[10px]">
                        <Label children={t('Project Mode')} />
                        <RadioGroup
                           onValueChange={(data: string) => {
                              props.onChange({ ...props.projectValue, pmode: data });
                           }}
                           value={props.projectValue.pmode}
                           className="h-full" defaultValue="Autopilot">
                           <div className="flex items-center gap-[10px] h-full">
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="auto" />
                                 <Label >Autopilot</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="suggest" />
                                 <Label >Suggest</Label>
                              </div>
                           </div>
                        </RadioGroup>
                     </div>
                  </div>
               </div>
               <div className={'flex flex-col gap-5 '}>
                  <div className="flex grow flex-col gap-[10px]">
                     <Label children={t('Main Topic')} />
                     <Input value={props.projectValue.pMainTopic} placeholder={t('Input project main topic (e.g Finance)')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pMainTopic: e.target.value }) }} />
                  </div>
                  <div className="flex grow flex-col gap-[10px]">
                     <Label children={t('Sub Topic')} />
                     <Input value={props.projectValue.pSubTopic} placeholder={t('Input project sub topic (e.g Insurance)')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pSubTopic: e.target.value }) }} />
                  </div>
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
            <div className="flex justify-center mt-[30px] w-full gap-[10px]">
               <Button disabled variant={'outline'}><ChevronLeft /> Prev</Button>
               <Button onClick={handleNext} variant={'outline'}>Next<ChevronRight /></Button>
            </div>
         </div>
      </PageBody>
   );
}