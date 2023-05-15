// components/AuthComponent.tsx
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../utils/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const AuthComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Auth
        supabaseClient={supabase}
        providers={["google", "facebook", "twitter"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
};
