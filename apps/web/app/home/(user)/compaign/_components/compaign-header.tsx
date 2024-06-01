'use client'
import { PageBody } from "@kit/ui/page";
import { DatePickerWithRange } from "../../project/_components/datePicker";
import { Input } from "@kit/ui/input";
import { Comboboxsuggest } from "../../project/_components/suggestmode-combobox";
import { useTranslation } from "react-i18next";
import { Label } from "@kit/ui/label";
import { ProjectsType } from "./personal-compaign-creator-container";
import React, { useState } from "react";

type Props = {
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}

// export type DateRangeType = {
//    from: Date,
//    to: Date
// }

export function CompaignHeader( props: Props) {
   const { t } = useTranslation();
   // const [dateRange, setDateRange] = useState<DateRangeType>({
   //    from: props.projectValue.pstartDate,
   //    to: props.projectValue.pendDate,
   // })

   const [pmode, setPmode] = useState<string>('');

   return (
      <PageBody className={'flex flex-col gap-10'}>
         <div>
            <div className={'flex flex-col gap-4'}>
               <div className={'flex flex-row gap-4 justify-end'}>
                  <DatePickerWithRange />
                  <label className="inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" checked={props.projectValue.pstate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.onChange( {...props.projectValue, pstate: !props.projectValue.pstate})
                     }} />
                     <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
               </div>
               <div className={'flex flex-row gap-5 '}>
                  <div className={'flex flex-row gap-2 items-center flex-1'}>
                     <Label children={t('ProjectName')} />
                     <Input placeholder={t('ProjectName')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {props.onChange({...props.projectValue, pName: e.target.value})}} />
                  </div>
                  <Comboboxsuggest pmode={props.projectValue.pmode} onChange={(data: string) => {setPmode(data)}}/>
               </div>
               <div className={'flex flex-row gap-5 '}>
                  <div className={'flex  gap-2 items-center flex-1'}>
                     <Label children={t('MainTopic')} />
                     <Input placeholder={t('Maintopic')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {props.onChange({...props.projectValue, pMainTopic: e.target.value})}}/>
                  </div>
                  <div className={'flex gap-2 items-center flex-1'}>
                     <Label children={t('SubTopic')} />
                     <Input placeholder={t('SubTopic')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {props.onChange({...props.projectValue, pSubTopic: e.target.value})}} />
                  </div>
               </div>
            </div>
         </div>
      </PageBody>
   );
}