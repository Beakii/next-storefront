"use server";

import { getServerSession } from "next-auth";
import { BASE_PRICE, PRODUCT_PRICES } from "~/app/config/products";
import { getOneConfig } from "~/db/queries";

export const createCheckoutSession = async ({configId}:{configId:string}) => {
	const config = await getOneConfig({configId});
	if (!config) {
		throw new Error("Config not found");
	}

	const session = await getServerSession();
	if(!session) {
		throw new Error("You must be logged in to proceed");
	}

	let price = BASE_PRICE;
	if(config.caseFinish === "textured") {
		price += PRODUCT_PRICES.finish.textured;
	}
	if(config.caseMaterial === "polycarbonate") {
		price += PRODUCT_PRICES.material.polycarbonate;
	}
}