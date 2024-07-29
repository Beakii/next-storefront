import { notFound } from "next/navigation";
import { getOneConfig } from "~/db/queries";
import ImageConfigurator from "./ImageConfigurator";

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

	const { url, width, height } = config;

	return <ImageConfigurator configId={id} imageDimensions={{ width, height }} url={url} />;
};

export default Page;
