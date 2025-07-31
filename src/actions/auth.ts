"use server";

import { safeActionClient } from "@/lib/server/safe-action";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { authSchema } from "@/types/auth";

export const signUp = safeActionClient
  .schema(authSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const signIn = safeActionClient
  .schema(authSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return { success: true };
  });
