"use server";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";

const Navbar = async () => {
	const session = await getServerSession();

	let isAdmin = false;
	if (session?.user?.email === process.env.ADMIN_EMAIL) {
		isAdmin = true;
	} else {
		isAdmin = false;
	}

	return (
		<nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					<Link href="/" className="z-40 flex font-semibold">
						<span className="rounded-md bg-blue-600 px-1 text-white">Case</span>
						<span className="text-blue-600">tum</span>
					</Link>

					<div className="flex h-full items-center space-x-4">
						{session ? (
							<>
								<Link
									href="/api/auth/signout"
									className={buttonVariants({
										size: "sm",
										variant: "ghost",
									})}
								>
									Sign Out
								</Link>
								{isAdmin ? (
									<Link
										href="/dashboard"
										className={buttonVariants({
											size: "sm",
											variant: "ghost",
										})}
									>
										Dashboard
									</Link>
								) : null}

								<Link
									href="/configure/upload"
									className={buttonVariants({
										size: "sm",
										className: "flex items-center gap-1",
									})}
								>
									Create
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
							</>
						) : (
							<>
								<Link
									href="/api/auth/signin"
									className={buttonVariants({
										size: "sm",
										variant: "ghost",
									})}
								>
									Login
								</Link>

								<div className="hidden h-8 w-px bg-zinc-200 sm:block" />

								<Link
									href="/configure/upload"
									className={buttonVariants({
										size: "sm",
										className: "hidden items-center gap-1 sm:flex",
									})}
								>
									Create
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};

export default Navbar;
