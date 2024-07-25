"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { useInView } from "framer-motion";
import { cn } from "~/lib/utils";
import Phone from "./Phone";

const PHONE_IMAGES = [
	"/Testimonials/1.jpg",
	"/Testimonials/2.jpg",
	"/Testimonials/3.jpg",
	"/Testimonials/4.jpg",
	"/Testimonials/5.jpg",
	"/Testimonials/6.jpg",
];

function splitArray<T>(arr: Array<T>, numOfCols: number) {
	const res: Array<Array<T>> = [];

	for (let i = 0; i < arr.length; i++) {
		const index = i % numOfCols;
		if (!res[index]) {
			res[index] = [];
		}
		res[index].push(arr[i]!);
	}
	return res;
}

interface ReviewColumnProps {
	images: string[];
	className?: string;
	reviewClassName?: (reviewIndex: number) => string;
	timePerPixel?: number;
}

const ReviewColumn = ({ images, className, reviewClassName, timePerPixel = 0 }: ReviewColumnProps) => {
	const colRef = useRef<HTMLDivElement | null>(null);
	const [colHeight, setColHeight] = useState(0);
	const duration = `${colHeight * timePerPixel}ms`;

	useEffect(() => {
		if (!colRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setColHeight(colRef.current?.offsetHeight ?? 0);
		});

		resizeObserver.observe(colRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div
			ref={colRef}
			className={cn("animate-marquee space-y-8 py-4", className)}
			style={{ "--marquee-duration": duration } as React.CSSProperties}
		>
			{images.concat(images).map((image, index) => (
				<Review key={index} className={reviewClassName?.(index % images.length)} image={image} />
			))}
		</div>
	);
};

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
	image: string;
}

const Review = ({ image, className, ...props }: ReviewProps) => {
	const POSSIBLE_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
	const delay = POSSIBLE_DELAYS[Math.floor(Math.random() * POSSIBLE_DELAYS.length)];

	return (
		<div
			className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)}
			style={{ animationDelay: delay }}
			{...props}
		>
			<Phone imgSrc={image} imgHeight={800} imgWidth={800} />
		</div>
	);
};

interface ReviewGridProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ReviewGrid = ({ className }: ReviewGridProps) => {
	const container = useRef<HTMLDivElement>(null);
	const isInView = useInView(container, { once: true, amount: "some" });
	const columns = splitArray(PHONE_IMAGES, 3);
	const col1 = columns[0];
	const col2 = columns[1];
	const col3 = splitArray(columns[2]!, 2);

	return (
		<div
			ref={container}
			className={cn(
				"relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3",
				className,
			)}
		>
			{isInView ? (
				<>
					<ReviewColumn
						images={[...col1!, ...col3.flat(), ...col2!]}
						reviewClassName={(reviewIndex) =>
							cn({ "md:hidden": reviewIndex >= col1?.length! + col3[0]?.length!, "lg:hidden": reviewIndex >= col1?.length! })
						}
						timePerPixel={8}
					/>
					<ReviewColumn
						images={[...col2!, ...col3[1]!]}
						className="hidden md:block"
						reviewClassName={(reviewIndex) => (reviewIndex >= col2?.length! ? "lg:hidden" : "")}
						timePerPixel={15}
					/>
					<ReviewColumn images={col3.flat()} className="hidden md:block" timePerPixel={13} />
				</>
			) : null}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
		</div>
	);
};

const AnimatedReview = () => {
	return (
		<MaxWidthWrapper className="relative max-w-5xl">
			<Image
				className="absolute -left-32 top-1/3 hidden select-none xl:block"
				src="/what-people-are-buying.png"
				height={150}
				width={150}
				alt="What people are buying"
			/>

			<ReviewGrid />
		</MaxWidthWrapper>
	);
};

export default AnimatedReview;
