import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
	const format = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "NZD"
	});

	return format.format(price);
}