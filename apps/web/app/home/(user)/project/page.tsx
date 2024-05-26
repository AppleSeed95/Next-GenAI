import { withI18n } from "~/lib/i18n/with-i18n";
import { HomeLayoutPageHeader } from "../_components/home-page-header";
import { Trans } from "@kit/ui/trans";
import { PageBody } from "@kit/ui/page";
import { DatePickerWithRange } from "./_components/datePicker";
import { Search } from "./_components/searchDialog";
import { Heading } from "@kit/ui/heading";
import { ComboboxDemo } from "./_components/platform-combobox";
import { ComboboxPopover } from "./_components/state-combobox";
import { Comboboxsuggest } from "./_components/suggestmode-combobox";
import { LastDataProvider } from "./_components/last-project-data";
import { HeaderPart } from "./_components/header-part"
// import { useRouter } from "next/navigation";



function PersonalProject() {
   // const router = useRouter();

   return (
      <>
         <HomeLayoutPageHeader
            title={<Trans i18nKey={'common:projectTabLabel'} />}
            description={<Trans i18nKey={''}
            />}
         />
         <PageBody className={'flex flex-col gap-10'}>
            <div className={'flex flex-col gap-4'}>
               <HeaderPart />
               <div className={'flex flex-row gap-4'}>
                  <Search />
                  <ComboboxDemo />
                  <ComboboxPopover />
                  <Comboboxsuggest />
               </div>
            </div>
            <LastDataProvider />
         </PageBody>
      </>
   );
}

export default withI18n(PersonalProject);