import { getSupabaseServerComponentClient } from "@kit/supabase/server-component-client";
import { SearchParams } from "../page";
import React, { use } from "react";
import { loadUserWorkspace } from "../../_lib/server/load-user-workspace";
import { PageBody } from "@kit/ui/page";
import { HeaderPart } from "./header-part";
import { Input } from "@kit/ui/input";
import { PersonalCreatedProjects } from "./personal-created-projects";
import { ServerDataLoader } from "@makerkit/data-loader-supabase-nextjs";
import { If } from "@kit/ui/if";
import { Trans } from "@kit/ui/trans";
import { Button } from "@kit/ui/button";
import { CardProject } from "./card-saved-project";
import { withI18n } from "~/lib/i18n/with-i18n";

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
                <HeaderPart />
                <div className={'flex items-center flex-col gap-2 sm:flex-row sm:justify-between'}>
                    <div className={'flex  space-x-2'}>
                        <form className={'w-full'}>
                            <Input
                                name={'query'}
                                defaultValue={query}
                                className={'w-full lg:w-[18rem]'}
                                placeholder={'Search project'}
                            />
                        </form>
                    </div>
                    <PersonalCreatedProjects searchParams={props.searchParams} />
                </div>

                <ServerDataLoader
                    client={client}
                    table={'project_table'}
                    page={page}
                    where={{
                        ...filters,
                        account_id: {
                            eq: user.id,
                        },
                        title: {
                            textSearch: query ? `%${query}%` : undefined,
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
        }
    > = {};

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

        filters.platform = {
            eq: selectedPlatform,
        };
    }

    if (params.mode && params.mode !== 'all') {
        let selectedMode
        switch (params.mode.toLowerCase()) {
            case 'autopilot':
                selectedMode = 'autopilot'
                break;
            case 'suggestmode':
                selectedMode = 'suggestmode'
                break;
            default:
                break;
        }

        filters.mode = {
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

        filters.state = {
            eq: selectedState,
        };
    }
    return filters;
}