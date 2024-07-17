'use client'
import { Button } from "@kit/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@kit/ui/dialog";
import { Heading } from "@kit/ui/heading";
import { Label } from "@kit/ui/label";
import { Textarea } from "@kit/ui/textarea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Option } from "./compaign-platform-multi-type-select";
import { createSuggestTopic } from "../_lib/server/server-action";
import { Input } from "@kit/ui/input";
// import { Alert, AlertTitle, AlertDescription } from "@kit/ui/alert";


type PropsType = {
    selectedOptions: Option[],
    topic: string,
    isAuto: string,
    generatedTopicIdeas: string,
    setGeneratedTopicIdeas: (data: string) => void,
    onChange: () => void
}



export function ContentTopicSuggestion(props: PropsType) {
    const { t } = useTranslation();
    const [saveEnable, setSaveEnable] =useState(false);
    const [selectedTopic, setSelectedTopic] = useState('No found Idea');
    const [topicsSuggestion, setTopicsSuggestion] = useState('');
    const randomContent = getRandomOption(props.selectedOptions);
    const [selectedTopicIdeasTitle, setSelectedTopicIdeasTitle] = useState(['']);


    const handleDisplayTopicIdea = (e: number) => {
        const inputValue = e;
        if ( inputValue > 0 && inputValue < 6 ) {
            setSelectedTopic(selectedTopicIdeasTitle[inputValue - 1] ?? 'No Found Idea');
            props.setGeneratedTopicIdeas(selectedTopicIdeasTitle[inputValue - 1] ?? 'No Found Idea');
            setSaveEnable(true);
            console.log(props.generatedTopicIdeas);
        } else {
            setSelectedTopic('Please input correct Number');
            setSaveEnable(false);
        }
    }

    const handleSaveIdea = () => {
        if (saveEnable == true) {
            console.log("Success");
        } else {
            console.log("Faild");
        }
    }

    const handleTopics = async () => {
        const payload = { topic: props.topic, contentType: randomContent?.label || 'Tipps & Tricks' }
        console.log("randomContent", randomContent);

        try {
            const resText = await createSuggestTopic(payload);
            console.log(resText);
            if (resText) {
                setTopicsSuggestion(resText);
                const regex = /\d+\.\s\*\*([^\*]+)\*\*/g;
                let match;
                const titles: string[] = [];
                while ((match = regex.exec(resText)) !== null) {
                    if (match[1]) {
                        titles.push(match[1].trim());
                    }
                }

                if (props.isAuto == 'autopilot') {
                    setSelectedTopic(titles[Math.floor(Math.random() * 5)] ?? 'Not Found Idea');
                }

                setSelectedTopicIdeasTitle(titles);
            } else {
                setTopicsSuggestion(t("Can't create Topic ideas!"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'flex justify-end'}>
                    <Button variant={'outline'} className={'flex flex-row gap-2'} onClick={handleTopics}>
                        <svg className={'w-6 h-6 text-gray-800 dark:text-white'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        <Heading level={5} children={t('Create Topic Idea')} />
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
                    <div className={"flex flex-col gap-4 items-center"}>
                        <Label htmlFor="title" className={""}>
                            {t('Topic Idea Title')}
                        </Label>
                        <Textarea
                            id="title"
                            defaultValue=""
                            value={selectedTopic}
                            className="col-span-1"
                        // onChange={(e) => { setTitleText(e.target.value) }}
                        />
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <Label htmlFor="description" className={""}>
                            {t('Generated Topic Ideas')}
                        </Label>
                        <Textarea
                            id="description"
                            defaultValue=""
                            value={topicsSuggestion}
                            className={"w-full h-80"}
                        // onChange={(e) => { setContentText(e.target.value) }}
                        />
                    </div>
                </div>
                <DialogFooter className={'flex flex-row justify-between'}>
                    <DialogClose asChild>
                        <Button variant={'outline'} onClick={() => { setTopicsSuggestion(''); setSelectedTopic(''); }} >
                            {t('Close')}
                        </Button>
                    </DialogClose>
                    <Input placeholder="Input your number for your Ideas"
                        // disabled={props.isAuto === 'autopilot'}
                        onChange={(e) => { handleDisplayTopicIdea(Number(e.target.value)) }} />
                    <DialogClose asChild>
                        <Button variant={'outline'} onClick={() => { setTopicsSuggestion(''); handleSaveIdea }} >{t('Save Idea')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function getRandomOption(array: Option[]) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the item at the random index
    return array[randomIndex];
}