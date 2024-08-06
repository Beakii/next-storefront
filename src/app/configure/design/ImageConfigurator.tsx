"use client";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import UserImage from "next/image";
import { cn, formatPrice } from "~/lib/utils";
import { Rnd } from "react-rnd";
import HandleComponent from "~/components/HandleComponent";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Label as RadioLabel, Radio, RadioGroup, RadioGroupDescription, Description } from "@headlessui/react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "~/validators/option-validators";
import { useRef, useState } from "react";
import { Label as ShadLabel } from "~/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "~/app/config/products";
import { useUploadThing } from "~/lib/uploadthing";
import { useToast } from "~/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigArgs, serverSaveConfig } from "./actions";
import { useRouter } from "next/navigation";

interface ImageConfiguratorProps {
	configId: string;
	url: string;
	imageDimensions: {
		width: number;
		height: number;
	};
}
const ImageConfigurator = ({ configId, url, imageDimensions }: ImageConfiguratorProps) => {
	const { toast } = useToast();
	const router = useRouter();

	const { mutate: saveSaleConfig, isPending } = useMutation({
		mutationKey: ["save-config"],
		mutationFn: async (args: SaveConfigArgs) => {
			await Promise.all([saveConfig(), serverSaveConfig(args)]);
		},
		onError: () => {
			toast({
				title: "Error",
				description: "There was an error saving the configuration",
				variant: "destructive",
			});
		},
		onSuccess: () => {
			router.push(`/configure/review?id=${configId}`);
		},
	});

	const [options, setOptions] = useState<{
		color: (typeof COLORS)[number];
		model: (typeof MODELS.options)[number];
		material: (typeof MATERIALS.options)[number];
		finish: (typeof FINISHES.options)[number];
	}>({
		color: COLORS[0],
		model: MODELS.options[0],
		material: MATERIALS.options[0],
		finish: FINISHES.options[0],
	});

	const [renderedDimensions, setRenderedDimensions] = useState({
		width: imageDimensions.width / 4,
		height: imageDimensions.height / 4,
	});

	const [renderedPosition, setRenderedPosition] = useState({
		x: 150,
		y: 205,
	});

	const phoneRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const { startUpload } = useUploadThing("imageUploader");

	const saveConfig = async () => {
		try {
			const phoneRefData = phoneRef.current!.getBoundingClientRect();
			const containerRefData = containerRef.current!.getBoundingClientRect();

			const leftOffset = phoneRefData.left - containerRefData.left;
			const topOffset = phoneRefData.top - containerRefData.top;

			const actualX = renderedPosition.x - leftOffset;
			const actualY = renderedPosition.y - topOffset;

			const canvas = document.createElement("canvas");
			canvas.width = phoneRefData.width;
			canvas.height = phoneRefData.height;
			const context = canvas.getContext("2d");

			const image = new Image();
			image.crossOrigin = "anonymous";
			image.src = url;
			await new Promise((resolve) => (image.onload = resolve));

			context?.drawImage(image, actualX, actualY, renderedDimensions.width, renderedDimensions.height);

			const imageBase64 = canvas.toDataURL();
			const imageBase64String = imageBase64.split(",")[1];

			const blob = base64ToBlob(imageBase64String!, "image/png");
			const file = new File([blob], "cropped-image.png", { type: "image/png" });

			await startUpload([file], { configId });
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error saving the configuration",
				variant: "destructive",
			});
		}
	};

	function base64ToBlob(base64: string, type: string) {
		const byteCharacters = atob(base64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		return new Blob([byteArray], { type });
	}

	return (
		<div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
			<div
				ref={containerRef}
				className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
			>
				<div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
					<AspectRatio ref={phoneRef} ratio={896 / 1831} className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
						<UserImage
							fill
							src="/phone-template.png"
							alt="template phone image"
							className="pointer-events-none z-50 select-none"
						/>
					</AspectRatio>
					<div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_9999px_rgba(229,231,235,0.6)]" />
					<div
						className={cn(
							"absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
							`bg-${options.color.tailwind}`,
						)}
					/>
				</div>

				<Rnd
					default={{
						x: 150,
						y: 205,
						height: imageDimensions.height / 4,
						width: imageDimensions.width / 4,
					}}
					lockAspectRatio
					resizeHandleComponent={{
						topLeft: <HandleComponent />,
						topRight: <HandleComponent />,
						bottomLeft: <HandleComponent />,
						bottomRight: <HandleComponent />,
					}}
					className="absolute z-20 border-[3px] border-primary"
					onResizeStop={(_, __, ref, ___, { x, y }) => {
						setRenderedDimensions({
							//slice(0,2) removes the 'px' from the string
							width: parseInt(ref.style.width.slice(0, -2)),
							height: parseInt(ref.style.height.slice(0, -2)),
						});
						setRenderedPosition({ x, y });
					}}
					onDragStop={(_, { x, y }) => {
						setRenderedPosition({ x, y });
					}}
				>
					<div className="relative h-full w-full">
						<UserImage fill src={url} alt="uploaded image" className="pointer-events-none" />
					</div>
				</Rnd>
			</div>

			<div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white px-20 md:px-0 lg:col-span-1">
				<ScrollArea className="relative flex-1 overflow-auto">
					<div className="pointer-events-none absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-white/50" />
					<div className="px-8 pb-12 pt-8">
						<h2 className="text-3xl font-bold tracking-tight">Customize</h2>
						<div className="my-6 h-px w-full bg-zinc-200" />
						<div className="relative mt-4 flex h-full flex-col justify-between">
							<div className="flex flex-col gap-6">
								<RadioGroup
									value={options.color}
									onChange={(value) => {
										setOptions((previous) => ({ ...previous, color: value }));
									}}
								>
									<ShadLabel>Color: {options.color.label}</ShadLabel>
									<div className="mt-3 flex items-center space-x-3">
										{COLORS.map((color) => (
											<Radio
												key={color.label}
												value={color}
												className={({ checked, focus }) =>
													cn(
														"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
														{
															[`border-${color.tailwind} z-20`]: checked || focus,
														},
													)
												}
											>
												<span
													className={cn(
														`bg-${color.tailwind}`,
														"h-8 w-8 rounded-full border border-black border-opacity-10",
													)}
												/>
											</Radio>
										))}
									</div>
								</RadioGroup>

								<div className="relative flex w-full flex-col gap-3">
									<ShadLabel>Model</ShadLabel>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" role="combobox" className="z-20 w-full justify-between">
												{options.model.label}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{MODELS.options.map((model) => (
												<DropdownMenuItem
													key={model.label}
													onClick={() => setOptions((previous) => ({ ...previous, model }))}
													className={cn("", { "bg-zinc-100": model.value === options.model.value })}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															model.label === options.model.label ? "opacity-100" : "opacity-0",
														)}
													/>
													{model.label}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{[MATERIALS, FINISHES].map(({ name, options: selectableOpitons }) => (
									<RadioGroup
										key={name}
										value={options[name]}
										onChange={(value) => {
											setOptions((previous) => ({ ...previous, [name]: value }));
										}}
									>
										<ShadLabel>{name.slice(0, 1).toUpperCase() + name.slice(1)}</ShadLabel>
										<div className="mt-3 space-y-4">
											{selectableOpitons.map((option) => (
												<Radio
													key={option.value}
													value={option}
													className={({ checked, focus }) =>
														cn(
															"relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between",
															{
																"z-20 border-primary": checked || focus,
															},
														)
													}
												>
													<span className="flex items-center">
														<span className="flex flex-col text-sm">
															<RadioLabel as="span" className="">
																{option.label}
															</RadioLabel>

															{option.description ? (
																<Description as="span" className="text-gray-500">
																	<span className="block sm:inline">{option.description}</span>
																</Description>
															) : null}
														</span>
													</span>

													<Description
														as="span"
														className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
													>
														<span className="font-medium text-gray-900">{formatPrice(option.price / 100)}</span>
													</Description>
												</Radio>
											))}
										</div>
									</RadioGroup>
								))}
							</div>
						</div>
					</div>
				</ScrollArea>

				<div className="h-16 w-full bg-white px-8">
					<div className="h-px w-full bg-zinc-200" />
					<div className="flex h-full w-full items-center justify-end">
						<div className="flex w-full items-center gap-6">
							<p className="whitespace-nowrap font-medium">
								{formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
							</p>
							<Button
								isLoading={isPending}
								disabled={isPending}
								loadingText="Loading..."
								onClick={() => {
									saveSaleConfig({
										configId,
										color: options.color.value,
										finish: options.finish.value,
										material: options.material.value,
										model: options.model.value,
									});
								}}
								size="sm"
								className="w-full"
							>
								Continue
								<ArrowRight className="ml-1.5 inline h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageConfigurator;
