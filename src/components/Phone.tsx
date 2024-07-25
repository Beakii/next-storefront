import { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import Image from "next/image";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
	imgSrc: string;
	imgWidth: number;
	imgHeight: number;
	dark?: boolean;
}

const Phone = ({ imgSrc, imgHeight, imgWidth, dark = false, className, ...props }: PhoneProps) => {
	return (
		<div className={cn("pointer-events-none relative z-50 overflow-hidden", className)} {...props}>
			<Image
				className="pointer-events-none z-50 select-none"
				src={dark ? "/phone-dark.png" : "/phone-light.png"}
				width={imgWidth}
				height={imgHeight}
				alt="Phone"
			/>

			<div className="absolute inset-0 -z-10">
				<Image className="min-h-full min-w-full object-cover" src={imgSrc} width={800} height={800} alt="overlaying image" />
			</div>
		</div>
	);
};

export default Phone;
