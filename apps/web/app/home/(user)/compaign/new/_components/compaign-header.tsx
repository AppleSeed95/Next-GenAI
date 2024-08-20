'use client'
import { PageBody } from "@kit/ui/page";
import { DatePickerWithRange } from "../../../project/_components/datePicker";
import { Input } from "@kit/ui/input";
import { Comboboxsuggest } from "../../../project/_components/suggestmode-combobox";
import { useTranslation } from "react-i18next";
import { Label } from "@kit/ui/label";
import { ProjectsType } from '../page';
import React, { useState } from "react";
import { ModeSelectComboDemo } from "./compaign-mode-select-combobox";
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group"
import { Button } from "@kit/ui/button";
import { Checkbox } from "@kit/ui/checkbox"

import {
   Alert,
   AlertDescription,
   AlertTitle,
} from "@kit/ui/alert"
import { AlertCircle, Check, ChevronLeft, ChevronRight } from "lucide-react"

import { WithAnimation } from "~/home/(user)/_components/animated-element";




type Props = {
   currentStep: number,
   setCurrentStep: (v: number) => void,
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}

export type DateRangeType = {
   from?: Date | undefined,
   to?: Date | undefined
}

export function CompaignHeader(props: Props) {
   const { t } = useTranslation();
   const [error, setError] = useState('');
   // const [dateRange, setDateRange] = useState<DateRangeType>({
   //    from: props.projectValue.pStartDate,
   //    to: props.projectValue.pEndDate,
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
      if (!props.projectValue.pUseText && !props.projectValue.pUseImage && !props.projectValue.pUseVideo) {
         setError('You should select at least one context.');
         return;
      }
      props.setCurrentStep(1)
   }
   return (
      <PageBody className={'flex flex-col gap-10'}>
         <WithAnimation mode="zoom">
            <div className="mx-[200px] mb-[20px] p-[50px] bg-neutral-100 dark:bg-[#000208] rounded-lg shadow-lg">

               <div className={'flex flex-col gap-4'}>
                  <div className={'flex justify-between sm:flex-row gap-4'}>
                     <div className="flex gap-[20px]  flex-wrap">
                        <div className="flex flex-col gap-[10px]">
                           <Label className="font-bold text-[16px]" children={t('Project Duration')} />
                           <DatePickerWithRange
                              from={props.projectValue.pStartDate?.toISOString() ?? ''}
                              to={props.projectValue.pEndDate?.toISOString() ?? ''}
                              onChange={(v: DateRangeType) => {
                                 props.onChange({ ...props.projectValue, pStartDate: v.from, pEndDate: v.to });
                              }}
                           />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                           <Label className="font-bold text-[16px]" children={t('Project State')} />
                           <RadioGroup
                              onValueChange={(data: string) => {
                                 props.onChange({ ...props.projectValue, pState: data === 'Active' });
                              }}
                              value={props.projectValue.pState ? 'Active' : 'Inactive'}
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
                        <input type="checkbox" className="sr-only peer" checked={props.projectValue.pState} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           props.onChange({ ...props.projectValue, pState: !props.projectValue.pState })
                        }} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                     </label> */}
                     </div>
                  </div>
                  <div className={'flex flex-col flex-wrap gap-2 sm:flex-row gap-5 '}>
                     <div className={'flex flex-row gap-2 items-center flex-1'}>
                        <div className="flex grow flex-col gap-[10px]">
                           <Label className="font-bold text-[16px]" children={t('ProjectName')} />
                           <Input value={props.projectValue.pName} placeholder={t('Input project name')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pName: e.target.value }) }} />
                        </div>
                     </div>
                     <div className={'flex justify-end'}>
                        <div className="flex grow flex-col gap-[10px]">
                           <Label className="font-bold text-[16px]" children={t('Project Mode')} />
                           <RadioGroup
                              onValueChange={(data: string) => {
                                 props.onChange({ ...props.projectValue, pMode: data });
                              }}
                              value={props.projectValue.pMode}
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
                        <Label className="font-bold text-[16px]" children={t('Main Topic')} />
                        <Input value={props.projectValue.pMainTopic} placeholder={t('Input project main topic (e.g Finance)')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pMainTopic: e.target.value }) }} />
                     </div>
                     <div className="flex grow flex-col gap-[10px]">
                        <Label className="font-bold text-[16px]" children={t('Sub Topic')} />
                        <Input value={props.projectValue.pSubTopic} placeholder={t('Input project sub topic (e.g Insurance)')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.projectValue, pSubTopic: e.target.value }) }} />
                     </div>
                  </div>
                  <div className={'flex flex-col gap-5 '}>
                     <div className="flex grow flex-col gap-[10px]">
                        <Label className="font-bold text-[16px]" children={t('Context settings')} />
                        <div className="flex gap-[20px]">
                           <div className="flex items-center gap-[5px]">
                              <Checkbox
                                 disabled
                                 checked={props.projectValue.pUseText}
                                 onCheckedChange={(v: boolean) => {
                                    props.onChange({ ...props.projectValue, pUseText: v })
                                 }} />
                              <label>Text</label>
                           </div>
                           <div className="flex items-center gap-[5px]">
                              <Checkbox
                                 checked={props.projectValue.pUseImage}
                                 onCheckedChange={(v: boolean) => {
                                    props.onChange({ ...props.projectValue, pUseImage: v })
                                 }} />
                              <label>Image</label>
                           </div>
                           <div className="flex items-center gap-[5px]">
                              <Checkbox
                                 checked={props.projectValue.pUseVideo}
                                 onCheckedChange={(v: boolean) => {
                                    props.onChange({ ...props.projectValue, pUseVideo: v })
                                 }} />
                              <label>Video</label>
                           </div>

                        </div>
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
         </WithAnimation>
      </PageBody>
   );
}