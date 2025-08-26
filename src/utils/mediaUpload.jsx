import { createClient } from "@supabase/supabase-js";

const url = "https://wygdrdwatnbwuuuwglbc.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Z2RyZHdhdG5id3V1dXdnbGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjQ4ODksImV4cCI6MjA3MTcwMDg4OX0.UeHYAq2qVXXRfMbuhZdAeLvoTPEXt6UDQLiJYao0FM8";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
      return;
    }

    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;

    supabase.storage
      .from(/*bucket name*/ "images")
      .upload(
        /*the name that file want to save or add image real name using"image .name"*/ newName,
        file,
        {
          upsert: false,
          cacheControl: "3600",
        }
      )
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;

        // console.log("File uploaded successfully:", publicUrl);
        resolve(publicUrl);
      })
      .catch((error) => {
        // console.error("Error uploading file:", error);
        reject("Error uploading file in supabase", error);
      });
  });

  return mediaUploadPromise;
}
