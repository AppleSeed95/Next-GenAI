'use client'
import { CompaignContent } from "./compaign-content";
import { CompaignHeader } from "./compaign-header";
import { CompaignPlatformSelect } from "./compain-platform-select";
import { CompaignStepIndicatorCpn } from "./compaign-step-indicator";
import React, { useState } from "react";
import { CampaignTextResultCpn } from "./campaign-text-result";

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
   pPostMode: string
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
   const stepDescriptions = ['Config your campaign', 'Platform settings']
   const [projectValue, setProjectValue] = useState<ProjectsType>({
      pName: 'test',
      pMainTopic: 'test',
      pSubTopic: 'test',
      pmode: 'auto',
      pstate: true,
      pCnt: 1,
      pstartDate: new Date(),
      pendDate: new Date(),
      platform: 'linkedin',
      platformurl: '',
      pAtmosphere: JSON.stringify([]),
      pPostMode: 'weekly'
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
            {step === 2 && <CampaignTextResultCpn projectProps={projectValue} />}
            {/* <CompaignContent projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} userId={props.userId} generatedTopicIdeas={generatedTopicIdeas} /> */}
         </div>
      </>
   )
}