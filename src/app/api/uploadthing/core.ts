import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const f = createUploadthing();

// `FileRouter` for the app, can contain multiple file routes
export const ourFileRouter = {
  // one can define as many file routes as they would like, each with a unique `routeSlug`
  pdfUploader: f({ image: { maxFileSize: "4MB" } })
    // set permissions and file types for this file route
    .middleware(() => {
      const { getUser } = getKindeServerSession();
      const user = getUser();

      if (!user || !user.id) throw new Error("Unauthorized");

      // whatever is returned here is accessible in `onUploadComplete` as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(() => {
      // this code RUNS ON SERVER after upload
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;