import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

const LoginModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogContent className="absolute z-[99999999999]">
				<DialogHeader>
					<div className="relative mx-auto mb-2">
						<div className="pointer-events-none flex select-none text-2xl font-semibold">
							<span className="rounded-md bg-blue-600 px-1 text-white">Case</span>
							<span className="text-blue-600">tum</span>
						</div>
					</div>
					<DialogTitle className="text-center text-3xl font-bold tracking-tight text-gray-900">Login to continue</DialogTitle>
					<DialogDescription className="py-2 text-center text-base">
						<span className="font-medium text-zinc-900">Your phone case configuration was saved! </span>
						Please login to continue to complete your purchase.
					</DialogDescription>
				</DialogHeader>

				<div className="flex items-center justify-center">
					<GoogleButton type="dark" onClick={() => signIn("google")} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LoginModal;
