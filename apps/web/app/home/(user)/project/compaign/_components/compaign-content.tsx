"use client"

import { Heading } from "@kit/ui/heading"
import { PageBody } from "@kit/ui/page"
import { Trans } from "@kit/ui/trans"
import { HomeLayoutPageHeader } from "~/home/(user)/_components/home-page-header"
import CompaignCard from "./compaign-card"

import { Button } from "@kit/ui/button"
import { startTransition, useState } from "react";
import { createAITextAction } from "../_lib/server/server-action"


export type Blog = {
   type: string;
   toggle: boolean;
   words: number;
   lang: string;
   brand: string;
   description: string;
}

export function CompaignContent() {

   const [blogs, setBlogs] = useState<Blog[]>([
      { type: 'Text', brand: 'Hello', description: 'How are you', lang: 'English', toggle: true, words: 300 },
      { type: 'Image', brand: 'brand', description: 'aaa', lang: 'English', toggle: false, words: 300 },
      { type: 'Video', brand: 'brand', description: 'aaa', lang: 'English', toggle: false, words: 300 },
   ]);

   console.log({ blogs })

   const handleClicked =  async() => {
      try {
         if (blogs && blogs[0]?.toggle) {
            const payload = { title: blogs[0]?.brand || 'Greeting', description: blogs[0]?.description || 'How are you', lang: blogs[0]?.lang || 'English', words: blogs[0]?.words || 300 }
            const res = await createAITextAction(payload);
            console.log({res})
         }

      } catch (error: any) {
         console.log(error);
      }
   }

   return (

      <>
         <HomeLayoutPageHeader
            title={<Trans i18nKey={'common:content'} />}
            description={<Trans i18nKey={''}
            />}
         />
         <PageBody className={'flex flex-col gap-8'}>
            {
               blogs.map((blog, i) => {
                  return <CompaignCard key={i} blog={blog} onChange={(data) => { const temp = [...blogs]; temp[i] = data; setBlogs(temp) }} />
               })
            }
            {/* <Card className={'flex flex-row justify-between rounded-none px-7 py-6'}>
                  <div className={'flex flex-col gap-5'}>
                     <div className={'flex flex-row gap-6'}>
                        <Heading level={5} children={'Image'} />
                        <label className="inline-flex items-center cursor-pointer">
                           <input type="checkbox" value="" className="sr-only peer" />
                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                     </div>
                     <div className={'flex flex-row gap-5 items-center'}>
                        <Input
                           type="number"
                           defaultValue={300}
                           className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
                        />
                        <Heading level={5} children={'Words'} />
                     </div>
                     <SelectDemo />
                  </div>
                  <div className={'flex flex-col gap-6'}>
                     <div className={'flex flex-row gap-6 items-center'}>
                        <Heading level={5} children={'Logo'} />
                        <Input placeholder={'Brand Demo'} />
                     </div>
                     <div className={'flex flex-row gap-6'}>
                        <Heading level={5} children={'File'} />
                        <Input placeholder={'Brand Demo'} />
                     </div>
                  </div>
                  <div>
                     <Textarea placeholder={'Additional infos for chatbot... like use paragraphs etc.'} className={'h-full w-90'} />
                  </div>
               </Card>
               <Card className={'flex flex-row justify-between rounded-none px-7 py-6'}>
                  <div className={'flex flex-col gap-5'}>
                     <div className={'flex flex-row gap-6'}>
                        <Heading level={5} children={'Video'} />
                        <label className="inline-flex items-center cursor-pointer">
                           <input type="checkbox" value="" className="sr-only peer" />
                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                     </div>
                     <div className={'flex flex-row gap-5 items-center'}>
                        <Input
                           type="number"
                           defaultValue={300}
                           className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
                        />
                        <Heading level={5} children={'Words'} />
                     </div>
                     <SelectDemo />
                  </div>
                  <div className={'flex flex-row gap-6 items-center'}>
                     <Heading level={5} children={'Brand'} />
                     <Input placeholder={'Brand Demo'} />
                  </div>
                  <div>
                     <Textarea placeholder={'Additional infos for chatbot... like use paragraphs etc.'} className={'h-full w-full'} />
                  </div>
               </Card> */}
            <div className={'flex justify-end'}>
               <Button variant={'outline'} className={'w-60'} onClick={handleClicked}>
                  <div className={'flex flex-row gap-3'}>
                     <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                     </svg>
                     <Heading level={5} children={'Save Compaign'} />
                  </div>
               </Button>
            </div>
         </PageBody>
      </>
   )
}

