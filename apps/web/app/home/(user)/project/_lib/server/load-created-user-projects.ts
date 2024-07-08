import { getSupabaseServerComponentClient } from "@kit/supabase/server-component-client";
import { cache } from "react";
/**
 * @name loadCreatedUserProjects
 * @description
 * Load the created user projects data. It's a cached per-request function that fetches the created user projects data.
 * It can be used across the server components to load the user workspace data.
 */

export const loadCreatedUserProjects = cache( async() => {
   const client = getSupabaseServerComponentClient();
   
})