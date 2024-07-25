'use client'
import { CompaignHeader } from "./compaign-header";
import { CompaignpPlatformSelect } from "./compain-platform-select";
import { CompaignStepIndicatorCpn } from "./compaign-step-indicator";
import React, { useState, useCallback } from "react";
import { CampaignTextResultCpn } from "./campaign-text-result";
import { CampaignImageResultCpn } from "./campaign-image-result";
import { CampaignVideoResultCpn } from "./campaign-video-result";
import { CampaignResultFinalCpn } from "./campaign-result-final";

import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { saveProjectAction } from "../_lib/server/server-action";
import { requireUser } from "@kit/supabase/require-user"


export type ProjectsType = {
   pName: string;
   pMainTopic: string;
   pSubTopic: string;
   pMode: string;
   pState: boolean;
   pStartDate: Date | undefined;
   pEndDate: Date | undefined;
   pPlatform: string,
   pPlatformurl: string,
   pCnt: number,
   pAtmosphere: string,
   pPostMode: string,
   pTitle: string,
   pTextContent: string,
   pGeneratedTitles: string[],
   pImages: string[],
   pImageBrand: string,
   pImageFormat: string,
   pImageCnt: number,
   pImageRatio: string,
   pUseText: boolean,
   pUseImage: boolean,
   pUseVideo: boolean,
}


export function PersonalContentCreatorContainer(
   props: React.PropsWithChildren<{
      userId: string;
      paths: {
         callback: string;
      }
   }>
) {
   const client = useSupabase();
   const auth = requireUser(client);

   const [step, setStep] = useState(0);
   const [loading, setLoading] = useState(false);
   const stepDescriptions = ['Config your campaign', 'Platform settings', 'Text generation', 'Image generation', 'Video generation', "Save your project!"]
   const [projectValue, setProjectValue] = useState<ProjectsType>({
      pName: 'test',
      pMainTopic: 'test',
      pSubTopic: 'test',
      pMode: 'auto',
      pState: true,
      pCnt: 1,
      pStartDate: new Date(),
      pEndDate: new Date(),
      pPlatform: 'linkedin',
      pPlatformurl: '',
      pAtmosphere: JSON.stringify([]),
      pPostMode: 'weekly',
      pTitle: '',
      pTextContent: '',
      pGeneratedTitles: [],
      pImages: [],
      pImageBrand: '',
      pImageFormat: 'png',
      pImageCnt: 1,
      pImageRatio: 'horizontal',
      pUseText: true,
      pUseImage: true,
      pUseVideo: true
   })
   const [generatedTopicIdeas, setGeneratedTopicIdeas] = useState('');
   const { t } = useTranslation('');

   const PROJECT_IMAGE_BUCKET = 'project_image';
   const createToaster = useCallback(
      (promise: () => Promise<unknown>) => {
         return toast.promise(promise, {
            success: t(`createProjectSuccess`),
            error: t(`createProjectError`),
            loading: t(`createProjectLoading`),
         });
      },
      [t],
   );

   const upload = async (resultUrl: string | undefined) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const url = `${baseUrl}/api/extra-fetch`;

      try {
         const response = await fetch(url, {
            method: 'POST',   // Specify the HTTP method
            headers: {
               'Content-Type': 'application/json',  // Required for JSON payloads
            },
            body: JSON.stringify({ url: resultUrl ?? 'test' })  // Convert the JavaScript object to a JSON string
         })
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         if (response.body) {
            const bucket = client.storage.from(PROJECT_IMAGE_BUCKET);
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
            const { nanoid } = await import('nanoid');
            const uniqueId = nanoid(16);
            const uploaded = await bucket.upload(uniqueId, bytes);
            if (!uploaded.error) {
               return bucket.getPublicUrl(uniqueId).data.publicUrl;
            }
            throw uploaded.error;

         }

      } catch (error) {
         console.error('Error uploading image:', error);
      }
   }


   const saveCampaign = useCallback(() => {
      setLoading(true);

      const promise = async () => {
         const uploadedList: any[] = [];
         if (projectValue.pImages.length > 0) {
            await Promise.all(projectValue.pImages.map(async (v) => {
               const temp = await upload(v);
               console.log('temp', temp)
               uploadedList.push(temp);
            }));

         }
         const pUserId = (await auth).data?.id

         if ((await auth).data && pUserId) {
            const project = {
               ...projectValue,
               pUserId,
               pStartDate: projectValue.pStartDate?.toISOString() ?? '',
               pEndDate: projectValue.pEndDate?.toISOString() ?? '',
               pGeneratedTitles: JSON.stringify(projectValue.pGeneratedTitles),
               pImages: JSON.stringify(uploadedList),
            };
            const payload = {
               ...project
            }
            const res = await saveProjectAction(payload);
         }
         setLoading(false);
      }

      createToaster(promise);
   }, [createToaster, projectValue])

   return (
      <>
         <div className={'flex flex-col gap-10'}>
            <div className="px-[150px] pb-[50px]">
               <CompaignStepIndicatorCpn useText={projectValue.pUseText} useImage={projectValue.pUseImage} useVideo={projectValue.pUseVideo} setCurrentStep={setStep} steps={['config', 'pPlatform', 'text', 'image', 'video', 'complete']} currentStep={step} />
            </div>
            <div className="font-bold text-[25px] text-center">
               {`${stepDescriptions[step] ?? ''}`}
            </div>
            {step === 0 && <CompaignHeader currentStep={0} setCurrentStep={setStep} projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} />}
            {step === 1 && <CompaignpPlatformSelect
               previousStep={0}
               nextStep={projectValue.pUseText ? 2 : projectValue.pUseImage ? 3 : projectValue.pUseVideo ? 4 : 5}
               setCurrentStep={setStep} projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} generatedTopicIdeas={generatedTopicIdeas} setGeneratedTopicIdeas={(data) => setGeneratedTopicIdeas(data)} />}
            {step === 2 && <CampaignTextResultCpn
               previousStep={1}
               nextStep={projectValue.pUseImage ? 3 : projectValue.pUseVideo ? 4 : 5}
               setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 3 && <CampaignImageResultCpn
               previousStep={projectValue.pUseText ? 2 : 1}
               nextStep={projectValue.pUseVideo ? 4 : 5}
               setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 4 && <CampaignVideoResultCpn
               previousStep={projectValue.pUseImage ? 3 : projectValue.pUseText ? 2 : 1}
               nextStep={5}
               setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 5 && <CampaignResultFinalCpn
               loading={loading}
               previousStep={projectValue.pUseVideo ? 4 : projectValue.pUseImage ? 3 : projectValue.pUseText ? 2 : 1}
               setCurrentStep={setStep} projectProps={projectValue} saveCampaign={saveCampaign} />}
            {/* <CompaignContent projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} userId={props.userId} generatedTopicIdeas={generatedTopicIdeas} /> */}
         </div>
      </>
   )
}