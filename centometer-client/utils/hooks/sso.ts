import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function useGoogleSSO() {
  const [domain, setDomain] = useState("");
  const supabase = createClient();

  useEffect(() => {
    setDomain(window.location.host);
  }, []);

  const LoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://${domain}/auth/callback`,
      },
    });
  };

  return { LoginWithGoogle };
}
