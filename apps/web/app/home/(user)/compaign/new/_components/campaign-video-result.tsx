'use client'
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { Button } from "@kit/ui/button"
import { createAIImageAction } from '../_lib/server/server-action';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CampaignVideoResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void,
    previousStep: number,
    nextStep: number
}


export const CampaignVideoResultCpn = ({ projectProps, setCurrentStep, setProjectValue, previousStep, nextStep }: CampaignVideoResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<string[]>([]);
    // useEffect(() => {
    //     const generateImage = async () => {
    //         setLoading(true);
    //         const result = await createAIImageAction({ idea: projectProps.pTextContent });
    //         if (result != "Error") {
    //             const filteredImageUrls: string[] = result.filter((url): url is string => url !== undefined);
    //             setResult(filteredImageUrls)
    //         }
    //         setLoading(false);
    //     }
    //     generateImage();
    // }, [])
    return (
        <div className="bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">

            <div className="flex flex-col gap-[10px] w-full">
                {/* <Label children={t('Generated images based on the content.')} /> */}
                {loading ?
                    <div className="animate-pulse flex justify-center space-x-4">
                        <div className="flex justify-center space-y-2 py-1">
                            <div className="h-[300px] w-[500px] bg-slate-800 rounded"></div>
                            {/* <div className="h-4 bg-slate-800 rounded"></div> */}
                            {/* <div className="h-4 bg-slate-800 rounded"></div> */}
                        </div>
                    </div>
                    :
                    <div className='flex gap-[10px] justify-center'>
                        {
                            result?.length ?
                                result.map((a, idx) => (
                                    <div key={idx}>
                                        <Image width={300} height={300} key={idx} alt='img' src={a} />
                                    </div>
                                )) : null
                        }
                    </div>
                }
            </div>
            <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                <Button variant={'outline'} onClick={() => setCurrentStep(previousStep)}> <ChevronLeft />Prev</Button>
                <Button variant={'outline'} onClick={() => setCurrentStep(nextStep)}>Next <ChevronRight /></Button>
            </div>
        </div>
    )
}