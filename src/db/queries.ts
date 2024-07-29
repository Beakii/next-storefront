import "server-only";
import { db } from ".";
import { UploadedFileData } from "uploadthing/types";

interface CreateConfigProps {
	file: UploadedFileData;
	width: number | undefined;
	height: number | undefined;
}
export const createConfig = async ({file, width, height}:CreateConfigProps) => {
	const config = await db.config.create({
		data: {
			url: file.url,
			width: width || 500,
			height: height || 500,
		},
	});
	return config.id;
}


interface UpdateConfigProps {
	file: UploadedFileData;
	configId: string;
}
export const updateConfig = async ({configId, file}: UpdateConfigProps) => {
	const updatedConfig = await db.config.update({
		where:{
			id: configId,
		},
		data: {
			croppedUrl: file.url,
		}
	});
	return updatedConfig.id;
}


interface GetOneConfigProps {
	configId: string;
}
export const getOneConfig = async ({configId}: GetOneConfigProps) => {
	const config = await db.config.findUnique({
		where: {
			id: configId,
		},
	});
	return config;
}