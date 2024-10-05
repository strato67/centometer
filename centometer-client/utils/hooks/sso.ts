import { createClient } from "@/utils/supabase/client";

export default function useGoogleSSO() {
  const supabase = createClient();

  const LoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

  };

  return { LoginWithGoogle };
}
