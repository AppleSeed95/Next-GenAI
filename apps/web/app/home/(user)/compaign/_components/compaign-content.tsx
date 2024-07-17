"use client"

import { Heading } from "@kit/ui/heading"
import { PageBody } from "@kit/ui/page"
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
import CompaignImageCard from "./content-image-card"
import CompaignVideoCard from "./content-video-card"
import CompaignTextCard from "./content-text-card"
import { useTranslation } from "react-i18next"
import { ProjectsType } from "./personal-compaign-creator-container"
import { createAIImageAction, createAITextAction, saveProjectAction } from "../_lib/server/server-action"
import { useSupabase } from "@kit/supabase/hooks/use-supabase"
import { requireUser } from "@kit/supabase/require-user"
import { CarouselImage } from "./image-dwonload-regenerate/image-carousel";

const PROJECT_BUCKET = 'project_image_storage'

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
   size: string,
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
   userId: string,
   generatedTopicIdeas: string,
   onChange: (projectValue: ProjectsType) => void,
}

export function CompaignContent(props: Props) {
   const [isOpen, setIsOpen] = useState(true);
   const [titleText, setTitleText] = useState<string>("");
   const [contentText, setContentText] = useState<string>("");
   const [imageURL, setImageURL] = useState<string[]>([
      "/images/livingroom5.png",
      "/images/livingroom9.png",
   ]);
   const { t } = useTranslation();
   const client = useSupabase();
   const auth = requireUser(client);

   const [blogText, setBlogText] = useState<BlogText>(
      {
         type: 'Text',
         maintopic: props.projectValue.pMainTopic,
         subtopic: props.projectValue.pSubTopic,
         brand: 'Hello',
         description: 'How are you',
         lang: 'English',
         toggle: true,
         words: 5
      }
   );
   const [blogImage, setBlogImage] = useState<BlogImage>(
      {
         type: 'Image',
         maintopic: props.projectValue.pMainTopic,
         subtopic: props.projectValue.pSubTopic,
         format: 'png',
         description: 'How are you',
         amount: 1,
         toggle: true,
         size: "1024x1024"
      }
   );
   const [blogVideo, setBlogVideo] = useState<BlogVideo>(
      { type: 'Video', maintopic: props.projectValue.pMainTopic, subtopic: props.projectValue.pSubTopic, format: 'mp4', description: 'How are you', length: 30, toggle: true }
   );

   const handleClicked = async () => {
      try {
         const payloadText = {
            brand: blogText.brand,
            description: blogText.description || '',
            lang: blogText.lang,
            words: blogText.words,
            maintopic: props.projectValue.pMainTopic,
            subtopic: props.projectValue.pSubTopic
         }

         const payloadImage = {
            format: blogImage.format,
            description: blogImage.description || '',
            amount: blogImage.amount,
            size: blogImage.size,
            topicIdea: props.generatedTopicIdeas,
            maintopic: props.projectValue.pMainTopic,
            subtopic: props.projectValue.pSubTopic
         }

         // const payloadVideo = {
         //    format: blogVideo.format || 'mp3',
         //    description: blogVideo.description || '',
         //    length: blogVideo.length || 30,
         //    maintopic: props.projectValue.pMainTopic,
         //    subtopic: props.projectValue.pSubTopic
         // }

         if (blogText?.toggle && blogText.words) {

            setIsOpen(true);
            if (props.projectValue.platform) {
               const resText = await createAITextAction(payloadText);
               if (resText) {
                  const responseArray = resText.split("\n");
                  const title = responseArray[0];
                  const content = responseArray.slice(1).join("\n");
                  setTitleText(title || "No Title");
                  setContentText(content || "No Content")

                  console.log("Response", { resText });
               } else {
                  setContentText("Please confirm your Network Connection");
               }
            } else {
               setContentText("Select Platform");
            }
            setIsOpen(false);


         } else {
            setContentText("Please confirm options. You have to set toggle true and input number of sentences");
         }

         if (blogImage.toggle) {
            console.log(props.generatedTopicIdeas);
            const resImage = await createAIImageAction(payloadImage);

            if (resImage != "Error") {
               const filteredImageUrls: string[] = resImage.filter((url): url is string => url !== undefined);
               setImageURL(filteredImageUrls);
               console.log(filteredImageUrls);
            } else {
               setImageURL(['']);
               setContentText("Please confirm your Network Connection");
            }
         } else {
            setContentText("Please confirm options. You have to set toggle true and input number of images");
         }
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
      const account_id = (await auth).data?.id

      if ((await auth).data) {
         const payload = {
            project_name: props.projectValue.pName.toLowerCase(),
            account_id: account_id?.toLowerCase() || '',
            title: titleText.toLowerCase(),
            platform: props.projectValue.platform.toLowerCase(),
            topic: props.projectValue.pMainTopic.toLowerCase(),
            subtopic: props.projectValue.pSubTopic.toLowerCase(),
            start_date: props.projectValue.pstartDate.toISOString(),
            end_date: props.projectValue.pendDate.toISOString(),
            state: props.projectValue.pstate,
            mode: props.projectValue.pmode.toLowerCase(),
            created_by: account_id || '',
            updated_by: null,
         }
         const res = await saveProjectAction(payload);
         await upload();

         if (res) {
            alert("saved successfully!")
         } else {
            alert("can't save content!")
         }

      }
   }

   const upload = async () => {
      console.log(process.env.NEXT_PUBLIC_SITE_URL)
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const url = `${baseUrl}/api/extra-fetch`;
      try {
         const response = await fetch(url, {
            method: 'POST',   // Specify the HTTP method
            headers: {
               'Content-Type': 'application/json',  // Required for JSON payloads
            },
            body: JSON.stringify({ url: imageURL[0] })  // Convert the JavaScript object to a JSON string
         })
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         if (response.body) {
            const bucket = client.storage.from(PROJECT_BUCKET);
            const reader = response.body.getReader();
            const chunks = [];
            let push;
            while (!(push = await reader.read()).done) {
               chunks.push(push.value);
            }
            const blob = new Blob(chunks, { type: 'image/png' });
            const filename = "your_image.png"
            const file = new File([blob], filename, {
               type: blob.type,
               lastModified: new Date().getTime() // or any timestamp representing file's last modification
            })
            const bytes = await file.arrayBuffer();
            const extension = blogImage.format;
            const fileName = await getImageFileName(props.userId, extension);
            console.log(typeof (bytes))
            const uploaded = await bucket.upload(fileName, bytes);
         }

      } catch (error) {
         console.error('Error uploading image:', error);
      }
   }

   async function getImageFileName(userId: string, extenstion: string | undefined) {
      const { nanoid } = await import('nanoid');
      const uniqueId = nanoid(16);
      const formattedProjectName = props.projectValue.pName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      return `${userId}.${extenstion}?v=${uniqueId}`;
      // return `${userId}_${formattedProjectName}.${extenstion}?v=${uniqueId}`;
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
               <DialogContent className="sm:max-w-[600px] max-h-full overflow-y-auto scrollbar-hide">
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
                           className={"w-full h-40"}
                           onChange={(e) => { setContentText(e.target.value) }}
                        />
                     </div>
                     <div className={"flex flex-col gap-4"}>
                        <Label htmlFor="description" className={""}>
                           {t('Image')}
                        </Label>
                        {imageURL &&
                           (<CarouselImage imageURL={imageURL} initialImageUrl={"/images/livingroom5.png"} />)}
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

