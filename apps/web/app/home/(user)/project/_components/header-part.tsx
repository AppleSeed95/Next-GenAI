'use client'
import { DatePickerWithRange } from "./datePicker";
import { Button } from "@kit/ui/button";
import { Heading } from "@kit/ui/heading";
import { Trans } from "@kit/ui/trans";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';


export function HeaderPart() {
   const router = useRouter();
   const { t } = useTranslation('projects');


   return (
      <div className="flex flex-col sm:flex-row gap-5 justify-end">
         <div className={'flex justify-end'}>
            <DatePickerWithRange />
         </div>
         <Button variant={'outline'} className="flex display-end sm:flex-row gap-2" onClick={() => { router.push(('/home/compaign') as string) }}>
            <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
            </svg>
            <Trans i18nKey={'projects:addProjectLabel'} />
         </Button>
      </div>
   )
}