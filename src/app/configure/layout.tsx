import { ReactNode } from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import Stepper from "~/components/Stepper";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<MaxWidthWrapper className="flex flex-1 flex-col">
			<Stepper />
			{children}
		</MaxWidthWrapper>
	);
};

export default Layout;
