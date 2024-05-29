"use client"

import { Heading } from "@kit/ui/heading"
import { PageBody } from "@kit/ui/page"
import { Trans } from "@kit/ui/trans"
import { HomeLayoutPageHeader } from "~/home/(user)/_components/home-page-header"
import { Button } from "@kit/ui/button"
import { useState } from "react";
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
import { createAIImageAction, createAITextAction, createAIVideoAction } from "../_lib/server/server-action"
import CompaignImageCard from "./compaign-image-card"
import CompaignVideoCard from "./compaign-video-card"
import CompaignTextCard from "./compaign-text-card"


export type BlogText = {
   type: string;
   toggle: boolean;
   words: number;
   lang: string;
   brand: string;
   description?: string;
}

export type BlogImage = {
   type: string;
   toggle: boolean;
   format: string;
   amount: number;
   scale: number,
   description?: string;
}

export type BlogVideo = {
   type: string;
   toggle: boolean;
   format: string;
   length: number,
   description?: string;
}

export function CompaignContent() {
   const [isOpen, setIsOpen] = useState(true);
   const [titleText, setTitleText] = useState<string>("");
   const [contentText, setContentText] = useState<string>("");
   // const context = useContext(ProjectContext);

   const [blogText, setBlogText] = useState<BlogText>(
      { type: 'Text', brand: 'Hello', description: 'How are you', lang: 'English', toggle: true, words: 5 }
   );
   const [blogImage, setBlogImage] = useState<BlogImage>(
      { type: 'Image', format: 'png', description: 'How are you', amount: 1, toggle: true, scale: 0.8 }
   );
   const [blogVideo, setBlogVideo] = useState<BlogVideo>(
      { type: 'Video', format: 'mp4', description: 'How are you', length: 30, toggle: true }
   );



   const handleClicked = async () => {
      // console.log(context);
      try {
         if (blogText?.toggle && blogText.words) {
            const payloadText = { title: blogText.brand || 'Greeting', description: blogText.description || '', lang: blogText?.lang || 'English', words: blogText?.words || 5 }

            const payloadImage = { format: blogImage.format || 'png', description: blogImage.description || '', amount: blogImage.amount || 1, scale: blogImage.scale || 0.8 }

            const payloadVideo = { format: blogVideo.format || 'mp3', description: blogVideo.description || '', length: blogVideo.length || 30 }

            setIsOpen(true);
            const resText = await createAITextAction(payloadText);
            // if (blogImage.toggle) {
            //    // const resImage = await createAIImageAction(payloadImage);
            // }
            // if (blogVideo.toggle) {
            //    // const resVideo = await createAIVideoAction(payloadVideo);
            // }
            setIsOpen(false);
            if (resText) {
               const responseArray = resText.split("\n");
               const title = responseArray[0];
               const content = responseArray.slice(1).join("\n");
               setTitleText(title || "No Title");
               setContentText(content || "No Content")
            }
            // setContentText(res || 'Please confirm Options');
            console.log("Response", { resText })
         } else {
            setContentText("Please confirm options. You have to set toggle true and input number of sentences");
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
            <CompaignTextCard blogText={blogText} onChange={(data) => { setBlogText(data) }} />
            <CompaignImageCard blogImage={blogImage} onChange={(data) => { setBlogImage(data) }} />
            <CompaignVideoCard blogVideo={blogVideo} onChange={(data) => { setBlogVideo(data) }} />
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
                           onChange={(e) => { setTitleText(e.target.value) }}
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
                           onChange={(e) => { setContentText(e.target.value) }}
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

