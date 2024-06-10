"use client"

import * as React from "react"
import { SaveOneProject } from "./card-saved-one-project";

export type ProjectType = {
   account_id: string;
   created_at: string;
   created_by: string;
   end_date: string;
   id: number;
   mode: string;
   platform: string;
   project_name: string;
   start_date: string;
   state: boolean;
   subtopic: string | null;
   title: string;
   topic: string;
   updated_by: string | null
}

type PropsType = {
   projects: ProjectType[]
}


export function CardProject(props: PropsType) {

   const savedProject = props.projects;

   return (
      <div className="flex flex-col items-center space-x-4 w-full gap-8">
         {savedProject.map((item) => (
            <SaveOneProject saveValue={item} />
         ))}
      </div>
   )
}
