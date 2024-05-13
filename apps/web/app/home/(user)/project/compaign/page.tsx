import { Trans } from "@kit/ui/trans";
import { HomeLayoutPageHeader } from "../../_components/home-page-header";
import { PageBody } from "@kit/ui/page";
import { withI18n } from "~/lib/i18n/with-i18n";








function PersonalProject() {
   return (
      <>
         <HomeLayoutPageHeader
            title={<Trans i18nKey={'common:addProjectTabLabel'} />}
            description={<Trans i18nKey={''}
            />}
         />
         <PageBody className={'flex flex-col gap-10'}>
            
         </PageBody>
      </>
   );
}

export default withI18n(PersonalProject);