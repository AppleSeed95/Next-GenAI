'use client'
import { DatePickerWithRange } from "./datePicker";
import { Trans } from "@kit/ui/trans";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react'
import { DateRangeType } from "../../compaign/new/_components/compaign-header";


export function HeaderPart() {
   const router = useRouter();
   const { t } = useTranslation('projects');


   return (
      <div className="flex items-center gap-5 justify-end">
         <div className={'flex justify-end'}>
            <DatePickerWithRange
               onChange={(v: DateRangeType) => {

               }}
            />
         </div>
         <button className="w-14 h-14 flex justify-center duration-500 items-center bg-green-500 hover:bg-green-600 rounded-full shadow-lg" onClick={() => { router.push(('/home/compaign/new') as string) }}>
            <Plus />
         </button>
      </div>
   )
}