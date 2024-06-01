import { withI18n } from "~/lib/i18n/with-i18n";
import { PersonalContentCreatorContainer } from "./_components/personal-compaign-creator-container";
import { PageBody } from "@kit/ui/page";


function PersonalContentCreatorPage() {
   return (
      <PageBody>
         <div>
            <PersonalContentCreatorContainer />
         </div>
      </PageBody>

   );
}

export default withI18n(PersonalContentCreatorPage);