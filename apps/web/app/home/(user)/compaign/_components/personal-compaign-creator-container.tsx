'use client'
import { CompaignContent } from "./compaign-content";
import { CompaignHeader } from "./compaign-header";
import { CompaignPlatformSelect } from "./compain-platform-select";
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
   pmode: string;
   pstate: boolean;
   pstartDate: Date;
   pendDate: Date;
   platform: string,
   platformurl: string,
   pCnt: number,
   pAtmosphere: string,
   pPostMode: string,
   pTitle: string,
   pTextContent: string,
   pImages: string[]
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
      pMainTopic: 'football',
      pSubTopic: 'goalkeeper',
      pmode: 'auto',
      pstate: true,
      pCnt: 1,
      pstartDate: new Date(),
      pendDate: new Date(),
      platform: 'linkedin',
      platformurl: '',
      pAtmosphere: JSON.stringify([]),
      pPostMode: 'weekly',
      pTitle: '',
      pTextContent: '',
      pImages: [],
   })
   const [generatedTopicIdeas, setGeneratedTopicIdeas] = useState('');

   return (
      <>
         <div className={'flex flex-col gap-10'}>
            <div className="px-[150px] pb-[50px]">
               <CompaignStepIndicatorCpn setCurrentStep={setStep} steps={['config', 'platform', 'text', 'image', 'video', 'complete']} currentStep={step} />
            </div>
            <div className="text-center">
               {`${step + 1}. ${stepDescriptions[step] ?? ''}`}
            </div>
            {step === 0 && <CompaignHeader currentStep={0} setCurrentStep={setStep} projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} />}
            {step === 1 && <CompaignPlatformSelect setCurrentStep={setStep} projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} generatedTopicIdeas={generatedTopicIdeas} setGeneratedTopicIdeas={(data) => setGeneratedTopicIdeas(data)} />}
            {step === 2 && <CampaignTextResultCpn setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 3 && <CampaignImageResultCpn setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 4 && <CampaignVideoResultCpn setCurrentStep={setStep} projectProps={projectValue} setProjectValue={setProjectValue} />}
            {step === 5 && <CampaignResultFinalCpn setCurrentStep={setStep} projectProps={projectValue} />}
            {/* <CompaignContent projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} userId={props.userId} generatedTopicIdeas={generatedTopicIdeas} /> */}
         </div>
      </>
   )
}