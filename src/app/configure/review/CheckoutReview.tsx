"use client";

import { Config } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "~/app/config/products";
import Phone from "~/components/Phone";
import { Button } from "~/components/ui/button";
import { cn, formatPrice } from "~/lib/utils";
import { COLORS, FINISHES, MODELS } from "~/validators/option-validators";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";

const CheckoutReview = ({ config }: { config: Config }) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutate: createPaymentSession } = useMutation({
		mutationKey: ["checkout-session"],
		mutationFn: createCheckoutSession,
		onSuccess: (url) => {
			if (url) {
				router.push(url);
			} else {
				throw new Error("Unable to create checkout session");
			}
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: "Something went wrong, please try again.",
				variant: "destructive",
			});
		},
	});

	const tailwindColor = COLORS.find((color) => color.value === config.caseColor)?.tailwind;
	const phoneType = MODELS.options.find((model) => model.value === config.model)?.label;

	let totalPrice = BASE_PRICE;
	if (config.caseFinish === "textured") {
		totalPrice += PRODUCT_PRICES.finish.textured;
	}
	if (config.caseMaterial === "polycarbonate") {
		totalPrice += PRODUCT_PRICES.material.polycarbonate;
	}
	return (
		<div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
			<div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
				<Phone className={cn(`bg-${tailwindColor}`)} imgSrc={config.croppedUrl!} imgHeight={1000} imgWidth={1000} />
			</div>

			<div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
				<h3 className="text-3xl font-bold tracking-tight text-gray-900">Your {phoneType} Case</h3>
				<div className="mt-3 flex items-center gap-1.5 text-base">
					<Check className="h-4 w-4 text-green-600" />
					<span>In stock</span>
				</div>
			</div>

			<div className="text-base sm:col-span-12 md:col-span-9">
				<div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
					<div>
						<p className="font-medium text-zinc-950">Highlights</p>
						<ol className="mt-3 list-inside list-disc text-zinc-700">
							<li>Wireless Charging</li>
							<li>TPU Shock Absorption</li>
							<li>Sustainability Commitment</li>
						</ol>
					</div>

					<div>
						<p className="font-medium text-zinc-950">Materials</p>
						<ol className="mt-3 list-inside list-disc text-zinc-700">
							<li>Probably good materials</li>
							<li>No fingerprints</li>
							<li>Such wow</li>
						</ol>
					</div>
				</div>

				<div className="mt-8">
					<div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
						<div className="flow-root text-sm">
							<div className="mt-2 flex items-center justify-between py-1">
								<p className="text-gray-600">Base Price</p>
								<p className="font-medium text-gray-900">{formatPrice(BASE_PRICE / 100)}</p>
							</div>

							{config.caseFinish === "textured" ? (
								<div className="mt-2 flex items-center justify-between py-1">
									<p className="text-gray-600">Texture Finish</p>
									<p className="font-medium text-gray-900">{formatPrice(PRODUCT_PRICES.finish.textured / 100)}</p>
								</div>
							) : null}

							{config.caseMaterial === "polycarbonate" ? (
								<div className="mt-2 flex items-center justify-between py-1">
									<p className="text-gray-600">Polycarbonate Material</p>
									<p className="font-medium text-gray-900">{formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}</p>
								</div>
							) : null}

							<div className="my-2 h-px bg-gray-200" />

							<div className="flex items-center justify-between py-2">
								<p className="text-gray-600">Total</p>
								<p className="font-medium text-gray-900">{formatPrice(totalPrice / 100)}</p>
							</div>
						</div>
					</div>

					<div className="mt-8 flex justify-end pb-12">
						<Button onClick={() => createPaymentSession({ configId: config.id })} className="px-4 sm:px-6 lg:px-8">
							Checkout <ArrowRight className="ml-1.5 inline h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutReview;
