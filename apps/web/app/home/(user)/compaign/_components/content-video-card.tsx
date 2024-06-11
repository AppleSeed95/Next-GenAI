"use client"

import { Card } from "@kit/ui/card"
import { Heading } from "@kit/ui/heading"
import { Input } from "@kit/ui/input"

import { Textarea } from "@kit/ui/textarea"
import { BlogVideo } from "./compaign-content"
import { FC } from "react"
import { SelectFormatVideo } from "./format-video-selector"

type Props = {
   blogVideo: BlogVideo;
   onChange: (data: BlogVideo) => void;
}

const CompaignVideoCard: FC<Props> = (props) => {

   return (

      <Card className={'flex flex-col gap-4 sm:flex-row justify-between px-7 py-6'}>
         <div className={'flex flex-col gap-5'}>
            <div className={'flex flex-row gap-6'}>
               <Heading level={5} children={props.blogVideo.type} />
               <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={props.blogVideo.toggle} className="sr-only peer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { console.log(!props.blogVideo.toggle); props.onChange({ ...props.blogVideo, toggle: !props.blogVideo.toggle }) }} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
               </label>
            </div>
            <SelectFormatVideo onChange={(format) => { props.onChange({ ...props.blogVideo, format }) }} />
         </div>
         <div className={'flex flex-row gap-6 items-center'}>
            <Heading level={5} children={'Length'} />
            <Input
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.blogVideo, length: Number(e.target.value || '30') }) }}
               type="number"
               defaultValue={30}
               max={120}
               className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
            />
         </div>
         <div className="max-w-[500px] w-full flex-1">
            <Textarea placeholder={'Additional infos for chatbot... like use paragraphs etc.'} className={'h-full w-full'}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange({ ...props.blogVideo, description: e.target.value })} />
         </div>
      </Card>
   )
}

export default CompaignVideoCard;