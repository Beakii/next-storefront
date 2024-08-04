"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	const router = useRouter();
	const [configId, setConfigId] = useState<string | null>(null);

	useEffect(() => {
		const id = localStorage.getItem("configId");
		setConfigId(id);
	}, []);

	if (configId) {
		localStorage.removeItem("configId");
		router.push(`/configure/review?id=${configId}`);
	} else {
		router.push("/");
	}

	return (
		<div className="mt-24 flex w-full justify-center">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
				<h3 className="text-xl font-semibold">Logging you in...</h3>
				<p>You you will be redirected back.</p>
			</div>
		</div>
	);
};

export default Page;
