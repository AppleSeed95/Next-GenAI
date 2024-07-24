'use client'
import { CompaignHeader } from "./compaign-header";
import { CompaignpPlatformSelect } from "./compain-platform-select";
import { CompaignStepIndicatorCpn } from "./compaign-step-indicator";
import React, { useState } from "react";
import { CampaignTextResultCpn } from "./campaign-text-result";
import { CampaignImageResultCpn } from "./campaign-image-result";
import { CampaignVideoResultCpn } from "./campaign-video-result";
import { CampaignResultFinalCpn } from "./campaign-result-final";

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
   const [step, setStep] = useState(0);
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
               previousStep={projectValue.pUseVideo ? 4 : projectValue.pUseImage ? 3 : projectValue.pUseText ? 2 : 1}
               setCurrentStep={setStep} projectProps={projectValue} />}
            {/* <CompaignContent projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} userId={props.userId} generatedTopicIdeas={generatedTopicIdeas} /> */}
         </div>
      </>
   )
}