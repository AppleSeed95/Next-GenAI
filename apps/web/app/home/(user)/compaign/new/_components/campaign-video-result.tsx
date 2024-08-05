'use client'
import { useTranslation } from "react-i18next";
import { ProjectsType } from '../page';
import { Button } from "@kit/ui/button"
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface CampaignVideoResultProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    setProjectValue: (v: ProjectsType) => void,
    previousStep: number,
    nextStep: number
}


export const CampaignVideoResultCpn = ({ projectProps, setCurrentStep, setProjectValue, previousStep, nextStep }: CampaignVideoResultProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string[]>([]);

    const generateVideo = async () => {
        try {
            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
            const url = `${baseUrl}/api/video`;

            const response = await fetch(url, {
                method: 'POST',   // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json',  // Required for JSON payloads
                },
                body: JSON.stringify({ prompt: projectProps.pTextContent ?? '' })  // Convert the JavaScript object to a JSON string
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }

    }

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
                <Button disabled={loading === true} variant={'outline'} onClick={() => generateVideo()}><Check /> Generate</Button>
                <Button variant={'outline'} onClick={() => setCurrentStep(nextStep)}>Next <ChevronRight /></Button>
            </div>
        </div>
    )
}