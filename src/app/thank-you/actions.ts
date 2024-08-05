"use server";

import { getServerSession } from "next-auth";
import { getOneOrder } from "~/db/queries";

export const getPaidStatus = async ({orderId}:{orderId:string}) => {
	const session = await getServerSession();
	const user = session?.user;

	if (!user?.email) {
		throw new Error("You must be logged in.");
	}

	const order = await getOneOrder({
		userEmail: user.email,
		orderId: orderId,
		includeBilling: true,
		includeShipping: true,
		includeConfig: true,
	});

	if (!order) {
		throw new Error("Order not found.");
	}

	if(order.isPaid){
		return order;
	}
	else{
		return false;
	}
};