
import { withI18n } from "~/lib/i18n/with-i18n";
import CompaignHeader from "./_components/compaign-header";
import { CompaignPlatformSelect } from "./_components/compain-platform-select";
import { CompaignContent } from "./_components/compaign-content";


export type Projects = {
   pName: string,
   pMainTopic: string,
   pSubTopic?: string,
   mode?: string,
}


function PersonalProject() {
   return (
      <>
         <div className={'flex flex-col gap-10'}>
            <CompaignHeader />
            <CompaignPlatformSelect />
            <CompaignContent />
         </div>
      </>
   );
}

export default withI18n(PersonalProject);