"use client"

import { Heading } from "@kit/ui/heading"
import { PageBody } from "@kit/ui/page"
import { Trans } from "@kit/ui/trans"
import { HomeLayoutPageHeader } from "~/home/(user)/_components/home-page-header"
import CompaignCard from "./compaign-card"
import { GlobalLoader } from "@kit/ui/global-loader"

import { Button } from "@kit/ui/button"
import { startTransition, useContext, useState } from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@kit/ui/dialog"
import { Label } from "@kit/ui/label"
import { Textarea } from "@kit/ui/textarea"
import { Projects } from "../page"
import { createAITextAction } from "../_lib/server/server-action"


export type Blog = {
   type: string;
   toggle: boolean;
   words: number;
   lang: string;
   brand: string;
   description?: string;
}




export function CompaignContent() {
   const [isOpen, setIsOpen] = useState(true);
   const [titleText, setTitleText] = useState<string>("");
   const [contentText, setContentText] = useState<string>("");
   // const context = useContext(ProjectContext);

   const [blogs, setBlogs] = useState<Blog[]>([
      { type: 'Text', brand: 'Hello', description: 'How are you', lang: 'English', toggle: true, words: 5 },
      { type: 'Image', brand: 'brand', description: 'aaa', lang: 'English', toggle: false, words: 10 },
      { type: 'Video', brand: 'brand', description: 'aaa', lang: 'English', toggle: false, words: 10 },
   ]);

   console.log({ blogs })

   const handleClicked = async () => {
      // console.log(context);
      try {
         if (blogs && blogs[0]?.toggle && blogs[0].words) {
            const payload = { title: blogs[0].brand || 'Greeting', description: blogs[0].description || '', lang: blogs[0]?.lang || 'English', words: blogs[0]?.words || 5 }
            setIsOpen(true);
            const res = await createAITextAction(payload);
            setIsOpen(false);
            if (res) {
               const responseArray = res.split("\n");
               const title = responseArray[0];
               const content = responseArray.slice(1).join("\n");
               setTitleText(title || "No Title");
               setContentText(content || "No Content")
            }
            // setContentText(res || 'Please confirm Options');
            console.log("Response", { res })
         }

      } catch (error: any) {
         console.log(error);
         setContentText("You can't create Content. Please check your subscription");
      }

   }

   const handleSave = async () => {
      setTitleText("");
      setContentText("");


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


            <Dialog>
               <DialogTrigger asChild>
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
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                     <DialogTitle>Display Content</DialogTitle>
                     <DialogDescription>
                        Make changes to your content here. Click save when you're done.
                     </DialogDescription>
                  </DialogHeader>
                  {/* <GlobalLoader displaySpinner={isOpen} /> */}
                  <div className={"flex flex-col gap-4 py-4"}>
                     <div className={"flex flex-row gap-4 items-center"}>
                        <Label htmlFor="title" className={""}>
                           Title
                        </Label>
                        <Textarea
                           id="title"
                           defaultValue=""
                           value={titleText}
                           className="col-span-1"
                           onChange={(e) => {setTitleText(e.target.value)}}
                        />
                     </div>
                     <div className={"flex flex-col gap-4"}>
                        <Label htmlFor="description" className={""}>
                           Description
                        </Label>
                        <Textarea
                           id="description"
                           defaultValue=""
                           value={contentText}
                           className={"w-full h-80"}
                           onChange={(e) => {setContentText(e.target.value)}}
                        />
                     </div>
                     <div className={"flex flex-col gap-4"}>
                        <Label htmlFor="description" className={""}>
                           Image
                        </Label>

                     </div>
                  </div>
                  <DialogFooter className={'flex flex-row justify-between'}>
                     <DialogClose asChild>
                        <Button variant={'outline'} onClick={() => { setTitleText(""); setContentText("") }}>
                           Close
                        </Button>
                     </DialogClose>
                     <DialogClose asChild>
                        <Button variant={'outline'} onClick={handleSave}>Save changes</Button>
                     </DialogClose>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </PageBody>
      </>
   )
}

