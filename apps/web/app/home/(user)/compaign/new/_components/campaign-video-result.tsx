'use client'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { Button } from "@kit/ui/button"
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Video, RectangleHorizontal, RectangleVertical, Square } from 'lucide-react';
import { WithAnimation } from "~/home/(user)/_components/animated-element";
import { Label } from '@kit/ui/label'
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group"

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
    const classNamePerRatio = () => {
        switch (projectProps.pVideoRatio) {
            case 'horizontal':
                return 'max-w-[500px] h-[300px]'
            case 'vertical':
                return 'max-w-[300px] h-[500px]'
            case 'square':
                return 'max-w-[500px] h-[500px]'
            default:
                return 'max-w-[500px] h-[500px]'
        }
    }
    const loadingClassNamePerRatio = () => {
        switch (projectProps.pVideoRatio) {
            case 'horizontal':
                return 'min-w-[500px] h-[280px]'
            case 'vertical':
                return 'min-w-[300px] h-[480px]'
            case 'square':
                return 'min-w-[500px] h-[480px]'
            default:
                return 'min-w-[500px] h-[480px]'
        }
    }
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
                body: JSON.stringify({ prompt: `${projectProps.pMainTopic} and ${projectProps.pSubTopic}` ?? '', ratio: projectProps.pVideoRatio })
                // body: JSON.stringify({ prompt: projectProps.pTextContent ?? '', ratio: projectProps.pVideoRatio })
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
            setLoading(false);
        }

    }

    return (
        <WithAnimation mode="zoom">

            <div className="bg-neutral-100 dark:bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">
                <div className="flex items-center gap-[10px] m-auto">
                    <RadioGroup
                        disabled={loading === true}

                        className="h-full" defaultValue="horizontal"
                        onValueChange={(v: string) => {
                            setProjectValue({ ...projectProps, pVideoRatio: v })
                        }}
                        value={projectProps.pVideoRatio}
                    >
                        <div className="flex items-center justify-start gap-[10px] h-full">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="horizontal" />
                                <RectangleHorizontal />
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="vertical" />
                                <RectangleVertical />
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="square" />
                                <Square />
                            </div>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                    {/* <Label children={t('Generated images based on the content.')} /> */}
                    {loading === true ?
                        <div className={`animate-pulse flex justify-center border-2 border-slate-700 border-dashed rounded-lg  m-auto h-[400px] p-2 ${loadingClassNamePerRatio()}`}>
                            <div className="flex justify-center h-full w-full">
                                <div className="h-full w-full bg-slate-400  dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        :
                        projectProps.pVideo?.length > 0 ?
                            <div className="w-[70%] m-auto">
                                <video
                                    className="w-full aspect-video mt-8 rounded-lg border bg-black"
                                    controls
                                >
                                    <source src={projectProps.pVideo} />
                                </video>
                            </div>
                            :
                            <div className={`flex justify-center items-center w-[60%] m-auto h-[400px] border-2 border-slate-700 border-dashed rounded-lg ${classNamePerRatio()}`}>
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