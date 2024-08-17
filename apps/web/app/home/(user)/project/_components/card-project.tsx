'use client'
import { Card } from "@kit/ui/card"
import { Heading } from "@kit/ui/heading"
import { Button } from "@kit/ui/button"
import { DatePickerWithRange } from "./datePicker"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@kit/ui/dialog"
import { Delete, Edit2Icon, X } from "lucide-react"
import { Label } from "@kit/ui/label"
import { Textarea } from "@kit/ui/textarea"
import { ProjectType } from "./card-saved-project"
import { Trans, useTranslation } from "react-i18next"
import { deleteUserProject, editUserProject } from "../_lib/server/server-action-user-project"
import React, { useEffect, useState, useCallback } from "react"
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image";
import { useSupabase } from "@kit/supabase/hooks/use-supabase"
import { LetterCaseCapitalizeIcon } from "@radix-ui/react-icons"
import { IconSelect } from "../../_components/icons"
import { Clock8, Settings, Trash2 } from 'lucide-react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { updateUserProject } from "../_lib/server/server-action-user-project"
import { toast } from 'sonner';
import { Play } from "lucide-react"



type Props = {
    project: ProjectType,
}


export function ProjectCardCpn({ project }: Props) {
    const router = useRouter();
    const pathName = usePathname();
    const url = `${pathName}`;

    const { t } = useTranslation(`projects`);
    const images: string[] = JSON.parse(project.pImages ?? JSON.stringify([]));
    let carouselItems = images.map((aImage) => ({
        type: 'image',
        src: aImage
    }))
    const toFirstCharToUppercase = (value: string | null) => {
        const first = value ? value[0] : '';
        return `${first?.toUpperCase()}${value?.slice(1, value.length)}`
    }
    const [projectState, setProjectState] = useState<boolean>(project.pState ?? false)
    const updateToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`updateProjectSuccess`),
                error: t(`updateProjectError`),
                loading: t(`updateProjectLoading`),
            });
        },
        [t],
    );
    const updateProject = useCallback((v: boolean) => {

        const promise = async () => {
            // let updateProject:ProjectType = {};
            // const keys = Object.keys(project);
            // keys.forEach((key: string) => {
            //     const value = project[key as keyof typeof project];
            //     if (value) {
            //         updateProject = {
            //             ...updateProject,
            //             [key]: value
            //         }
            //     }

            // });
            const res = await updateUserProject({ ...project, pState: v });
            if (res) {
                setProjectState(v);
            }
        }

        updateToaster(promise);
    }, [updateToaster])
    const handleStateChange = (active: boolean) => {
        updateProject(active);
    }
    return (
        <div className="bg-slate-900 shadow-lg flex w-full p-4 pr-0   rounded-lg">
            {carouselItems.length > 0 && <div className="w-1/4 rounded-lg overflow-hidden">
                <div >
                    {carouselItems.length > 0 &&
                        <Carousel autoPlay interval={3000} showThumbs={false} swipeable infiniteLoop showStatus stopOnHover showArrows showIndicators >
                            {carouselItems.map((aSrc, idx) => (
                                <div key={idx} className="w-full">
                                    <Image
                                        className="rounded-lg"
                                        src={aSrc.src}
                                        width={450}
                                        layout="responsive"
                                        height={150}
                                        alt='image' />
                                </div>
                            ))}
                        </Carousel>
                    }


                </div>
            </div>}
            <div className={`${carouselItems.length > 0 ? 'w-3/4' : 'w-full'} w-3/4 pl-8 flex`}>
                <div className="flex flex-col gap-2 h-full grow">
                    <div className="flex justify-between items-center pr-6">
                        <div className="flex items-center gap-2">
                            {(project.pVideo?.length ?? 0) > 0 &&
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className='bg-red-500 py-1 px-3 rounded-full flex items-center justify-center w-10 h-10 shadow-sm cursor-pointer duration-500'>
                                            <Play />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="w-full md:w-[60%] lg:w-[60%]">
                                        <DialogHeader>
                                            <DialogTitle>Video</DialogTitle>
                                        </DialogHeader>
                                        <video
                                            className="w-full aspect-video mt-8 rounded-lg border bg-black"
                                            controls
                                        >
                                            <source src={project.pVideo ?? ""} />
                                        </video>
                                    </DialogContent>
                                </Dialog>
                            }
                            <div className="font-bold text-2xl">{project.pTitle}</div>
                        </div>
                        <div className={'flex flex-row gap-6 '}>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    onChange={(e) => {
                                        handleStateChange(e.target.checked)
                                    }}
                                    type="checkbox" checked={projectState} className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-1 h-full grow justify-between">
                        <div className="text-base  flex flex-col gap-2">
                            <div className="h-full w-full grow pt-4">
                                {project.pTextContent}
                            </div>
                            <div className="flex gap-2 w-full justify-between pr-6">
                                <div className='flex gap-2 flex-wrap '>
                                    {JSON.parse(project.pAtmosphere ?? JSON.stringify([])).length > 0 &&
                                        JSON.parse(project.pAtmosphere ?? JSON.stringify([])).map((aAtmosphere: string, idx: number) => (
                                            <div className='bg-slate-950 py-1 px-3 rounded-[30px] shadow-sm cursor-pointer duration-500' key={idx}>
                                                {`${aAtmosphere[0]?.toUpperCase()}${aAtmosphere.slice(1, aAtmosphere.length)}`}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='flex gap-4'>
                                    <div className="flex gap-2 text-sm items-center text-slate-400">
                                        <Clock8 />{` ${project.pStartDate} ~ ${project.pEndDate}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-l px-3 flex flex-col gap-2 min-w-[200px]">
                            <div className="flex flex-col justify-center gap-2">
                                <div className="flex justify-center">
                                    <IconSelect platform={project.pPlatform ?? ''} />
                                </div>
                                <div className='bg-slate-950 text-center py-1 px-3 rounded-[30px] shadow-sm cursor-pointer duration-500' >
                                    {`${toFirstCharToUppercase(project.pMode)}`}
                                </div>
                                <div className='bg-slate-950 text-center py-1 px-3 rounded-[30px] shadow-sm cursor-pointer duration-500' >
                                    {`${projectState ? 'Active' : 'Inactive'}`}
                                </div>
                                <div className='bg-slate-950 text-center py-1 px-3 rounded-[30px] shadow-sm cursor-pointer duration-500' >
                                    {`${toFirstCharToUppercase(project.pPostMode)}`}
                                </div>
                                <div className="flex gap-2 pt-4 justify-center">
                                    <div
                                        onClick={() => router.push(`/home/compaign/${project.id}`)}
                                        className='bg-green-500 py-1 px-3 rounded-full flex items-center justify-center w-10 h-10 shadow-sm cursor-pointer duration-500'>
                                        <Settings />
                                    </div>
                                    <div className='bg-red-500 py-1 px-3 rounded-full flex items-center justify-center w-10 h-10 shadow-sm cursor-pointer duration-500'>
                                        <Trash2 />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

