import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { dashboardGetOrders, getLastMonthsRevenue, getLastWeeksRevenue, getLastYearsRevenue } from "~/db/queries";
import { cn, formatPrice } from "~/lib/utils";
import StatusDropdown from "./StatusDropdown";

const Page = async () => {
	const session = await getServerSession();
	if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
		return notFound();
	}

	let listOfOrders = await dashboardGetOrders();
	let lastWeek = await getLastWeeksRevenue();
	let lastMonth = await getLastMonthsRevenue();
	let lastYear = await getLastYearsRevenue();
	const WEEKLY_GOAL = 500;
	const MONTHLY_GOAL = 2000;
	const LIFETIME_GOAL = 10000;

	const evaluateWeeklyGoal = () => {
		if (lastWeek._sum?.amount! >= WEEKLY_GOAL) {
			return "text-green-500";
		}
		return "text-red-500";
	};
	const evaluateMonthlyGoal = () => {
		if (lastMonth._sum?.amount! >= MONTHLY_GOAL) {
			return "text-green-500";
		}
		return "text-red-500";
	};
	const evaluateLifetimeGoal = () => {
		if (lastYear._sum?.amount! >= LIFETIME_GOAL) {
			return "text-green-500";
		}
		return "text-red-500";
	};

	return (
		<div className="flex min-h-screen w-full bg-muted/40">
			<div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
				<div className="flex flex-col gap-16">
					<div className="grid gap-4 sm:grid-cols-3">
						<Card>
							<CardHeader className="pb-2">
								<CardDescription>Last Week</CardDescription>
								<CardTitle className={cn("text-4xl", evaluateWeeklyGoal())}>
									{formatPrice(lastWeek._sum.amount ?? 0)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-sm text-muted-foreground">of {formatPrice(WEEKLY_GOAL)} to break even</div>
							</CardContent>
							<CardFooter>
								<Progress value={((lastWeek._sum.amount ?? 0) * 100) / WEEKLY_GOAL} />
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardDescription>Last Month</CardDescription>
								<CardTitle className={cn("text-4xl", evaluateMonthlyGoal())}>
									{formatPrice(lastMonth._sum.amount ?? 0)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-sm text-muted-foreground">of {formatPrice(MONTHLY_GOAL)} to break even</div>
							</CardContent>
							<CardFooter>
								<Progress value={((lastMonth._sum.amount ?? 0) * 100) / MONTHLY_GOAL} />
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardDescription>Total</CardDescription>
								<CardTitle className={cn("text-4xl", evaluateLifetimeGoal())}>
									{formatPrice(lastYear._sum.amount ?? 0)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-sm text-muted-foreground">of {formatPrice(LIFETIME_GOAL)} to break even</div>
							</CardContent>
							<CardFooter>
								<Progress value={((lastYear._sum.amount ?? 0) * 100) / LIFETIME_GOAL} />
							</CardFooter>
						</Card>
					</div>

					<h1 className="text-4xl font-bold tracking-tight">Orders</h1>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden sm:table-cell">Status</TableHead>
								<TableHead className="hidden sm:table-cell">Purchase Date</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{listOfOrders.map((order) => (
								<TableRow key={order.id} className="bg-accent">
									<TableCell>
										<div className="font-medium">{order.shippingAddress?.name}</div>
										<div className="hidden text-sm text-muted-foreground md:inline">{order.user.email}</div>
									</TableCell>

									<TableCell className="hidden sm:table-cell">
										<StatusDropdown id={order.id} orderStatus={order.status} />
									</TableCell>

									<TableCell className="hidden sm:table-cell">{order.createdAt.toLocaleDateString()}</TableCell>
									<TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default Page;
