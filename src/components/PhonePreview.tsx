"use client";

import { CaseColor } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface PhonePreviewProps {
	croppedUrl: string;
	color: CaseColor;
}
const PhonePreview = ({ croppedUrl, color }: PhonePreviewProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [renderedDimensions, setRenderedDimensions] = useState({ height: 0, width: 0 });

	const handleResize = () => {
		if (!ref.current) return;
		const { width, height } = ref.current.getBoundingClientRect();
		setRenderedDimensions({ width, height });
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [ref.current]);

	let caseBackgroundColor = "";
	switch (color) {
		case "black":
			caseBackgroundColor = "bg-zinc-900";
			break;
		case "blue":
			caseBackgroundColor = "bg-blue-900";
			break;
		case "lavender":
			caseBackgroundColor = "bg-purple-900";
			break;
		default:
			caseBackgroundColor = "bg-zinc-900";
			break;
	}

	return (
		<AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
			<div
				className="absolute z-20 scale-[1.0352]"
				style={{
					left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
					top: renderedDimensions.height / 6.22,
				}}
			>
				<img
					src={croppedUrl}
					width={renderedDimensions.width / (3000 / 637)}
					className={cn(
						"phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
						caseBackgroundColor,
					)}
				/>
			</div>

			<div className="relative z-40 h-full w-full">
				<img alt="phone" src="/clearphone.png" className="pointer-events-none h-full w-full rounded-md antialiased" />
			</div>
		</AspectRatio>
	);
};

export default PhonePreview;
