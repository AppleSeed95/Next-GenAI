import { use } from 'react';

import { ServerDataLoader } from '@makerkit/data-loader-supabase-nextjs';

import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { Button } from '@kit/ui/button';
import { Heading } from '@kit/ui/heading';
import { If } from '@kit/ui/if';
import { Input } from '@kit/ui/input';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { loadUserWorkspace } from '../../_lib/server/load-user-workspace';
import { CardProject } from './card-saved-project';

interface SearchParams {
  page?: string;
  query?: string;
}

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('account:homePage');

  return {
    title,
  };
};

function UserProjectPage(props: { searchParams: SearchParams }) {
  const client = getSupabaseServerComponentClient();
  const { user } = use(loadUserWorkspace());

  const page = parseInt(props.searchParams.page ?? '1', 10);
  const query = props.searchParams.query ?? '';

  return (
    <>
      <PageBody className={'space-y-4'}>
        <div className={'flex items-center justify-between'}>

          <div className={'flex items-center space-x-2'}>
            <form className={'w-full'}>
              <Input
                name={'query'}
                defaultValue={query}
                className={'w-full lg:w-[18rem]'}
                placeholder={'Search project'}
              />
            </form>
          </div>
        </div>

        <ServerDataLoader
          client={client}
          table={'project_table'}
          page={page}
          where={{
            account_id: {
              eq: user.id,
            },
            title: {
              textSearch: query ? `%${query}%` : undefined,
            },
          }}
        >
          {(props) => {
            return (
              <div className={'flex flex-col space-y-8'}>
                <If condition={props.count === 0 && query}>
                  <div className={'flex flex-col space-y-2.5'}>
                    <p>
                      <Trans
                        i18nKey={'No Found'}
                        values={{ query }}
                      />
                    </p>

                    <form>
                      <input type="hidden" name={'query'} value={''} />

                      <Button variant={'outline'} size={'sm'}>
                        <Trans i18nKey={'clearSearch'} />
                      </Button>
                    </form>
                  </div>
                </If>

                <CardProject projects={props.data} />
              </div>
            );
          }}
        </ServerDataLoader>
      </PageBody>
    </>
  );
}

export default withI18n(UserProjectPage);