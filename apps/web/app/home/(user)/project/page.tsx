import { use } from 'react';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { loadUserWorkspace } from '../_lib/server/load-user-workspace';
import PersonalSavedProjectContainer from './_components/personal-saved-project-container';
import pathsConfig from '~/config/paths.config';
import { PageBody } from '@kit/ui/page';

export type PlatformType = 'all' | 'linkedin' | 'facebook' | 'youtube' | 'instagram' | 'tiktok' | 'wordpress' | 'contao' | 'joomla';
export type ModeType = 'all' | 'autopilot' | 'suggestmode';
export type StateType = 'all' | 'active' | 'inactive';

export interface SearchParams {
   page?: string;
   query?: string;
   platform?: PlatformType;
   state?: string;
   mode?: ModeType;
}

export const generateMetadata = async () => {
   const i18n = await createI18nServerInstance();
   const title = i18n.t('account:homePage');

   return {
      title,
   };
};

const paths = {
   callback: pathsConfig.auth.callback + `?next=${pathsConfig.app.accountHome}`,
};

function PersonalProjectDisplayPage(props: { searchParams: SearchParams }) {
   const { user } = use(loadUserWorkspace());
   return (
      <PageBody>
         <PersonalSavedProjectContainer
            userId={user.id}
            paths={paths}
            searchParams={props.searchParams}
         />
      </PageBody>

   );
}

export default withI18n(PersonalProjectDisplayPage);