"use client"

import * as React from "react"
import { ProjectCardCpn } from "./card-project";

export type ProjectType = {
   created_at: string,
   id: number,
   pAtmosphere: string | null,
   pCnt: number | null,
   pEndDate: string | null,
   pGeneratedTitles: string | null,
   pImageBrand: string | null,
   pImageCnt: number | null,
   pImageFormat: string | null,
   pImageRatio: string | null,
   pImages: string | null,
   pMainTopic: string | null,
   pMode: string | null,
   pName: string | null,
   pPlatform: string | null,
   pPlatformurl: string | null,
   pPostMode: string | null,
   pStartDate: string | null,
   pState: boolean | null,
   pSubTopic: string | null,
   pTextContent: string | null,
   pTitle: string | null,
   pUseImage: boolean | null,
   pUserId: string | null,
   pUseText: boolean | null,
   pUseVideo: boolean | null,
   pVideo: string | null
}


type PropsType = {
   projects: ProjectType[]
}


export function CardProject(props: PropsType) {

   const savedProject = props.projects;

   return (
      <div className="flex flex-col items-center space-x-4 w-full py-8 gap-8">
         {savedProject?.length > 0 ? savedProject.map((item, index) => (
            <ProjectCardCpn project={item} key={index} />
         )) : <div>
            no project
         </div>}
      </div>
   )
}
