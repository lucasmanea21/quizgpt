// components/AuthComponent.tsx
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../utils/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";

export const AuthComponent = () => {
  const router = useRouter();
  const { redirectTo } = router.query;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-zinc-900 sm:px-6 lg:px-8">
      <div className="w-full lg:w-2/3 max-w-[450px] p-6 text-white rounded-md shadow-lg bg-zinc-950">
        <h1 className="mb-5 text-3xl font-bold text-center">Log In to Play.</h1>
        <Auth
          supabaseClient={supabase}
          providers={["google", "facebook", "twitter"]}
          appearance={{ theme: ThemeSupa, variant: "dark" }} // Assuming that ThemeSupa supports a 'dark' variant.
          redirectTo={redirectTo ? String(redirectTo) : undefined}
        />
      </div>
    </div>
  );
};
