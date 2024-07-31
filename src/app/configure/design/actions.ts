"use server"

import { CaseColor, CaseFinish, CaseMaterial, PhoneModels } from "@prisma/client"
import { updateSaleSectionConfig } from "~/db/queries"

export type SaveConfigArgs = {
	color: CaseColor, 
	finish: CaseFinish, 
	material: CaseMaterial, 
	model: PhoneModels, 
	configId: string
}

export async function serverSaveConfig({
	color, 
	finish, 
	material, 
	model, 
	configId
}: SaveConfigArgs) {
	const saveId = await updateSaleSectionConfig({color, finish, material, model, configId});
}