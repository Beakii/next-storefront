// Adding comments for Tailwind to allow dynamic changing of class names
// bg-zinc-900 border-zinc-900
// bg-red-900 border-red-900
// bg-yellow-900 border-yellow-900
// bg-green-900 border-green-900
// bg-blue-900 border-blue-900
// bg-purple-900 border-purple-900
// bg-pink-900 border-pink-900

export const COLORS = [
	{
		label: "Black",
		Value: "black",
		tailwind: "zinc-900",
	},
	{
		label: "Blue",
		Value: "blue",
		tailwind: "blue-900",
	},
	{
		label: "Purple",
		Value: "purple",
		tailwind: "purple-900",
	},
] as const;


export const MODELS = {
	name: "models",
	options: [
		{
			label: "iPhone X",
			value: "iphone-x",
		},
		{
			label: "iPhone 11",
			value: "iphone-11",
		},
		{
			label: "iPhone 12",
			value: "iphone-12",
		},
		{
			label: "iPhone 13",
			value: "iphone-13",
		},
		{
			label: "iPhone 14",
			value: "iphone-14",
		},
		{
			label: "iPhone 15",
			value: "iphone-15",
		},
	]
} as const;