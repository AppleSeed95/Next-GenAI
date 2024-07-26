'use client'
import { ProjectsType } from '../page';
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from '@kit/ui/radio-group'
import { useEffect, useState } from "react";
import { suggestPostTopicAction, generatePostTextContentAction } from "../_lib/server/server-action";
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

import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@kit/ui/alert"

export interface ComapaignTextResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void
    previousStep: number,
    nextStep: number
}
export const CampaignTextResultCpn = ({ projectProps, setCurrentStep, setProjectValue, nextStep, previousStep }: ComapaignTextResultProps) => {
    console.log(projectProps);

    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [contentLoading, setContentLoading] = useState<boolean | null>(null);
    const [topics, setTopics] = useState<string[]>(projectProps.pGeneratedTitles);
    const [currentTopic, setCurrentTopic] = useState<string>(projectProps.pTitle);
    const [content, setContent] = useState<string>(projectProps.pTextContent);
    const [error, setError] = useState('');

    const generateSuggestion = async () => {
        setLoading(true);
        setContentLoading(true);
        const result = await suggestPostTopicAction({ mainTopic: projectProps.pMainTopic, subTopic: projectProps.pSubTopic, atmosphere: projectProps.pAtmosphere });
        const generatedResults = result?.split('|') ?? [];
        if (generatedResults.length > 0) {
            setTopics(generatedResults);
            setCurrentTopic(generatedResults[0] ?? '');
            setProjectValue({ ...projectProps, pGeneratedTitles: generatedResults });
            await generateContent(generatedResults[0] ?? '', generatedResults);
        }
        setLoading(false);
    }
    const generateContent = async (topic: string, generatedTopics: string[]) => {
        setContentLoading(true);
        const contentResult = await generatePostTextContentAction({ topic: topic });
        setContent(contentResult ?? '');
        setProjectValue({ ...projectProps, pTitle: topic, pGeneratedTitles: generatedTopics, pTextContent: contentResult ?? '' });
        setContentLoading(false);
    }


    const handleNext = () => {
        if (!(content.length > 0)) {
            setError('Content is not generated yet.');
            return;
        }
        setCurrentStep(nextStep)
    }
    const handlePrev = () => {
        if (loading === true || contentLoading === true) {
            setError('Content is not generated yet.');
            return;
        }
        setCurrentStep(previousStep)
    }
    return (
        <div className="bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[150px] mb-[20px] rounded-lg shadow-lg">
            <div className="mb-[20px]  flex flex-col gap-[10px] w-full">
                <Label children={t('Text settings')} />
                <div className="flex gap-[20px]">
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex items-center gap-[10px]">
                            <Label className="w-[100px]" children={t('Brand')} />
                            <Input />
                        </div>
                        <div className="flex  items-center gap-[10px]">
                            <Label className="w-[100px]" children={t('Word number')} />
                            <Input type="number" />
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <Label className="w-[100px]" children={t('Language')} />
                            <Select
                                onValueChange={(v: string) => {
                                    console.log(v);

                                }}
                            >
                                <SelectTrigger >
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Languages</SelectLabel>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="deutsch">Deutsch</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex w-full  gap-[10px]">
                        <div className="pt-[5px]">
                            <Label children={t('Addition')} />
                        </div>
                        <Textarea className="h-full w-full grow" placeholder="Additional information to the bot(e.g like photographs, etc.)" />
                    </div>

                </div>
            </div>
            {(loading === true) ?
                <div className="flex flex-col gap-[10px] w-full">
                    <Label children={t('Suggested topic')} />
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-slate-800 rounded"></div>
                            <div className="h-4 bg-slate-800 rounded"></div>
                            <div className="h-4 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>
                : topics.length > 0 && <div className="flex flex-col gap-[10px] w-full">
                    <Label children={t('Suggested topic')} />
                    <RadioGroup
                        onValueChange={(data: string) => {
                            setCurrentTopic(data);
                            generateContent(data, topics);
                        }}
                        value={currentTopic}
                        className="h-full w-full">
                        <div className="flex flex-col gap-[10px] h-full">
                            {topics.map((aTopic, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <RadioGroupItem value={`${aTopic}`} />
                                    <Label >{aTopic}</Label>
                                </div>
                            ))}

                        </div>
                    </RadioGroup>
                </div>}
            <div className="flex flex-col gap-[10px] w-full">
                {(contentLoading === true) ?
                    <>
                        <Label children={t('Generated contents')} />
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    </>

                    :
                    content.length > 0 && <div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <Label children={t('Generated contents')} />
                            {content}
                        </div>
                    </div>
                }
                {error !== '' && <div className="my-[20px]">
                    <Alert variant="destructive">
                        <div className="flex gap-[10px]">
                            <AlertCircle className="h-6 w-6" />
                            <div>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </div>
                        </div>
                    </Alert>
                </div>}
                <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                    <Button variant={'outline'} onClick={handlePrev}><ChevronLeft /> Prev</Button>
                    <Button disabled={loading === true} variant={'outline'} onClick={() => generateSuggestion()}><Check /> Generate</Button>
                    <Button variant={'outline'} onClick={handleNext}>Next<ChevronRight /></Button>
                </div>
            </div>
        </div >
    )
}