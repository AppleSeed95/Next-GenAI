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
import { ProjectsType } from "../page";
import { updateUserProject } from "~/home/(user)/project/_lib/server/server-action-user-project";
import { useParams } from "next/navigation";
import { WithAnimation } from "~/home/(user)/_components/animated-element";


export function PersonalContentCreatorContainer(
   props: React.PropsWithChildren<{
      userId: string;
      paths: {
         callback: string;
      },
      projectData: ProjectsType,
      editMode?: boolean
   }>
) {
   const { id } = useParams();
   const projectId = parseInt(id?.toString() ?? '0');
   const client = useSupabase();
   const auth = requireUser(client);

   const [step, setStep] = useState(0);
   const [loading, setLoading] = useState(false);
   const stepDescriptions = ['Config your campaign', 'Platform settings', 'Text generation', 'Image generation', 'Video generation', "Save your project!"]
   const [projectValue, setProjectValue] = useState<ProjectsType>(props.projectData)
   const [generatedTopicIdeas, setGeneratedTopicIdeas] = useState('');
   const { t } = useTranslation('');

   const PROJECT_IMAGE_BUCKET = 'project_image';
   const PROJECT_VIDEO_BUCKET = 'project_video';
   const createToaster = useCallback(
      (promise: () => Promise<unknown>) => {
         return toast.promise(promise, {
            success: t(`${props.editMode ? 'edit' : 'create'}ProjectSuccess`),
            error: t(`${props.editMode ? 'edit' : 'create'}ProjectError`),
            loading: t(`${props.editMode ? 'edit' : 'create'}ProjectLoading`),
         });
      },
      [t],
   );

   const upload = async (resultUrl: string | undefined, mode: string) => {
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
            const bucket = client.storage.from(mode === 'image' ? PROJECT_IMAGE_BUCKET : PROJECT_VIDEO_BUCKET);
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
               const temp = await upload(v, 'image');
               uploadedList.push(temp);
            }));
         }
         let uploadedVideo: string | undefined = '';
         if (projectValue.pVideo?.length > 0) {
            uploadedVideo = await upload(projectValue.pVideo, 'video');
         }
         console.log(projectValue.pVideo, uploadedVideo);

         if (props.editMode) {
            const project = {
               ...projectValue,
               pStartDate: projectValue.pStartDate?.toISOString() ?? '',
               pEndDate: projectValue.pEndDate?.toISOString() ?? '',
               pGeneratedTitles: JSON.stringify(projectValue.pGeneratedTitles),
               pImages: JSON.stringify(uploadedList),
               pVideo: uploadedVideo ?? ''
            };
            const res = await updateUserProject({ ...project, id: projectId })
         } else {
            const pUserId = (await auth).data?.id

            if ((await auth).data && pUserId) {
               const project = {
                  ...projectValue,
                  pUserId,
                  pStartDate: projectValue.pStartDate?.toISOString() ?? '',
                  pEndDate: projectValue.pEndDate?.toISOString() ?? '',
                  pGeneratedTitles: JSON.stringify(projectValue.pGeneratedTitles),
                  pImages: JSON.stringify(uploadedList),
                  pVideo: uploadedVideo ?? ''
               };
               const payload = {
                  ...project
               }
               const res = await saveProjectAction(payload);
            }
         }


         setLoading(false);
      }

      createToaster(promise);
   }, [createToaster, projectValue])

   return (
      <>
         <div className={'relative flex flex-col gap-10'}>
            <div className="px-[150px] pb-[50px]">
               <CompaignStepIndicatorCpn useText={projectValue.pUseText} useImage={projectValue.pUseImage} useVideo={projectValue.pUseVideo} setCurrentStep={setStep} steps={['config', 'pPlatform', 'text', 'image', 'video', 'complete']} currentStep={step} />
            </div>
            <WithAnimation mode="up">
               <div className="w-full flex justify-center font-bold text-[25px] text-center">
                  {
                     stepDescriptions[step] ?? ''
                  }
               </div>
            </WithAnimation>

            <div className="">
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
            </div>
         </div >
      </>
   )
}