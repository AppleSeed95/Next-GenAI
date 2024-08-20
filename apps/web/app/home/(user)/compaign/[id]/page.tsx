import { ServerDataLoader } from "@makerkit/data-loader-supabase-nextjs";
import { getSupabaseServerComponentClient } from "@kit/supabase/server-component-client";


import { use } from 'react';
import { withI18n } from "~/lib/i18n/with-i18n";
import { PageBody } from "@kit/ui/page";
import { loadUserWorkspace } from "../../_lib/server/load-user-workspace";
import pathsConfig from '~/config/paths.config';
import { PersonalContentCreatorContainer } from "../new/_components/personal-compaign-creator-container";

import { ProjectsType } from "../new/page";


const paths = {
    callback: pathsConfig.auth.callback + `?next=${pathsConfig.app.accountHome}`,
};

const initial: ProjectsType = {
    pName: 'test',
    pMainTopic: 'test',
    pSubTopic: 'test',
    pMode: 'auto',
    pState: true,
    pCnt: 1,
    pStartDate: new Date(),
    pEndDate: new Date(),
    pPlatform: 'linkedin',
    pPlatformurl: '',
    pAtmosphere: JSON.stringify([]),
    pPostMode: 'weekly',
    pTitle: '',
    pTextContent: '',
    pTextLanguage: 'english',
    pTextWordsCnt: 40,
    pTextBrand: '',
    pTextAddition: '',
    pGeneratedTitles: [],
    pImages: [],
    pImageBrand: '',
    pImageFormat: 'png',
    pImageAddition: '',
    pImageCnt: 1,
    pImageRatio: 'horizontal',
    pUseText: true,
    pUseImage: true,
    pUseVideo: true,
    pVideo: ''
}

function PersonalContentCreatorPage({ params }: { params: { id: string } }) {
    const { user } = use(loadUserWorkspace());
    const client = getSupabaseServerComponentClient();
    const projectId = parseInt(params.id);
    const converProjectData = (data: any) => {
        const keys = Object.keys(initial);
        let result: ProjectsType = initial;
        keys.forEach((aKey) => {
            if (aKey === "pStartDate") {
                result = { ...result, pStartDate: new Date(data['pStartDate'] ?? '') }
            }
            else if (aKey === "pEndDate") {
                result = { ...result, pEndDate: new Date(data['pEndDate'] ?? '') }
            }
            else if (aKey === "pGeneratedTitles") {
                result = { ...result, pGeneratedTitles: JSON.parse(data['pGeneratedTitles'] ?? JSON.stringify([])) }
            }
            else if (aKey === "pImages") {
                result = { ...result, pImages: JSON.parse(data['pImages'] ?? JSON.stringify([])) }
            }
            else {
                result = { ...result, [aKey]: (data[aKey]) }
            }
        })
        return result;
    }
    return (
        <PageBody>
            <ServerDataLoader
                client={client}
                table={'campaign_table'}
                where={{
                    id: {
                        eq: projectId,
                    },
                }}
            >
                {(props) => {
                    return (
                        <PersonalContentCreatorContainer
                            projectData={converProjectData(props.data[0])}
                            editMode
                            userId={user.id}
                            paths={paths}
                        />
                    );
                }}
            </ServerDataLoader>
        </PageBody>

    );
}

export default withI18n(PersonalContentCreatorPage);