import { Suspense } from "react";
import ThankYou from "./ThankYou";

const Page = () => {
	return (
		<Suspense fallback>
			<ThankYou />
		</Suspense>
	);
};

export default Page;
