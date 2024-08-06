"use server";

import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "~/db/queries";

interface ChangeOrderStatusProps {
	id: string;
	status: OrderStatus;
}
export const changeOrderStatus = async ({id, status}:ChangeOrderStatusProps) => {
	const order = await updateOrderStatus({orderId: id, newStatus: status});
	return order;
};