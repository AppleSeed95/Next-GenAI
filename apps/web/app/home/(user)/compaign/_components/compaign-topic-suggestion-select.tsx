'use client'
import { Button } from "@kit/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@kit/ui/dialog";
import { Heading } from "@kit/ui/heading";
import { Label } from "@kit/ui/label";
import { Textarea } from "@kit/ui/textarea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Option } from "./compaign-platform-multi-type-select";

type PropsType = {
    selectedOptions: Option[],
    isAuto: string,
    onChange: () => void
}


export function ContentTopicSuggestion(props: PropsType) {
    const { t } = useTranslation();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [ topicsSuggestion, setTopicsSuggestion ] = useState('');

    const handleTopics = () => {
        console.log(props.isAuto);
        console.log(props.selectedOptions);
        props.onChange();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'flex justify-end'}>
                    <Button variant={'outline'} className={'flex flex-row gap-2'} onClick={handleTopics}>
                        <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        <Heading level={5} children={t('Add more type')} />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{t('Topic Ideas')}</DialogTitle>
                    <DialogDescription>
                        {t("Choose one Topic idea here. Click save when you're done.")}
                    </DialogDescription>
                </DialogHeader>
                <div className={"flex flex-col gap-4 py-4"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <Label htmlFor="title" className={""}>
                            {t('Topic Title')}
                        </Label>
                        <Textarea
                            id="title"
                            defaultValue=""
                            // value={titleText}
                            // className="col-span-1"
                            // onChange={(e) => { setTitleText(e.target.value) }}
                        />
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <Label htmlFor="description" className={""}>
                            {t('Generated Topics')}
                        </Label>
                        <Textarea
                            id="description"
                            defaultValue=""
                            // value={contentText}
                            // className={"w-full h-80"}
                            // onChange={(e) => { setContentText(e.target.value) }}
                        />
                    </div>
                </div>
                <DialogFooter className={'flex flex-row justify-between'}>
                    <DialogClose asChild>
                        <Button variant={'outline'} >
                            {t('Close')}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={'outline'} >{t('Save changes')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}