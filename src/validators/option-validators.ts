// Adding comments for Tailwind to allow dynamic changing of class names
// bg-zinc-900 border-zinc-900
// bg-red-900 border-red-900
// bg-yellow-900 border-yellow-900
// bg-green-900 border-green-900
// bg-blue-900 border-blue-900
// bg-purple-900 border-purple-900
// bg-pink-900 border-pink-900

import { PRODUCT_PRICES } from "~/app/config/products";

export const COLORS = [
	{
		label: "Black",
		value: "black",
		tailwind: "zinc-900",
	},
	{
		label: "Blue",
		value: "blue",
		tailwind: "blue-900",
	},
	{
		label: "Lavender",
		value: "lavender",
		tailwind: "purple-900",
	},
] as const;


export const MODELS = {
	name: "models",
	options: [
		{
			label: "iPhone X",
			value: "iphonex",
		},
		{
			label: "iPhone 11",
			value: "iphone11",
		},
		{
			label: "iPhone 12",
			value: "iphone12",
		},
		{
			label: "iPhone 13",
			value: "iphone13",
		},
		{
			label: "iPhone 14",
			value: "iphone14",
		},
		{
			label: "iPhone 15",
			value: "iphone15",
		},
	]
} as const;

export const MATERIALS = {
	name: "material",
	options: [
		{		
			label: "Silicone",
			value: "silicone",
			description: undefined,
			price: PRODUCT_PRICES.material.silicone,
		},
		{
			label: "Polycarbonate",
			value: "polycarbonate",
			description: "Hard plastic",
			price: PRODUCT_PRICES.material.polycarbonate,
		},
	]
} as const;

export const FINISHES = {
	name: "finish",
	options: [
		{		
			label: "Smooth",
			value: "smooth",
			description: undefined,
			price: PRODUCT_PRICES.finish.smooth,
		},
		{
			label: "Textured",
			value: "textured",
			description: "Enhanced grip",
			price: PRODUCT_PRICES.finish.textured,
		},
	]
} as const;