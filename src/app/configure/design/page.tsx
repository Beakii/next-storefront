import { notFound } from "next/navigation";

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
	return (
		<div>
			<h1>{id}</h1>
		</div>
	);
};

export default Page;
