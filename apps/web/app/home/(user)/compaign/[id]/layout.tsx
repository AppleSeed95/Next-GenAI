// import { Trans } from "@kit/ui/trans";
import { withI18n } from "~/lib/i18n/with-i18n";

import { HomeLayoutPageHeader } from "../../_components/home-page-header";


function ProjectContentLayout(props: React.PropsWithChildren) {
    return (
        <>
            <HomeLayoutPageHeader
                title={'Edit project'}
                description={'Edit your current project'}
            />
            {props.children}
        </>
    );
}

export default withI18n(ProjectContentLayout);