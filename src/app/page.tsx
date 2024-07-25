import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Phone from "~/components/Phone";
import { Icons } from "~/components/icons";
import AnimatedReviews from "~/components/AnimatedReviews";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-slate-50">
			<section>
				<MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
					<div className="col-span-2 px-6 lg:px-0 lg:pt-4">
						<div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
							<div className="absolute -top-20 left-0 hidden w-28 lg:block">
								<Image src="/BlackSpirit.png" height={50} width={50} alt="Logo" />
							</div>
							<h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
								Your Image on a <span className="rounded-xl bg-blue-600 px-2 text-white">Custom</span> Case
							</h1>
							<p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
								Your <span className="rounded-md bg-blue-300 p-1 text-white">case</span>. Your{" "}
								<span className="rounded-md bg-orange-300 p-1 text-white">image</span>. Your{" "}
								<span className="rounded-md bg-purple-300 p-1 text-white">style</span>. Create a custom case with your own
								image and make your device stand out.
							</p>

							<ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
								<div className="space-y-2">
									<li className="flex items-center gap-1.5 text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />
										Definitely hasn't been done before
									</li>
									<li className="flex items-center gap-1.5 text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />
										100% unique to you
									</li>
									<li className="flex items-center gap-1.5 text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />
										Guaranteed conversation starter
									</li>
								</div>
							</ul>

							<div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
								<div className="flex -space-x-4">
									<img
										src="/users/user-2.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
									/>
									<img
										src="/users/user-1.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
									/>
									<img
										src="/users/user-3.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
									/>
									<img
										src="/users/user-4.jpg"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
									/>
									<img
										src="/users/user-5.jpg"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
									/>
								</div>

								<div className="flex flex-col items-center justify-between sm:items-start">
									<div className="flex gap-0.5">
										<Star className="h-4 w-4 fill-green-600 text-green-600" />
										<Star className="h-4 w-4 fill-green-600 text-green-600" />
										<Star className="h-4 w-4 fill-green-600 text-green-600" />
										<Star className="h-4 w-4 fill-green-600 text-green-600" />
										<Star className="h-4 w-4 fill-green-600 text-green-600" />
									</div>

									<p>
										<span className="font-semibold">1,371</span> happy customers
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
						<div className="relative md:max-w-xl">
							<Image
								className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
								src="/your-image.png"
								height={200}
								width={200}
								alt="Guitar Pick"
							/>
							<Image
								className="absolute -bottom-6 -left-6 w-20 select-none"
								src="/line.png"
								height={200}
								width={200}
								alt="Line"
							/>
							<Image
								className="absolute -bottom-6 -right-6 w-20 scale-x-[-1] select-none"
								src="/line.png"
								height={200}
								width={200}
								alt="Line"
							/>
							<Image
								className="absolute -left-6 -top-6 w-20 scale-y-[-1] select-none"
								src="/line.png"
								height={200}
								width={200}
								alt="Line"
							/>
							<Image
								className="absolute -right-6 -top-6 w-20 scale-x-[-1] scale-y-[-1] select-none sm:hidden lg:block xl:hidden"
								src="/line.png"
								height={200}
								width={200}
								alt="Line"
							/>
							<Phone className="w-64" imgSrc="/Testimonials/5.jpg" imgHeight={800} imgWidth={800} />
						</div>
					</div>
				</MaxWidthWrapper>
			</section>

			<section className="bg-slate-100 py-24">
				<MaxWidthWrapper className="flex flex-auto flex-col items-center gap-16 sm:gap-32">
					<div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
						<h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
							What our{" "}
							<span className="relative px-2">
								customers{" "}
								<Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-blue-600 sm:block" />
							</span>{" "}
							say
						</h2>
					</div>

					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						<div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
							<div className="mb-2 flex gap-0.5">
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
							</div>
							<div className="text-lg leading-8">
								<p>
									"Absolutely love my new case! It's so unique and I get compliments on it all the time.{" "}
									<span className="bg-slate-800 p-0.5 text-white">
										The quality is amazing and the image looks perfect.
									</span>{" "}
									I'll definitely be ordering more!"
								</p>
							</div>
							<div className="mt-2 flex gap-4">
								<Image
									className="h-12 w-12 rounded-full object-cover"
									src="/users/user-3.png"
									height={50}
									width={50}
									alt="Testimonial picture 1"
								/>
								<div className="flex flex-col">
									<p className="font-semibold">Joanna</p>
									<div className="flex items-center gap-1.5 text-zinc-600">
										<Check className="h-4 w-4 stroke-[3px] text-green-600" />
										<p className="text-sm">Verified Buyer</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
							<div className="mb-2 flex gap-0.5">
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
								<Star className="h-5 w-5 fill-green-600 text-green-600" />
							</div>
							<div className="text-lg leading-8">
								<p>
									"Absolutely love my new case! It's so unique and I get compliments on it all the time.{" "}
									<span className="bg-slate-800 p-0.5 text-white">
										The quality is amazing and the image looks perfect.
									</span>{" "}
									I'll definitely be ordering more!"
								</p>
							</div>
							<div className="mt-2 flex gap-4">
								<Image
									className="h-12 w-12 rounded-full object-cover"
									src="/users/user-5.jpg"
									height={50}
									width={50}
									alt="Testimonial picture 1"
								/>
								<div className="flex flex-col">
									<p className="font-semibold">Jeromiah</p>
									<div className="flex items-center gap-1.5 text-zinc-600">
										<Check className="h-4 w-4 stroke-[3px] text-green-600" />
										<p className="text-sm">Verified Buyer</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>

				<AnimatedReviews />
			</section>

			<section>
				<MaxWidthWrapper className="py-24">
					<div className="mb-12 px-6 lg:px-8">
						<div className="mx-auto max-w-2xl sm:text-center">
							<h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
								Upload yours <span className="relative rounded-xl bg-blue-600 px-3 text-white">now </span>{" "}
							</h2>
						</div>
					</div>

					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
							<Image
								className="absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
								src="/arrow.png"
								height={100}
								width={100}
								alt="arrow"
							/>

							<div className="relative h-80 w-full max-w-sm rounded-xl bg-gray-950/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl">
								<Image
									className="h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
									src="/demo.png"
									height={500}
									width={500}
									alt="demo image"
								/>
							</div>

							<Phone className="w-60" imgSrc="/demo.png" imgHeight={800} imgWidth={800} />
						</div>
					</div>

					<ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
						<div className="flex justify-center">
							<Link href="/configure/upload" className={buttonVariants({ size: "lg", className: "mx-auto mt-8" })}>
								Create yours now
								<ArrowRight className="ml-1.5 h-5 w-5" />
							</Link>
						</div>
					</ul>
				</MaxWidthWrapper>
			</section>
		</div>
	);
}
