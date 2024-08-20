import { Button } from "@kit/ui/button"
import { Badge } from "@kit/ui/badge"

import { ChevronLeft, Check } from "lucide-react"
import { IconSelect } from "../../../_components/icons"
import Image from "next/image"
import { Label } from "@kit/ui/label"
import { useTranslation } from "react-i18next"
import { WithAnimation } from "~/home/(user)/_components/animated-element";


import { ProjectsType } from '../page';
export interface CampaignResultFinalProps {
    projectProps: ProjectsType,
    setCurrentStep: (v: number) => void,
    previousStep: number,
    saveCampaign: () => void,
    loading: boolean
}
export const CampaignResultFinalCpn = ({ loading, setCurrentStep, projectProps, previousStep, saveCampaign }: CampaignResultFinalProps) => {
    const { t } = useTranslation();
    return (
        <WithAnimation mode="zoom">

            <div className="bg-neutral-100 dark:bg-[#000208] flex flex-col gap-[20px] p-[50px] mx-[100px] mb-[20px]">
                <div className="m-[20px] flex justify-center">
                    <IconSelect platform={projectProps.pPlatform as string} />
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
                        {projectProps.pVideo?.length > 0 && <div>
                            <video
                                className="w-full aspect-video mt-8 rounded-lg border bg-black"
                                controls
                            >
                                <source src={projectProps.pVideo} />
                            </video>
                        </div>}
                    </div>
                    <div className="w-[30%] pl-[20px] flex flex-col gap-[15px]">
                        <div className="flex flex-col gap-[10px] w-full">
                            <Label children={t('Time')} />
                            <div className="rounded-full">
                                <Badge className="shadow-md text-md rounded-[25px]" variant="secondary">
                                    {`${projectProps.pStartDate?.getDate()}/${projectProps.pStartDate?.getMonth() ?? 0 + 1}/${projectProps.pStartDate?.getFullYear()} ~ ${projectProps.pEndDate?.getDate()}/${projectProps.pEndDate?.getMonth() ?? 0 + 1}/${projectProps.pEndDate?.getFullYear()}`}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <Label children={t('State')} />
                            <div className="rounded-full">
                                <Badge className="shadow-md text-md rounded-[25px]" variant="secondary">{projectProps.pState ? 'Active' : 'Inactive'}</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <Label children={t('Mode')} />
                            <div className="rounded-full">
                                <Badge className="shadow-md text-md rounded-[25px]" variant="secondary">
                                    {`${projectProps.pMode[0]?.toUpperCase()}${projectProps.pMode.slice(1, projectProps.pMode.length)}`}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <Label children={t('Atmosphere')} />
                            <div className="rounded-full flex flex-wrap gap-[5px]">
                                {JSON.parse(projectProps.pAtmosphere).map((aAtmosphere: string, idx: number) => {
                                    return (
                                        (
                                            <Badge className="shadow-md text-md rounded-[25px]" key={idx} variant="secondary">
                                                {`${aAtmosphere[0]?.toUpperCase()}${aAtmosphere.slice(1, aAtmosphere.length).replaceAll('_', ' ')}`}
                                            </Badge>
                                        )
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-[20px] w-full gap-[10px]">
                    <Button disabled={loading} variant={'outline'} onClick={() => setCurrentStep(previousStep)}><ChevronLeft /> Prev</Button>
                    <Button disabled={loading} variant={'outline'} onClick={saveCampaign}><Check />save</Button>
                </div>
            </div>
        </WithAnimation>
    )
}