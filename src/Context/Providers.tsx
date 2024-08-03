"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={client}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;
