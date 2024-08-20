'use client'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { Button } from "@kit/ui/button"
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, Video } from 'lucide-react';
import { WithAnimation } from "~/home/(user)/_components/animated-element";

export interface CampaignVideoResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void,
    previousStep: number,
    nextStep: number
}


export const CampaignVideoResultCpn = ({ projectProps, setCurrentStep, setProjectValue, previousStep, nextStep }: CampaignVideoResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [result, setResult] = useState<String>('');

    const generateVideo = async () => {
        try {
            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
            const url = `${baseUrl}/api/video`;

            const response: any = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: projectProps.pTextContent ?? '' })
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data[0] ?? '');
            setProjectValue({ ...projectProps, pVideo: data[0] ?? '' });

            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }

    }

    return (
        <WithAnimation mode="zoom">

            <div className="bg-neutral-100 dark:bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">

                <div className="flex flex-col gap-[10px] w-full">
                    {/* <Label children={t('Generated images based on the content.')} /> */}
                    {loading === true ?
                        <div className="animate-pulse flex justify-center border-2 border-slate-700 border-dashed rounded-lg w-[60%] m-auto h-[300px] p-2">
                            <div className="flex justify-center h-full w-full">
                                <div className="h-full w-full bg-slate-400  dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        :
                        projectProps.pVideo?.length > 0 ?
                            <div className="w-[60%] m-auto">
                                <video
                                    className="w-full aspect-video mt-8 rounded-lg border bg-black"
                                    controls
                                >
                                    <source src={projectProps.pVideo} />
                                </video>
                            </div>
                            :
                            <div className="flex justify-center items-center w-[60%] m-auto h-[300px] border-2 border-slate-700 border-dashed rounded-lg">
                                <Video className="w-[50px] h-[50px]" />
                            </div>
                    }
                </div>
                <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                    <Button variant={'outline'} onClick={() => setCurrentStep(previousStep)}> <ChevronLeft />Prev</Button>
                    <Button disabled={loading === true} variant={'outline'} onClick={() => generateVideo()}><Check /> Generate</Button>
                    <Button variant={'outline'} onClick={() => setCurrentStep(nextStep)}>Next <ChevronRight /></Button>
                </div>
            </div>
        </WithAnimation>
    )
}