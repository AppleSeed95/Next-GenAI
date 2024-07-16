'use client'
import { CompaignContent } from "./compaign-content";
import { CompaignHeader } from "./compaign-header";
import { CompaignPlatformSelect } from "./compain-platform-select";
import React, { useState } from "react";

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
}


export function PersonalContentCreatorContainer(
   props: React.PropsWithChildren<{
      userId: string;
      paths: {
         callback: string;
      }
   }>
) {
   const [projectValue, setProjectValue] = useState<ProjectsType>({
      pName: 'Hello',
      pMainTopic: 'Greetings',
      pSubTopic: 'history of Greetings',
      pmode: 'auto',
      pstate: true,
      pstartDate: new Date(),
      pendDate: new Date(),
      platform: 'Linkedin',
      platformurl: ''
   })
   const [generatedTopicIdeas, setGeneratedTopicIdeas] = useState('');

   return (
      <>
         <div className={'flex flex-col gap-10'}>
            <CompaignHeader projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} />
            <CompaignPlatformSelect projectValue={projectValue} onChange={(data) => { setProjectValue(data)}} generatedTopicIdeas={generatedTopicIdeas} setGeneratedTopicIdeas={(data) => setGeneratedTopicIdeas(data)}/>
            <CompaignContent projectValue={projectValue} onChange={(data) => { setProjectValue(data) }} userId={props.userId} generatedTopicIdeas={generatedTopicIdeas}/>
         </div>
      </>
   )
}