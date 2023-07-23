import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

const GuestUserComponent = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { roomId } = router.query;

  const handleGuestLogin = async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([{ username: `guest_${Date.now()}`, name, is_guest: true }]);

    if (error) {
      console.error("Error creating guest user:", error);
      return;
    }

    router.push(`/room/${roomId}`);
  };

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center bg-zinc-900"> */}
      <input
        type="text"
        placeholder="Enter guest name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 mb-4 text-lg text-white bg-gray-800 rounded"
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={handleGuestLogin}
      >
        Play as {name}
      </button>
      {/* </div> */}
    </>
  );
};

export default GuestUserComponent;
