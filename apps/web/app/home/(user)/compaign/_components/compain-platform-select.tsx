'use client'

import { Heading } from "@kit/ui/heading";
import { ComboboxDemo } from "../../project/_components/platform-combobox";
import { ComboboxDemoDetail } from "./compaign-page-details";
import { Card } from "@kit/ui/card";
import { Button } from "@kit/ui/button";
import { PageBody } from "@kit/ui/page";
import { useTranslation } from "react-i18next";
import { ProjectsType } from "./personal-compaign-creator-container";
import { useState } from "react";

type Props = {
   projectValue: ProjectsType,
   onChange: (projectValue: ProjectsType) => void,
}




export function CompaignPlatformSelect( props: Props) {
   const { t } = useTranslation();
   const [platform, setPlatform] = useState<string>('Linkedin');
   const [platformurl, setPlatformUrl] = useState<string>('');


   return (
      <PageBody>
         <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-row gap-6'}>
               <Heading level={5} children={t('Plattform')} />
               <ComboboxDemo platform={props.projectValue.platform} onChange={(data) => {setPlatform(data)}}/>
               <ComboboxDemoDetail platformurl={props.projectValue.platformurl} onChange={(data) => {setPlatformUrl(data)}}/>
            </div>
            <Card className={'px-7 py-6'}>
               <Button variant={'outline'} className={'flex flex-row gap-2'}>
                  <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                  </svg>
                  <Heading level={5} children={t('Add more')} />
               </Button>
            </Card>
         </div>
      </PageBody>
   );
}