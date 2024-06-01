import { use } from 'react';
import { withI18n } from "~/lib/i18n/with-i18n";
import { HomeLayoutPageHeader } from "../_components/home-page-header";
import { Trans } from "@kit/ui/trans";
import { PageBody } from "@kit/ui/page";
import { PersonalCreatedProjectsContainer } from "./_components/personal-created-projects";
import { loadUserWorkspace } from "../_lib/server/load-user-workspace";



function PersonalCreatedProjectsPage() {
   const { user } = use(loadUserWorkspace());

   return (
      <>
         <PageBody >
            <PersonalCreatedProjectsContainer userId = {user.id} />
         </PageBody>
      </>
   );
}

export default withI18n(PersonalCreatedProjectsPage);