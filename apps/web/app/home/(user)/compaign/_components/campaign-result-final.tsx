import { Button } from "@kit/ui/button"
import { Badge } from "@kit/ui/badge"

import { ChevronLeft, Check } from "lucide-react"
import { IconSelect } from "../../_components/icons"
import Image from "next/image"
import { Label } from "@kit/ui/label"
import { useTranslation } from "react-i18next"

import { ProjectsType } from "./personal-compaign-creator-container"
export interface CampaignResultFinalProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void
}
export const CampaignResultFinalCpn = ({ setCurrentStep, projectProps }: CampaignResultFinalProps) => {
    const { t } = useTranslation();
    return (
        <div className="bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">
            <div className="m-[20px] flex justify-center">
                <IconSelect platform={projectProps.platform as string} />
            </div>
            <div className="text-[25px] bold">{projectProps.pTitle}</div>

            <div className="flex gap-[10px]">
                <div className="w-[70%] flex flex-col gap-[20px]">
                    <div>{projectProps.pTextContent}</div>
                    <div className='flex gap-[10px]'>
                        {
                            projectProps.pImages?.length ?
                                projectProps.pImages.map((a, idx) => (
                                    <div key={idx}>
                                        <Image width={300} height={300} key={idx} alt='img' src={a} />
                                    </div>
                                )) : null
                        }
                    </div>
                </div>
                <div className="w-[30%] pl-[20px] flex flex-col gap-[15px]">
                    <div className="flex flex-col gap-[10px] w-full">
                        <Label children={t('Time')} />
                        <div className="rounded-full  shadow-md">
                            <Badge variant="secondary">{`2024/07/19`}</Badge>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <Label children={t('State')} />
                        <div className="rounded-full  shadow-md">
                            <Badge variant="secondary">{projectProps.pstate ? 'Active' : 'Inactive'}</Badge>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <Label children={t('Mode')} />
                        <div className="rounded-full  shadow-md">
                            <Badge variant="secondary">{projectProps.pmode}</Badge>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <Label children={t('Atmosphere')} />
                        <div className="rounded-full flex flex-wrap gap-[5px] shadow-md">
                            {JSON.parse(projectProps.pAtmosphere).map((a: string, idx: number) => {
                                return (
                                    (
                                        <Badge key={idx} variant="secondary">{a}</Badge>
                                    )
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                <Button variant={'outline'} onClick={() => setCurrentStep(4)}><ChevronLeft /> Prev</Button>
                <Button variant={'outline'} onClick={() => { }}><Check />save</Button>
            </div>
        </div>
    )
}