import { use } from 'react';
import { withI18n } from "~/lib/i18n/with-i18n";
import { PersonalContentCreatorContainer } from "./_components/personal-compaign-creator-container";
import { PageBody } from "@kit/ui/page";
import { loadUserWorkspace } from "../../_lib/server/load-user-workspace";
import pathsConfig from '~/config/paths.config';


const paths = {
   callback: pathsConfig.auth.callback + `?next=${pathsConfig.app.accountHome}`,
};

export type ProjectsType = {
   pName: string;
   pMainTopic: string;
   pSubTopic: string;
   pMode: string;
   pState: boolean;
   pStartDate: Date | undefined;
   pEndDate: Date | undefined;
   pPlatform: string,
   pPlatformurl: string,
   pCnt: number,
   pAtmosphere: string,
   pPostMode: string,
   pTitle: string,
   pTextContent: string,
   pGeneratedTitles: string[],
   pImages: string[],
   pImageBrand: string,
   pImageFormat: string,
   pImageCnt: number,
   pImageRatio: string,
   pUseText: boolean,
   pUseImage: boolean,
   pUseVideo: boolean,
}

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
   pGeneratedTitles: [],
   pImages: [],
   pImageBrand: '',
   pImageFormat: 'png',
   pImageCnt: 1,
   pImageRatio: 'horizontal',
   pUseText: true,
   pUseImage: true,
   pUseVideo: true
}

function PersonalContentCreatorPage() {
   const { user } = use(loadUserWorkspace());
   return (
      <PageBody>
         <PersonalContentCreatorContainer
            userId={user.id}
            paths={paths}
            projectData={initial}
         />
      </PageBody>

   );
}

export default withI18n(PersonalContentCreatorPage);