const fs = require("fs");
const { supabase } = require("../db/supabase-admin");

async function uploadSubjects() {
  try {
    const jsonData = fs.readFileSync("./utils/subjects.json");
    const subjects = JSON.parse(jsonData);

    for (const subject of subjects) {
      const { data, error } = await supabase.from("categories").insert(subject);

      if (error) {
        console.error(`Error inserting subject '${subject.subject}':`, error);
      } else {
        console.log(`Subject '${subject.subject}' inserted successfully.`);
      }
    }
  } catch (error) {
    console.error("Error uploading subjects:", error);
  }
}

uploadSubjects();
