import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async () => {
	const session = await getServerSession();
	if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
		return notFound();
	}
	return (
		<div className="flex min-h-screen w-full bg-muted/40">
			<h1>Dashboard</h1>
			<p>Welcome to the dashboard</p>
		</div>
	);
};

export default Page;
