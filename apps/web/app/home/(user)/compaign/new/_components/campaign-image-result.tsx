'use client'
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { createAIImageAction } from '../_lib/server/server-action';
import { useState } from 'react';
import Image from 'next/image';
import { ImagePlus, ChevronLeft, ChevronRight, Check, RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
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

import { LogoUploader } from './image-uploader';




export interface CampaignImageResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void,
    previousStep: number,
    nextStep: number,
    useLogo: boolean,
    setUseLogo: (v: boolean) => void,
    logoAttached: string[],
    setLogoAttached: (v: string[]) => void
}


export const CampaignImageResultCpn = ({ projectProps, setCurrentStep, setProjectValue, previousStep, nextStep, useLogo, setUseLogo, logoAttached, setLogoAttached }: CampaignImageResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [result, setResult] = useState<string[]>([]);
    const [cnt, setCnt] = useState(projectProps.pImageCnt);
    const generateImage = async () => {
        setLoading(true);
        setUseLogo(false);
        setLogoAttached([]);
        let generatedResult: string[] = [];
        for (let index = 0; index < cnt; index++) {
            const result = await createAIImageAction({ ratio: projectProps.pImageRatio, idea: projectProps.pUseText ? projectProps.pTextContent : `topic:${projectProps.pMainTopic}-${projectProps.pSubTopic}, atmosphere: ${projectProps.pAtmosphere} ` });
            if (result != "Error") {
                const filteredImageUrls: string[] = result.filter((url): url is string => url !== undefined);
                generatedResult.push(filteredImageUrls[0] ?? '');
            }
        }
        setResult(generatedResult);
        setProjectValue({ ...projectProps, pImages: generatedResult });
        setLoading(false);
    }
    const attachLogo = async (src: string, file: File) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const url = `${baseUrl}/api/add-logo`;
        try {
            const formData = new FormData();
            formData.append('openAiImageUrl', src);
            formData.append('logoSrc', file);

            const response = await fetch(url, {
                method: 'POST',   // Specify the HTTP method
                body: formData  // Convert the JavaScript object to a JSON string
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.body) {
                const reader = response.body.getReader();

                const stream = new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                        }
                        push();
                    }
                });

                const responseBlob = await new Response(stream).blob();

                const imageUrl = URL.createObjectURL(responseBlob);
                return imageUrl;
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    const onLogoApply = async (file: File) => {
        setLoading(true);
        let logoAttached: string[] = [];
        await Promise.all(
            projectProps.pImages.map(async (a) => {
                const attached = await attachLogo(a, file);
                logoAttached.push(attached ?? '');
            })
        );
        setLogoAttached(logoAttached);
        setLoading(false);

    }
    const classNamePerRatio = () => {
        switch (projectProps.pImageRatio) {
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
        switch (projectProps.pImageRatio) {
            case 'horizontal':
                return 'h-[280px]'
            case 'vertical':
                return 'h-[480px]'
            case 'square':
                return 'h-[480px]'
            default:
                return 'h-[480px]'
        }
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
                    <div className={'flex flex-row gap-6 pt-8'}>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" disabled={(!(projectProps.pImages?.length > 0) || loading === true)} onChange={(e) => setUseLogo(e.target.checked)} value="" checked={useLogo} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-disabled:cursor-not-allowed peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <span>Use custom logo</span>
                    </div>
                    <WithAnimation
                        mode="zoom"
                        isVisible={useLogo}>
                        <LogoUploader onChange={onLogoApply} loading={loading} />
                    </WithAnimation>
                </div>
                <div className="flex justify-center  gap-[10px] w-full">
                    {loading === true ?
                        <div className='flex w-full gap-[20px] justify-center'>
                            {[...Array(cnt)].map((_, idx) => (
                                <div key={idx} className={`w-full animate-pulse grow flex justify-center items-center m-auto h-[300px] border-2 border-slate-700 p-2 border-dashed rounded-lg ${classNamePerRatio()}`}>
                                    <div className={`${loadingClassNamePerRatio()} w-full bg-slate-400  dark:bg-slate-800 rounded`}></div>
                                </div>
                            ))}
                        </div>
                        :
                        useLogo && logoAttached.length > 0 ?
                            logoAttached.map
                                ((a, idx) => (

                                    <div key={idx} className='flex gap-[10px] justify-center '>
                                        <div >
                                            <Image width={500} height={300} key={idx} alt='img' src={a} />
                                        </div>
                                    </div>
                                )) :
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
                                        <div key={idx} className={`w-full grow flex justify-center items-center m-auto h-[300px] border-2 border-slate-700 border-dashed rounded-lg ${classNamePerRatio()}`}>
                                            <ImagePlus className="w-[50px] h-[50px]" />
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