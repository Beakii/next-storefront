"use server";

import { getOneConfig } from "~/db/queries";

export const createCheckoutSession = async ({configId}:{configId:string}) => {
	const config = await getOneConfig({configId});
	if (!config) {
		throw new Error("Config not found");
	}
}