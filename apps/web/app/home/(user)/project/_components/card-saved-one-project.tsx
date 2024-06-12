'use client'
import { Card } from "@kit/ui/card"
import { IconSelect } from "../../_components/icons"
import { Heading } from "@kit/ui/heading"
import { Button } from "@kit/ui/button"
import { DatePickerWithRange } from "./datePicker"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@kit/ui/dialog"
import { Edit2Icon, X } from "lucide-react"
import { Label } from "@kit/ui/label"
import { Textarea } from "@kit/ui/textarea"
import { ProjectType } from "./card-saved-project"
import { Trans, useTranslation } from "react-i18next"
import { deleteUserProject, editUserProject } from "../_lib/server/server-action-user-project"
import React, { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@kit/ui/alert"
import { usePathname, useRouter } from "next/navigation"

type SaveOneProjectType = {
    saveValue: ProjectType
}

export function SaveOneProject(saveValue: SaveOneProjectType) {
    const router = useRouter();
    const pathName = usePathname();
    const url = `${pathName}`;

    const { t } = useTranslation(`projects`);
    const [editedProjectName, setEditedProjectName] = useState(saveValue.saveValue.project_name);
    const [editedTopic, setEditedTopic] = useState(saveValue.saveValue.topic);
    const [resultMessage, setResultMessage] = useState('');


    const handleDelete = async (id: number) => {
        const payload = { id: id };
        try {
            const res = await deleteUserProject(payload);
            setResultMessage(t('deleteSuccessDescription'));
            router.push(url);
        } catch (error) {
            setResultMessage(t('deleteErrorDescription'));
        }
    }

    const handleEdit = async (id: number) => {
        const payload = { id: id, projectName: editedProjectName, topic: editedTopic };
        try {
            const res = await editUserProject(payload);
            setResultMessage(t('editSuccessDescription'));
            router.push(url);
        } catch (error) {
            setResultMessage(t('editFailedDescription'));
        }
    }


    return (
        <Card className="px-7 py-6 w-[840px] sm:w-full">
            <div className={'flex flex-col sm:flex-row gap-6 items-center'}>
                <div className="display-center">
                    <IconSelect platform={saveValue.saveValue.platform} />
                </div>
                <div className={'flex flex-col gap-8'}>
                    <Heading level={3} children={saveValue.saveValue.project_name} />
                    <Button variant={'outline'} children={'History - show last'} />
                </div>
                <div className={'flex flex-col gap-6'}>
                    <Heading level={4} children={saveValue.saveValue.topic} />
                    <Heading level={6} children={saveValue.saveValue.subtopic} />
                </div>
                <div className={'flex flex-col gap-8'}>
                    <div className={'flex flex-row gap-2 justify-between'}>
                        <DatePickerWithRange />
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={saveValue.saveValue.state} />
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
                                        <Button variant={'destructive'} onClick={(e) => handleDelete(saveValue.saveValue.id)}>{t('Delete')}</Button>
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
                                            defaultValue={saveValue.saveValue.project_name}
                                            value={editedProjectName}
                                            className="col-span-1"
                                            onChange={(e) => { setEditedProjectName(e.target.value) }}
                                        />
                                    </div>
                                    <div className={"flex flex-row gap-4 items-center"}>
                                        <Label htmlFor="topic" className={""}>
                                            {t('Topic')}
                                        </Label>
                                        <Textarea
                                            id="topic"
                                            defaultValue={saveValue.saveValue.topic}
                                            value={editedTopic}
                                            className="col-span-1"
                                            onChange={(e) => { setEditedTopic(e.target.value) }}
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
                                        <Button variant={'outline'} onClick={(e) => handleEdit(saveValue.saveValue.id)}>{t('Save')}</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </Card>
    )
}

function SuccessAlert() {
    return (
        <Alert variant={'success'}>
            <AlertTitle>
                <Trans i18nKey={'projects:deleteSuccess'} />
            </AlertTitle>

            <AlertDescription>
                <Trans i18nKey={'projects:contactSuccessDescription'} />
            </AlertDescription>
        </Alert>
    );
}