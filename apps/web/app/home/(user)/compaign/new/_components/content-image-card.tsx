"use client"

import { Card } from "@kit/ui/card"
import { Heading } from "@kit/ui/heading"
import { Input } from "@kit/ui/input"

import { SelectDemo } from "./language-selector"
import { Textarea } from "@kit/ui/textarea"
import { BlogImage } from "./compaign-content"
import { FC } from "react"
import { SelectFormat } from "./image-format-selector"
import { number } from "zod"
import { useTranslation } from "react-i18next"
import { SelectResolution } from "./image-resolution-selector"

type Props = {
   blogImage: BlogImage;
   onChange: (data: BlogImage) => void;
}

const CompaignImageCard: FC<Props> = (props) => {
   const { t } = useTranslation();

   return (

      <Card className={'flex flex-col gap-4 sm:flex-row justify-between px-7 py-6'}>
         <div className={'flex flex-col gap-5'}>
            <div className={'flex flex-row gap-6'}>
               <Heading level={5} children={props.blogImage.type} />
               <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={props.blogImage.toggle} className="sr-only peer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.blogImage, toggle: !props.blogImage.toggle }) }} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
               </label>
            </div>
            <SelectFormat onChange={(format) => { props.onChange({ ...props.blogImage, format }) }} />
            <SelectResolution onChange={(size) => { props.onChange({ ...props.blogImage, size }) }} />
         </div>
         <div className={'flex flex-row gap-6 items-center'}>
            <Heading level={5} children={'Images'} />
            <Input
               onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                     props.onChange({ ...props.blogImage, amount: Number(e.target.value || '1') });
                     console.log(e.target.value);
                  }}
               type="number"
               defaultValue={1}
               placeholder={t('You can input 1 to 3')}
               max={3}
               className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
            />
         </div>
         <div className="max-w-[500px] w-full flex-1">
            <Textarea placeholder={'Additional infos for chatbot... like use paragraphs etc.'} className={'h-full w-full'}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange({ ...props.blogImage, description: e.target.value })} />
         </div>
      </Card>
   )
}

export default CompaignImageCard;