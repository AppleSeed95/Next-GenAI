'use client'
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { createAIImageAction } from '../_lib/server/server-action';
import { useState } from 'react';
import Image from 'next/image';
import { ImageMinus, ChevronLeft, ChevronRight, Check, RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
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
import { WithAnimation } from "~/home/(user)/_components/animated-element";




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
    const [cnt, setCnt] = useState(projectProps.pImageCnt);
    const generateImage = async () => {
        setLoading(true);
        let generatedResult: string[] = [];
        for (let index = 0; index < cnt; index++) {
            const result = await createAIImageAction({ idea: projectProps.pUseText ? projectProps.pTextContent : `topic:${projectProps.pMainTopic}-${projectProps.pSubTopic}, atmosphere: ${projectProps.pAtmosphere} ` });
            if (result != "Error") {
                const filteredImageUrls: string[] = result.filter((url): url is string => url !== undefined);
                generatedResult.push(filteredImageUrls[0] ?? '');
            }
        }
        setResult(generatedResult);
        setProjectValue({ ...projectProps, pImages: generatedResult });
        setLoading(false);
    }
    return (
        <WithAnimation mode="zoom">
            <div className="bg-neutral-100 dark:bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">
                <div className="mb-[20px]  flex flex-col gap-[10px] w-full">
                    <Label className="font-bold text-[16px]" children={t('Image settings')} />
                    <div className="flex gap-[20px]">
                        <div className='flex flex-col gap-[20px]'>
                            <div className="flex items-center gap-[10px]">
                                <Label className="min-w-[80px]" children={t('Format')} />
                                <Select
                                    disabled={loading === true}
                                    value={projectProps.pImageFormat}
                                    onValueChange={(v: string) => {
                                        setProjectValue({ ...projectProps, pImageFormat: v })
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
                                    disabled={loading === true}

                                    className="h-full" defaultValue="horizontal"
                                    onValueChange={(v: string) => {
                                        setProjectValue({ ...projectProps, pImageRatio: v })
                                    }}
                                    value={projectProps.pImageRatio}
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
                            <div className="flex items-center gap-[10px]">
                                <Label className="min-w-[80px]" children={t('number')} />
                                <Input
                                    disabled={loading === true}

                                    type='number'
                                    min={1}
                                    max={3}
                                    value={projectProps.pImageCnt}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCnt(value);
                                        setProjectValue({ ...projectProps, pImageCnt: value })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex w-full  gap-[10px]">
                            <div className='pt-[5px]'>
                                <Label children={t('Addition')} />
                            </div>
                            <Textarea
                                disabled={loading === true}
                                className="h-full w-full grow" placeholder="Additional information to the bot(e.g like photographs, etc.)" />
                        </div>

                    </div>
                </div>
                <div className="flex justify-center  gap-[10px] w-full">
                    {loading === true ?
                        <div className='flex w-full  gap-[20px] justify-center'>
                            {[...Array(cnt)].map((_, idx) => (
                                <div key={idx} className="animate-pulse max-w-[500px] w-full flex justify-center border-2 border-dashed rounded-lg p-2">
                                    <div className="h-[300px]  w-full bg-slate-400  dark:bg-slate-800 rounded"></div>
                                </div>
                            ))}
                        </div>
                        :
                        projectProps.pImages?.length ?
                            projectProps.pImages.map((a, idx) => (

                                <div key={idx} className='flex gap-[10px] justify-center '>
                                    <div >
                                        <Image width={500} height={300} key={idx} alt='img' src={a} />
                                    </div>
                                </div>
                            )) :
                            <div className='flex gap-2 w-full'>
                                {new Array(projectProps.pImageCnt).fill(null).map((_, idx) => (
                                    <div key={idx} className='w-full max-w-[500px] grow flex justify-center items-center m-auto h-[300px] border-2 border-dashed rounded-lg'>
                                        <ImageMinus className="w-[50px] h-[50px]" />
                                    </div>
                                ))}
                            </div>

                    }
                </div>
                <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                    <Button variant={'outline'} onClick={() => setCurrentStep(previousStep)}><ChevronLeft />Prev</Button>
                    <Button disabled={loading === true} variant={'outline'} onClick={() => generateImage()}><Check />Generate</Button>
                    <Button variant={'outline'} onClick={() => setCurrentStep(nextStep)}>Next <ChevronRight /></Button>
                </div>
            </div>
        </WithAnimation>
    )
}