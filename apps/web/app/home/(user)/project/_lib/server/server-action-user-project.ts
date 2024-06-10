'use server'
import { enhanceAction } from "@kit/next/actions";
import { DeleteProjectSchema } from "../schema/delete-user-project.schema";
import { getLogger } from "@kit/shared/logger";
import { getSupabaseServerActionClient } from "@kit/supabase/server-actions-client";
import { requireUser } from "@kit/supabase/require-user";
import { EditProjectSchema } from "../schema/edit-user-project.schema";

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

export const editUserProject = enhanceAction(
    async function (params) {
        const logger = await getLogger();
        const client = getSupabaseServerActionClient();
        const auth = await requireUser(client);

        if (!auth.data) {
            //   redirect(auth.redirectTo);
        }

        logger.info(`Updating Project...`);

        const { data, error } = await client
        .from('project_table')
        .update({ project_name: params.projectName || '', topic: params.topic, updated_by: auth.data?.id})
        .match({id: params.id})

        if (error) {
            logger.error(error, `Failed to update project`);
            throw error;
        }

        logger.info(data, 'Project successfully updated');

        return data;

    },
    {
        schema: EditProjectSchema
    }
);