// pages/_app.tsx
import "../styles/tailwind.css";
import { Auth } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Navbar />
      <Component {...pageProps} />{" "}
    </SessionContextProvider>
  );
}
export default MyApp;
