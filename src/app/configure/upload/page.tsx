"use client";

import { useState, useTransition } from "react";
import { cn } from "~/lib/utils";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, LoaderPinwheelIcon, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { useUploadThing } from "~/lib/uploadthing";

const Page = () => {
	const [isMouseDragging, setIsMouseDragging] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const {} = useUploadThing("imageUploader", {
		onClientUploadComplete: ([data]) => {},
	});

	const [isPending, startTransition] = useTransition();

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		console.log(rejectedFiles);
	};

	const onDropAccepted = (acceptedFiles: File[]) => {
		console.log(acceptedFiles);
	};

	return (
		<div
			className={cn(
				"relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
				{ "bg-blue-900/10 ring-blue-900/25": isMouseDragging },
			)}
		>
			<div className="relative flex h-full w-full flex-1 flex-col items-center justify-center">
				<Dropzone
					onDropRejected={onDropRejected}
					onDropAccepted={onDropAccepted}
					accept={{ "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"], "image/webp": [".webp"] }}
					onDragEnter={() => setIsMouseDragging(true)}
					onDragLeave={() => setIsMouseDragging(false)}
				>
					{({ getRootProps, getInputProps }) => (
						<div className="flex h-full w-full flex-1 flex-col items-center justify-center" {...getRootProps()}>
							<input {...getInputProps()} />
							{isMouseDragging ? (
								<MousePointerSquareDashed className="h-6 w-6" />
							) : isUploading || isPending ? (
								<LoaderPinwheelIcon className="mb-2 h-6 w-6 animate-spin text-zinc-700" />
							) : (
								<Image className="h-6 w-6" />
							)}
							<div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
								{isUploading ? (
									<div className="flex flex-col items-center">
										<p>Uploading...</p>
										<Progress className="mt-2 h-2 w-40 bg-gray-300" value={uploadProgress} />
									</div>
								) : isPending ? (
									<div className="flex flex-col items-center">
										<p>Redirecting...</p>
									</div>
								) : isMouseDragging ? (
									<p>
										<span className="font-semibold">Drop File</span>
										to upload
									</p>
								) : (
									<p>
										<span className="font-semibold">Click to upload </span>
										or drag and drop
									</p>
								)}
							</div>
							{isPending ? null : <p className="text-xs text-zinc-500">PNG | JPEG | JPG | WEBP</p>}
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
};

export default Page;
