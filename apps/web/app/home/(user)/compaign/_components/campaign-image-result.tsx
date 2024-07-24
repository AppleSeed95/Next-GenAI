'use client'
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { ProjectsType } from "./personal-compaign-creator-container"
import { createAIImageAction } from '../_lib/server/server-action';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { Button } from "@kit/ui/button";
import { Input } from "@kit/ui/input";
import { Textarea } from "@kit/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@kit/ui/select"
import { RadioGroup, RadioGroupItem } from "@kit/ui/radio-group"



export interface CampaignImageResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void,
    previousStep: number,
    nextStep: number
}


export const CampaignImageResultCpn = ({ projectProps, setCurrentStep, setProjectValue, previousStep, nextStep }: CampaignImageResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [result, setResult] = useState<string[]>([]);
    const generateImage = async () => {
        setLoading(true);
        const result = await createAIImageAction({ idea: projectProps.pUseText ? projectProps.pTextContent : `topic:${projectProps.pMainTopic}-${projectProps.pSubTopic}, atmosphere: ${projectProps.pAtmosphere} ` });
        if (result != "Error") {
            const filteredImageUrls: string[] = result.filter((url): url is string => url !== undefined);
            setResult(filteredImageUrls);
            setProjectValue({ ...projectProps, pImages: filteredImageUrls });
        }
        setLoading(false);
    }
    return (
        <div className="bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">
            <div className="mb-[20px]  flex flex-col gap-[10px] w-full">
                <Label children={t('Image settings')} />
                <div className="flex gap-[20px]">
                    <div className='flex flex-col gap-[20px]'>
                        <div className="flex items-center gap-[10px]">
                            <Label className="min-w-[80px]" children={t('Format')} />
                            <Select
                                onValueChange={(v: string) => {
                                    console.log(v);

                                }}
                            >
                                <SelectTrigger >
                                    <SelectValue placeholder="Select a format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>formats</SelectLabel>
                                        <SelectItem value="jpg">jpg</SelectItem>
                                        <SelectItem value="png">png</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <Label className="min-w-[80px]" children={t('Ratio')} />
                            <RadioGroup
                                className="h-full" defaultValue="horizontal">
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
                        <div className="flex items-center gap-[10px]">
                            <Label className="min-w-[80px]" children={t('number')} />
                            <Input type='number' />
                        </div>
                    </div>
                    <div className="flex w-full  gap-[10px]">
                        <div className='pt-[5px]'>
                            <Label children={t('Addition')} />
                        </div>
                        <Textarea className="h-full w-full grow" placeholder="Additional information to the bot(e.g like photographs, etc.)" />
                    </div>

                </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
                {/* <Label children={t('Generated images based on the content.')} /> */}
                {loading === true ?
                    <div className="animate-pulse flex justify-center space-x-4">
                        <div className="flex justify-center space-y-2 py-1">
                            <div className="h-[300px] w-[500px] bg-slate-800 rounded"></div>
                            {/* <div className="h-4 bg-slate-800 rounded"></div> */}
                            {/* <div className="h-4 bg-slate-800 rounded"></div> */}
                        </div>
                    </div>
                    :
                    loading !== null && <div className='flex gap-[10px] justify-center'>
                        {
                            result?.length ?
                                result.map((a, idx) => (
                                    <div key={idx}>
                                        <Image width={500} height={300} key={idx} alt='img' src={a} />
                                    </div>
                                )) : null
                        }
                    </div>
                }
            </div>
            <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                <Button variant={'outline'} onClick={() => setCurrentStep(previousStep)}><ChevronLeft />Prev</Button>
                <Button variant={'outline'} onClick={() => generateImage()}><Check />Generate</Button>
                <Button variant={'outline'} onClick={() => setCurrentStep(nextStep)}>Next <ChevronRight /></Button>
            </div>
        </div>
    )
}