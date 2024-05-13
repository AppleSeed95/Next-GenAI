"use client"

import * as React from "react"
import {
   ArrowUpCircle,
   CheckCircle2,
   Circle,
   HelpCircle,
   LucideIcon,
   XCircle,
   Facebook,
   Youtube,
   Instagram,
   CopyIcon,
   DeleteIcon,
   Edit2Icon,
   X,
} from "lucide-react"

import { cn } from "@kit/ui/utils"
import { Button } from "@kit/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@kit/ui/card";
import { Heading } from "@kit/ui/heading"
import { DatePickerWithRange } from "./datePicker"


type LastData = {
   icon: LucideIcon
   title: string
   topic: string
   subtopics: string
}

const lastData: LastData[] = [
   {
      icon: Instagram,
      title: "Instagram",
      topic: "AI future",
      subtopics: "What is the future of AI",
   },
   {
      icon: Youtube,
      title: "Youtube",
      topic: "AI future",
      subtopics: "What is the future of AI",
   },
   {
      icon: Facebook,
      title: "Facebook",
      topic: "AI future",
      subtopics: "What is the future of AI",
   },
   {
      icon: HelpCircle,
      title: "Facebook",
      topic: "AI future",
      subtopics: "What is the future of AI",
   },

]

export function LastDataProvider() {
   const [open, setOpen] = React.useState(false)
   const [selectedStatus, setSelectedStatus] = React.useState<LastData | null>(
      null
   )

   return (
      <div className="flex flex-col items-center space-x-4 w-full gap-8">
         {lastData.map((item) => (
            <Card className="px-7 py-6">
               <div className={'flex flex-row gap-6 items-center'}>
                  <div>
                     <item.icon />
                  </div>
                  <div className={'flex flex-col gap-8'}>
                     <Heading level={3} children={item.title} />
                     <Button variant={'outline'} children={'History - show last'} />
                  </div>
                  <div className={'flex flex-col gap-6'}>
                     <Heading level={4} children={item.topic} />
                     <Heading level={6} children={item.subtopics} />
                  </div>
                  <div className={'flex flex-col gap-8'}>
                     <div className={'flex flex-row justify-between'}>
                        <DatePickerWithRange />
                        <label className="inline-flex items-center cursor-pointer">
                           <input type="checkbox" value="" className="sr-only peer" />
                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                     </div>
                     <div className={'flex flex-row gap-5'}>
                        <Button variant={'outline'} className={'flex flex-row gap-4'}>
                           <CopyIcon />
                           <Heading level={5} children={'Copy'} />
                        </Button>
                        <Button variant={'outline'} className={'flex flex-row gap-4'}>
                           <X />
                           <Heading level={5} children={'Delete'} />
                        </Button>
                        <Button variant={'outline'} className={'flex flex-row gap-4'}>
                           <Edit2Icon />
                           <Heading level={5} children={'Edit'} />
                        </Button>
                     </div>
                  </div>
               </div>
            </Card>
         ))}
      </div>
   )
}
