"use client";

import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { changeOrderStatus } from "./actions";
import { useRouter } from "next/navigation";

const LABELS: Record<keyof typeof OrderStatus, string> = {
	CANCELED: "Canceled",
	AWAITING_SHIPMENT: "Awaiting Shipment",
	SHIPPED: "Shipped",
	FULFILLED: "Fulfilled",
};

interface StatusDropdownProps {
	id: string;
	orderStatus: OrderStatus;
}
const StatusDropdown = ({ id, orderStatus }: StatusDropdownProps) => {
	const router = useRouter();

	const { mutate: changeStatus } = useMutation({
		mutationKey: ["update-order-status"],
		mutationFn: changeOrderStatus,
		onSuccess: () => {
			router.refresh();
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex w-52 items-center justify-between">
					{LABELS[orderStatus]}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="p-0">
				{Object.keys(OrderStatus).map((status) => (
					<DropdownMenuItem
						onClick={() => changeStatus({ id, status: status as OrderStatus })}
						key={status}
						className={cn("flex cursor-default items-center gap-1 p-2.5 text-sm hover:bg-zinc-100", {
							"bg-zinc-100": orderStatus === status,
						})}
					>
						<Check className={cn("mr-2 h-4 w-4 text-primary", orderStatus === status ? "opacity-100" : "opacity-0")} />
						{LABELS[status as OrderStatus]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StatusDropdown;
