import { Trans } from "@kit/ui/trans";
import { withI18n } from "~/lib/i18n/with-i18n";

import { HomeLayoutPageHeader } from "../_components/home-page-header";


function UserContentLayout(props: React.PropsWithChildren) {
   return (
      <>
         <HomeLayoutPageHeader
            title={<Trans i18nKey={'account:compaign:compaignTitleLabel'} />}
            description={<Trans i18nKey={'account:compaign:compaignDescription'}
            />}
         />
         {props.children}
      </>
   );
}

export default withI18n(UserContentLayout);