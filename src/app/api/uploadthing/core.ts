import { createUploadthing, type FileRouter } from "uploadthing/next";
import sharp from "sharp";
import { z } from "zod";
import { createConfig, updateConfig } from "~/db/queries";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "32MB" } })
	.input(z.object({ configId: z.string().optional() }))
	.middleware(async ({ input }) => {
		return {input}
	})
	.onUploadError(async ({ error }) => {
		console.log(error);
	})
	.onUploadComplete(async ({ metadata, file }) => {
		console.log("in onUploadComplete");
		const {configId} = metadata.input;

		const res = await fetch(file.url);
		const buffer = await res.arrayBuffer();

		const imageMetadata = await sharp(buffer).metadata();
		const { width, height } = imageMetadata;

		if(!configId){
			console.log("there is no configid");
			const returnedId = await createConfig({file, width, height});
			return { configId: returnedId };
		}
		else {
			console.log("there is configid");
			const returnedId = await updateConfig({file, configId});
			return { configId: returnedId };
		}
	})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;