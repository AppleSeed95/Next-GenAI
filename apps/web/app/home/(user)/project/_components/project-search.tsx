'use client'
import React, { useState } from "react";
import { Search } from 'lucide-react'

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

export function ProjectSearchBar(props: Props) {

    const router = useRouter();
    const pathName = usePathname();
    const [query, setQuery] = useState<string>('');

    const FiltersSchema = z.object({
        platform: z.string().optional(),
        mode: z.string().optional(),
        state: z.string().optional(),
    });

    const onSearch = (v: string) => {
        const params = new URLSearchParams({
            platform: props.searchParams.platform ?? '',
            mode: props.searchParams.mode ?? '',
            state: props.searchParams.state ?? '',
            query: v
        });

        const url = `${pathName}?${params.toString()}`;
        router.push(url);
    };

    return (

        <div className={'flex justify-center gap-2 w-full'}>
            <div className="dark:bg-slate-800 bg-neutral-100 p-2 border-2 dark:border-slate-900 border-slate-300 shadow-lg rounded-[50px] gap-2 flex">
                <div className="flex items-center  shadow-lg rounded-full">
                    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-300 dark:bg-slate-900"><Search /></div>
                </div>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    name={'query'}
                    defaultValue={query}
                    className={'w-full lg:w-[18rem] outline-none transition bg-transparent'}
                    placeholder={'Search project'}
                />
                <button

                    onClick={() => onSearch(query)}
                    className="text-white  flex items-center px-4 rounded-[30px] shadow-lg bg-green-500 hover:bg-green-600 duration-500">
                    Search
                </button>
            </div>
        </div>
    )
}