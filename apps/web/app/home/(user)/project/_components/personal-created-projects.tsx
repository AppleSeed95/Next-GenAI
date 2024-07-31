'use client'
import React, { useState } from "react";
import { ComboboxDemo } from "./platform-combobox";
import { ComboboxPopover } from "./state-combobox";
import { Comboboxsuggest } from "./suggestmode-combobox";
import { ModeType, SearchParams, StateType } from "../page";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlatformType } from "../page";

type Props = {
   searchParams: SearchParams
}
const FiltersSchema = z.object({
   platform: z.string().optional(),
   mode: z.string().optional(),
   state: z.string().optional(),
});

export function PersonalCreatedProjects(props: Props) {
   const form = useForm({
      resolver: zodResolver(FiltersSchema),
      defaultValues: {
         platform: props.searchParams.platform,
         mode: props.searchParams.mode,
         state: props.searchParams.state,
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
   });
   const router = useRouter();
   const pathName = usePathname();



   const onSubmit = ({ platform, mode, state }: z.infer<typeof FiltersSchema>) => {
      const params = new URLSearchParams({
         platform: platform ? platform : '',
         mode: mode ? mode : '',
         state: state ? state : '',
         start: props.searchParams.start ?? '',
         end: props.searchParams.end ?? '',
      });

      const url = `${pathName}?${params.toString()}`;
      router.push(url);
   };

   return (

      <div >
         {/* <Form {...form}> */}
         <form className={'flex flex-col gap-2 display-end sm:flex-row gap-4'}
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
         >
            <ComboboxDemo
               onChange={(value) => {
                  form.setValue(
                     'platform',
                     value as PlatformType,
                     {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                     },
                  );
                  console.log(form.getValues());
                  return onSubmit(form.getValues());
               }}
            />
            <ComboboxPopover
               onChange={(value) => {
                  form.setValue(
                     'state',
                     value as StateType,
                     {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                     },
                  );

                  return onSubmit(form.getValues());
               }}
            />
            <Comboboxsuggest
               onChange={(value) => {
                  form.setValue(
                     'mode',
                     value as ModeType,
                     {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                     },
                  );

                  return onSubmit(form.getValues());
               }}
            />
         </form>
         {/* </Form> */}
      </div>
   )
}