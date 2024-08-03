"use server";

import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";
import { BASE_PRICE, PRODUCT_PRICES } from "~/app/config/products";
import { createOrder, findFirstOrder, getOneConfig } from "~/db/queries";
import { createStripeCheckoutSession, createStripeProduct } from "~/stripe/stripe";

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

	let order:Order | undefined = undefined;
	const existingOrder = await findFirstOrder({userEmail: session.user?.email!, configId});
	if(existingOrder) {
		order = existingOrder;
	} else {
		const dbPrice = price / 100;
		order = await createOrder({dbPrice, userEmail: session.user?.email!, configId});
	}

	const product = await createStripeProduct({name:"Custom Case", price, image:config.croppedUrl!});
	const stripeSession = await createStripeCheckoutSession({price:product.default_price as string, orderId:order.id, configId, userEmail:session.user?.email!});

	return stripeSession.url;
}