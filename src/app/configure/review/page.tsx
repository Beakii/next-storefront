"use server";

import { notFound } from "next/navigation";
import { getOneConfig } from "~/db/queries";
import CheckoutReview from "./CheckoutReview";

interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const Page = async ({ searchParams }: PageProps) => {
	const { id } = searchParams;
	if (!id || typeof id !== "string") {
		return notFound();
	}

	const config = await getOneConfig({ configId: id });
	if (!config) {
		return notFound();
	}

	return <CheckoutReview config={config} />;
};

export default Page;
