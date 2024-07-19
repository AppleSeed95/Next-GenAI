'use client'
import { ProjectsType } from "./personal-compaign-creator-container"
import { Label } from '@kit/ui/label'
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from '@kit/ui/radio-group'
import { useEffect, useState } from "react";
import { suggestPostTopicAction, generatePostTextContentAction } from "../_lib/server/server-action";
import { Button } from "@kit/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


export interface ComapaignTextResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void
}
export const CampaignTextResultCpn = ({ projectProps, setCurrentStep, setProjectValue }: ComapaignTextResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [contentLoading, setContentLoading] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const [currentTopic, setCurrentTopic] = useState<string>('');
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        const generateSuggestion = async () => {
            setLoading(true);
            const result = await suggestPostTopicAction({ mainTopic: projectProps.pMainTopic, subTopic: projectProps.pSubTopic, atmosphere: projectProps.pAtmosphere });
            const generatedResults = result?.split('|') ?? [];
            if (generatedResults.length > 0) {
                setTopics(generatedResults);
                setCurrentTopic(generatedResults[0] ?? '');
                setProjectValue({ ...projectProps, pTitle: generatedResults[0] ?? '' });
            }
            setLoading(false);
        }
        generateSuggestion();
    }, [])
    useEffect(() => {
        const generateContent = async () => {
            setContentLoading(true);
            const contentResult = await generatePostTextContentAction({ topic: currentTopic });
            setContent(contentResult ?? '');
            setProjectValue({ ...projectProps, pTextContent: contentResult ?? '' });

            setContentLoading(false);
        }
        if (topics.length > 0) {
            generateContent();
        }
    }, [currentTopic])
    return (
        <div className="bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[200px] mb-[20px] rounded-lg shadow-lg">
            {loading ?
                <div className="flex flex-col gap-[10px] w-full">
                    <Label children={t('Suggested topic')} />
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
                : <div className="flex flex-col gap-[10px] w-full">
                    <Label children={t('Suggested topic')} />
                    <RadioGroup
                        onValueChange={(data: string) => {
                            console.log(data);

                            setCurrentTopic(data)
                        }}
                        value={currentTopic}
                        className="h-full w-full">
                        <div className="flex flex-col gap-[10px] h-full">
                            {topics.map((aTopic, idx) => (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={`${aTopic}`} />
                                    <Label >{aTopic}</Label>
                                </div>
                            ))}

                        </div>
                    </RadioGroup>
                </div>}
            <div className="flex flex-col gap-[10px] w-full">
                <Label children={t('Generated contents')} />
                {loading || contentLoading ?
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>

                        </div>
                    </div>
                    :
                    <div>
                        {content}
                    </div>
                }
                <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                    <Button variant={'outline'} onClick={() => setCurrentStep(1)}><ChevronLeft /> Prev</Button>
                    <Button variant={'outline'} onClick={() => setCurrentStep(3)}>Next<ChevronRight /></Button>
                </div>
            </div>
        </div>
    )
}