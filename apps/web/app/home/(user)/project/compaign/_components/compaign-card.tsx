"use client"

import { Card } from "@kit/ui/card"
import { Heading } from "@kit/ui/heading"
import { Input } from "@kit/ui/input"

import { SelectDemo } from "./language-selector"
import { Textarea } from "@kit/ui/textarea"
import { Blog } from "./compaign-content"
import { FC } from "react"

type Props = {
   blog: Blog;
   key: React.Key;
   onChange: (data: Blog) => void;
}

const CompaignCard: FC<Props> = (props) => {

   const key = props.key;

   return (

      <Card className={'flex flex-row justify-between rounded-none px-7 py-6'}>
         <div className={'flex flex-col gap-5'}>
            <div className={'flex flex-row gap-6'}>
               <Heading level={5} children={props.blog.type} />
               <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={props.blog.toggle} className="sr-only peer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { console.log(!props.blog.toggle); props.onChange({ ...props.blog, toggle: !props.blog.toggle }) }} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
               </label>
            </div>
            <div className={'flex flex-row gap-5 items-center'}>
               <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onChange({ ...props.blog, words: Number(e.target.value || '5') }) }}
                  type="number"
                  defaultValue={5}
                  max={10}
                  className={'[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]'}
               />
               <Heading level={5} children={'Sentences'} />
            </div>
            <SelectDemo onChange={(lang) => { props.onChange({ ...props.blog, lang }) }} />
         </div>
         <div className={'flex flex-row gap-6 items-center'}>
            <Heading level={5} children={'Brand'} />
            <Input placeholder={'Brand Demo'}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange({ ...props.blog, brand: e.target.value })} />
         </div>
         <div>
            <Textarea placeholder={'Additional infos for chatbot... like use paragraphs etc.'} className={'h-full w-full'}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange({ ...props.blog, description: e.target.value })} />
         </div>
      </Card>
   )
}

export default CompaignCard;