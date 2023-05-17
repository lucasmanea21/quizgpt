// components/Profile.tsx
import { Auth } from "@supabase/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const Profile = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  console.log("user", user, supabaseClient);

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
      </div>
    );
  }

  return null;
};
