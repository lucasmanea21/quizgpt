// pages/_app.tsx
import "../styles/tailwind.css";
import { Auth } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />{" "}
    </SessionContextProvider>
  );
}
export default MyApp;
