'use client'
import { DatePickerWithRange } from "./datePicker";
import { Trans } from "@kit/ui/trans";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react'
import { DateRangeType } from "../../compaign/new/_components/compaign-header";
import { SearchParams } from "../page";

type Props = {
   searchParams: SearchParams
}
export function HeaderPart(props: Props) {
   const router = useRouter();
   const pathName = usePathname();


   const { t } = useTranslation('projects');


   return (
      <div className="flex items-center gap-5 justify-end">
         <div className={'flex justify-end'}>
            <DatePickerWithRange
               from={props.searchParams.start ?? ''}
               to={props.searchParams.end ?? ''}
               onChange={(v: DateRangeType) => {

                  const params = new URLSearchParams({
                     ...props.searchParams,
                     start: v.from?.toISOString().split("T")[0] ?? "",
                     end: v.to?.toISOString().split("T")[0] ?? "",
                  });


                  const url = `${pathName}?${params.toString()}`;
                  router.push(url);
               }}
            />
         </div>
         {/* <button
            className="w-14 h-14 flex justify-center duration-500 items-center bg-green-500 hover:bg-green-600 rounded-full shadow-lg"
         >
            clear search
         </button> */}
         <button className="text-white  w-14 h-14 flex justify-center duration-500 items-center bg-green-500 hover:bg-green-600 rounded-full shadow-lg" onClick={() => { router.push(('/home/compaign/new') as string) }}>
            <Plus />
         </button>
      </div>
   )
}