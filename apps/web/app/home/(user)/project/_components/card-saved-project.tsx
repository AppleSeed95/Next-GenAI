"use client"

import * as React from "react"
import { Button } from "@kit/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@kit/ui/card";
import { Heading } from "@kit/ui/heading"
import { DatePickerWithRange } from "./datePicker"
import { IconSelect } from "../../_components/icons"
import { CopyIcon, Edit2Icon, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@kit/ui/dialog";
import { useTranslation } from "react-i18next";
import { Label } from "@kit/ui/label";
import { Textarea } from "@kit/ui/textarea";
import { deleteUserProject } from "../_lib/server/delete-user-project";

export type ProjectType = {
   account_id: string;
   created_at: string;
   created_by: string;
   end_date: string;
   id: number;
   mode: string;
   platform: string;
   project_name: string;
   start_date: string;
   state: boolean;
   subtopic: string | null;
   title: string;
   topic: string;
   updated_by: string | null
}

type PropsType = {
   projects: ProjectType[]
}


export function CardProject(props: PropsType) {

   const savedProject = props.projects;
   const { t } = useTranslation();

   const handleDelete = async (id: number) => {
      const payload = {id: id};
      const res = await deleteUserProject(payload);
      console.log(res);
   }

   return (
      <div className="flex flex-col items-center space-x-4 w-full gap-8">
         {savedProject.map((item) => (
            <Card className="px-7 py-6">
               <div className={'flex flex-row gap-6 items-center'}>
                  <div>
                     <IconSelect platform={item.platform} />
                  </div>
                  <div className={'flex flex-col gap-8'}>
                     <Heading level={3} children={item.project_name} />
                     <Button variant={'outline'} children={'History - show last'} />
                  </div>
                  <div className={'flex flex-col gap-6'}>
                     <Heading level={4} children={item.topic} />
                     <Heading level={6} children={item.subtopic} />
                  </div>
                  <div className={'flex flex-col gap-8'}>
                     <div className={'flex flex-row gap-2 justify-between'}>
                        <DatePickerWithRange />
                        <label className="inline-flex items-center cursor-pointer">
                           <input type="checkbox" value="" className="sr-only peer" checked={item.state} />
                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                     </div>
                     <div className={'flex flex-row justify-between'}>
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button variant={'destructive'} className={'flex flex-row gap-2'}>
                                 <X />
                                 <Heading level={5} children={'Delete'} />
                              </Button>
                           </DialogTrigger>
                           <DialogContent>
                              <DialogHeader>
                                 <DialogTitle>{t('Are you want to delete')}</DialogTitle>
                              </DialogHeader>
                              <DialogFooter className={'flex flex-row justify-between'}>
                                 <DialogClose asChild>
                                    <Button variant={'outline'} >
                                       {t('Cancel')}
                                    </Button>
                                 </DialogClose>
                                 <DialogClose asChild>
                                    <Button variant={'destructive'} onClick={(e) => handleDelete(item.id)}>{t('Delete')}</Button>
                                 </DialogClose>
                              </DialogFooter>
                           </DialogContent>
                        </Dialog>
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button variant={'outline'} className={'flex flex-row gap-4'}>
                                 <Edit2Icon />
                                 <Heading level={5} children={'Edit'} />
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                 <DialogTitle>{t('Edit Project')}</DialogTitle>
                              </DialogHeader>
                              <div className={"flex flex-col gap-4 py-4"}>
                                 <div className={"flex flex-row gap-4 items-center"}>
                                    <Label htmlFor="title" className={""}>
                                       {t('Project Name')}
                                    </Label>
                                    <Textarea
                                       id="title"
                                       defaultValue=""
                                       value={item.project_name}
                                       className="col-span-1"
                                       onChange={(e) => { }}
                                    />
                                 </div>
                                 <div className={"flex flex-row gap-4 items-center"}>
                                    <Label htmlFor="title" className={""}>
                                       {t('Topic')}
                                    </Label>
                                    <Textarea
                                       id="title"
                                       defaultValue=""
                                       value={item.topic}
                                       className="col-span-1"
                                       onChange={(e) => { }}
                                    />
                                 </div>
                              </div>
                              <DialogFooter className={'flex flex-row justify-between'}>
                                 <DialogClose asChild>
                                    <Button variant={'outline'} >
                                       {t('Cancel')}
                                    </Button>
                                 </DialogClose>
                                 <DialogClose asChild>
                                    <Button variant={'outline'} >{t('Save')}</Button>
                                 </DialogClose>
                              </DialogFooter>
                           </DialogContent>
                        </Dialog>

                     </div>
                  </div>
               </div>
            </Card>
         ))}
      </div>
   )
}
