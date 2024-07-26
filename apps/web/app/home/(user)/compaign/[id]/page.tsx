import { PersonalContentCreatorContainer } from "../new/_components/personal-compaign-creator-container";


import { use } from 'react';
import { withI18n } from "~/lib/i18n/with-i18n";
import { PageBody } from "@kit/ui/page";
import { loadUserWorkspace } from "../../_lib/server/load-user-workspace";
import pathsConfig from '~/config/paths.config';


const paths = {
    callback: pathsConfig.auth.callback + `?next=${pathsConfig.app.accountHome}`,
};

function PersonalContentCreatorPage() {
    const { user } = use(loadUserWorkspace());
    return (
        <PageBody>
            <PersonalContentCreatorContainer
                userId={user.id}
                paths={paths}
            />
        </PageBody>

    );
}

export default withI18n(PersonalContentCreatorPage);