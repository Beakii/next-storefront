"use client";

import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Image from "next/image";

const STEPS = [
	{ name: "Step 1: Upload", path: "/configure/upload" },
	{ name: "Step 2: Design", path: "/configure/design" },
	{ name: "Step 3: Review", path: "/configure/review" },
];

const Stepper = () => {
	const pathName = usePathname();

	return (
		<ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r">
			{STEPS.map((step, index) => {
				const isCurrent = pathName.startsWith(step.path);
				const isCompleted = STEPS.slice(index + 1).some((step) => pathName.endsWith(step.path));
				const imgSrc = `/step-${index + 1}.png`;
				return (
					<li key={step.name} className="relative overflow-hidden lg:flex-1">
						<div>
							<span
								className={cn("absolute left-0 top-0 h-full w-[5px] bg-white lg:bottom-0 lg:top-auto lg:h-1 lg:w-full", {
									"bg-zinc-700": !isCurrent && !isCompleted,
									"bg-orange-400/50": isCurrent,
									"bg-primary": isCompleted,
								})}
							/>
							<span className={cn(index !== 0 ? "lg:pl-9" : "", "flex items-center px-6 py-4 text-sm font-medium")}>
								<span className="flex-shrink-0">
									<Image
										src={imgSrc}
										height={800}
										width={800}
										alt=""
										className={cn("flex h-20 w-20 items-center justify-center object-contain")}
									/>
								</span>

								<span className="ml-4 mt-0.5 flex h-full min-w-0 flex-col justify-center">
									<span
										className={cn("text-sm font-semibold text-zinc-700", {
											"text-primary": isCompleted,
											"text-zinc-700": isCurrent,
										})}
									>
										{step.name}
									</span>
								</span>
							</span>

							{index !== 0 ? (
								<div className="absolute inset-0 hidden w-3 lg:block">
									<svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
										<path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
									</svg>
								</div>
							) : null}
						</div>
					</li>
				);
			})}
		</ol>
	);
};

export default Stepper;
