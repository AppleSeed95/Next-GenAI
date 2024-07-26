import { getSupabaseServerComponentClient } from "@kit/supabase/server-component-client";
import { SearchParams } from "../page";
import React, { use } from "react";
import { loadUserWorkspace } from "../../_lib/server/load-user-workspace";
import { PageBody } from "@kit/ui/page";
import { HeaderPart } from "./header-part";
import { PersonalCreatedProjects } from "./personal-created-projects";
import { ServerDataLoader } from "@makerkit/data-loader-supabase-nextjs";
import { If } from "@kit/ui/if";
import { Trans } from "@kit/ui/trans";
import { Button } from "@kit/ui/button";
import { CardProject } from "./card-saved-project";
import { withI18n } from "~/lib/i18n/with-i18n";
import { Search } from 'lucide-react'

function PersonalSavedProjectContainer(props: React.PropsWithChildren<{
    searchParams: SearchParams
    userId: string;
    paths: {
        callback: string;
    }
}>) {
    const client = getSupabaseServerComponentClient();
    const { user } = use(loadUserWorkspace());


    const page = parseInt(props.searchParams.page ?? '1', 10);
    const query = props.searchParams.query ?? '';
    const filters = getFilters({ ...props.searchParams, });

    return (
        <>
            <PageBody className={'space-y-4'}>
                <div className={'flex justify-center gap-2 w-full'}>
                    <div className="bg-slate-800 p-2 border-2 border-slate-900 shadow-lg rounded-[50px] gap-2 flex">
                        <div className="flex items-center  shadow-lg">
                            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-900"><Search /></div>
                        </div>
                        <input
                            name={'query'}
                            defaultValue={query}
                            className={'w-full lg:w-[18rem] outline-none transition bg-transparent'}
                            placeholder={'Search project'}
                        />
                        <button className="flex items-center px-4 rounded-[30px] shadow-lg bg-green-500 hover:bg-green-600 duration-500">
                            Search
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <PersonalCreatedProjects searchParams={props.searchParams} />
                    <HeaderPart />
                </div>
                <ServerDataLoader
                    client={client}
                    table={'campaign_table'}
                    page={page}
                    where={{
                        ...filters,
                        pUserId: {
                            eq: user.id,
                        },
                    }}
                >
                    {(props) => {
                        return (
                            <div className={'flex flex-col space-y-8'}>
                                <If condition={props.count === 0 && query}>
                                    <div className={'flex flex-col space-y-2.5'}>
                                        <p>
                                            <Trans
                                                i18nKey={'No Found'}
                                                values={{ query }}
                                            />
                                        </p>

                                        <form>
                                            <input type="hidden" name={'query'} value={''} />

                                            <Button variant={'outline'} size={'sm'}>
                                                <Trans i18nKey={'clearSearch'} />
                                            </Button>
                                        </form>
                                    </div>
                                </If>

                                <CardProject projects={props.data} />
                            </div>
                        );
                    }}
                </ServerDataLoader>
            </PageBody>
        </>
    );
}

export default withI18n(PersonalSavedProjectContainer);

function getFilters(params: SearchParams) {
    const filters: Record<
        string,
        {
            eq?: boolean | string;
            like?: string;
            textSearch?: string | undefined
        }
    > = {};
    if (params.query) {
        filters.title = {
            textSearch: params.query ? `%${params.query}%` : undefined,
        }
    }
    if (params.platform && params.platform !== 'all') {
        let selectedPlatform = '';
        switch (params.platform.toLowerCase()) {
            case 'facebook':
                selectedPlatform = 'facebook'
                break;
            case 'linkedin':
                selectedPlatform = 'linkedin'
                break;
            case 'youtube':
                selectedPlatform = 'youtube'
                break;
            case 'tiktok':
                selectedPlatform = 'tiktok'
                break;
            case 'instagram':
                selectedPlatform = 'instagram'
                break;
            case 'wordpress':
                selectedPlatform = 'wordpress'
                break;
            case 'contao':
                selectedPlatform = 'contao'
                break;
            case 'joomla':
                selectedPlatform = 'joomla'
                break;
            default:
                break;
        }

        filters.pPlatform = {
            eq: selectedPlatform,
        };
    }

    if (params.mode && params.mode !== 'all') {
        let selectedMode
        switch (params.mode.toLowerCase()) {
            case 'autopilot':
                selectedMode = 'auto'
                break;
            case 'suggestmode':
                selectedMode = 'suggest'
                break;
            default:
                break;
        }

        filters.pMode = {
            eq: selectedMode,
        };
    }

    if (params.state && params.state !== 'all') {
        let selectedState
        switch (params.state) {
            case 'active':
                selectedState = true
                break;
            case 'inactive':
                selectedState = false
                break;
            default:
                break;
        }

        filters.pState = {
            eq: selectedState,
        };
    }
    return filters;
}