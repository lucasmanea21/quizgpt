const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

exports.getOnlineCount = async (req, res) => {
  try {
    const ONLINE_THRESHOLD_MINUTES = 5;
    const currentTime = new Date();
    const thresholdTime = new Date(
      currentTime.getTime() - ONLINE_THRESHOLD_MINUTES * 60 * 1000
    );

    const { data, error } = await supabase
      .from("user_activity")
      .select("user_id", { count: "exact" })
      .gte("last_active", thresholdTime.toISOString());

    if (error) {
      throw error;
    }

    res.json({ onlineUsers: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  const { userId } = req.body;

  try {
    const currentTime = new Date().toISOString();

    // Update or insert the user activity record
    const { error } = await supabase.from("user_activity").upsert(
      { user_id: userId, last_active: currentTime },
      {
        onConflict: "user_id",
      }
    );

    if (error) {
      throw error;
    }

    res.json({ message: "User activity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
