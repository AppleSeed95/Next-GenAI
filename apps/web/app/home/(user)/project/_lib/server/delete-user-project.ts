'use server'
import { enhanceAction } from "@kit/next/actions";
import { DeleteProjectSchema } from "../schema/delete-user-project.schema";
import { getLogger } from "@kit/shared/logger";
import { getSupabaseServerActionClient } from "@kit/supabase/server-actions-client";
import { requireUser } from "@kit/supabase/require-user";

export const deleteUserProject = enhanceAction(
    async function (params) {
        const logger = await getLogger();
        const client = getSupabaseServerActionClient();
        const auth = await requireUser(client);

        if (!auth.data) {
            //   redirect(auth.redirectTo);
        }

        logger.info(`Deleting Project...`);

        const { data, error } = await client.from('project_table')
            .delete().match({ id: params.id })

        if (error) {
            logger.error(error, `Failed to delete project`);
            throw error;
        }

        logger.info(data, 'Project successfully deleted');

        return data;

    },
    {
        schema: DeleteProjectSchema
    }
);