"use client"

import { Heading } from "@kit/ui/heading"
import { PageBody } from "@kit/ui/page"
import { Trans } from "@kit/ui/trans"
import { HomeLayoutPageHeader } from "~/home/(user)/_components/home-page-header"
import { Button } from "@kit/ui/button"
import { useState, useTransition } from "react";
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
import CompaignImageCard from "./content-image-card"
import CompaignVideoCard from "./content-video-card"
import CompaignTextCard from "./content-text-card"
import { useTranslation } from "react-i18next"
import { ProjectsType } from "./personal-compaign-creator-container"


export type BlogText = {
   type: string;
   maintopic: string;
   subtopic: string;
   toggle: boolean;
   words: number;
   lang: string;
   brand: string;
   description?: string;
}

export type BlogImage = {
   type: string;
   maintopic: string;
   subtopic: string;
   toggle: boolean;
   format: string;
   amount: number;
   scale: number,
   description?: string;
}

export type BlogVideo = {
   type: string;
   maintopic: string;
   subtopic: string;
   toggle: boolean;
   format: string;
   length: number,
   description?: string;
}

type Props = {
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}

export function CompaignContent(props: Props) {
   const [isOpen, setIsOpen] = useState(true);
   const [titleText, setTitleText] = useState<string>("");
   const [contentText, setContentText] = useState<string>("");
   const { t } = useTranslation();
   // const context = useContext(ProjectContext);

   const [blogText, setBlogText] = useState<BlogText>(
      { type: 'Text', maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic, brand: 'Hello', description: 'How are you', lang: 'English', toggle: true, words: 5 }
   );
   const [blogImage, setBlogImage] = useState<BlogImage>(
      { type: 'Image', maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic, format: 'png', description: 'How are you', amount: 1, toggle: true, scale: 0.8 }
   );
   const [blogVideo, setBlogVideo] = useState<BlogVideo>(
      { type: 'Video', maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic, format: 'mp4', description: 'How are you', length: 30, toggle: true }
   );

   const handleClicked = async () => {
      // console.log(context);
      try {
         if (blogText?.toggle && blogText.words) {
            const payloadText = { brand: blogText.brand || 'Greeting', description: blogText.description || '', lang: blogText?.lang || 'English', words: blogText?.words || 5, maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic }

            const payloadImage = { format: blogImage.format || 'png', description: blogImage.description || '', amount: blogImage.amount || 1, scale: blogImage.scale || 0.8, maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic }

            const payloadVideo = { format: blogVideo.format || 'mp3', description: blogVideo.description || '', length: blogVideo.length || 30, maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic }

            setIsOpen(true);
            // const resText = await createAITextAction(payloadText);
            setIsOpen(false);

            // if (resText) {
            //    const responseArray = resText.split("\n");
            //    const title = responseArray[0];
            //    const content = responseArray.slice(1).join("\n");
            //    setTitleText(title || "No Title");
            //    setContentText(content || "No Content")
            // }
            // console.log("Response", { resText })
         } else {
            setContentText("Please confirm options. You have to set toggle true and input number of sentences");
         }

         // if (blogImage.toggle) {
         //    // const resImage = await createAIImageAction(payloadImage);
         // }
         // if (blogVideo.toggle) {
         //    // const resVideo = await createAIVideoAction(payloadVideo);
         // }

      } catch (error: any) {
         console.log(error);
         setContentText("You can't create Content. Please check your subscription");
      }

   }

   const handleSave = async () => {
      setTitleText("");
      setContentText("");
      console.log(props.projectValue)
   }

   return (
      <PageBody className={'flex flex-col gap-9'}>
         <div>
            <Heading level={4} className={''} children={'Content'} />
         </div>
         <div className={'flex flex-col gap-8'}>
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
                           <Heading level={5} children={t('Save Compaign')} />
                        </div>
                     </Button>
                  </div>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                     <DialogTitle>{t('Display Content')}</DialogTitle>
                     <DialogDescription>
                        {t("Make changes to your content here. Click save when you're done.")}
                     </DialogDescription>
                  </DialogHeader>
                  <div className={"flex flex-col gap-4 py-4"}>
                     <div className={"flex flex-row gap-4 items-center"}>
                        <Label htmlFor="title" className={""}>
                           {t('Title')}
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
                           {t('Description')}
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
                           {t('Image')}
                        </Label>

                     </div>
                  </div>
                  <DialogFooter className={'flex flex-row justify-between'}>
                     <DialogClose asChild>
                        <Button variant={'outline'} onClick={() => { setTitleText(""); setContentText("") }}>
                           {t('Close')}
                        </Button>
                     </DialogClose>
                     <DialogClose asChild>
                        <Button variant={'outline'} onClick={handleSave}>{t('Save changes')}</Button>
                     </DialogClose>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </div>
      </PageBody>
   )
}

