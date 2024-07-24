import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Phone from "~/components/Phone";

export default function Home() {
	return (
		<div className="bg-slate-50">
			<section>
				<MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
					<div className="col-span-2 px-6 lg:px-0 lg:pt-4">
						<div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
							<div className="absolute -top-20 left-0 hidden w-28 lg:block">
								<Image
									src="/BlackSpirit.png"
									height={50}
									width={50}
									alt="Logo"
								/>
							</div>
							<h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
								Your Image on a{" "}
								<span className="bg-blue-600 px-2 text-white">
									Custom
								</span>{" "}
								Case
							</h1>
							<p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
								Your{" "}
								<span className="rounded-md bg-blue-300 p-1 text-white">
									case
								</span>
								. Your{" "}
								<span className="rounded-md bg-orange-300 p-1 text-white">
									image
								</span>
								. Your{" "}
								<span className="rounded-md bg-purple-300 p-1 text-white">
									style
								</span>
								. Create a custom case with your own image and
								make your device stand out.
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
										src="/users/user-1.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
									/>
									<img
										src="/users/user-2.png"
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
										<span className="font-semibold">
											1,371
										</span>{" "}
										happy customers
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
							<Phone
								className="w-64"
								imgSrc="/Testimonials/1.jpg"
								imgHeight={800}
								imgWidth={800}
							/>
						</div>
					</div>
				</MaxWidthWrapper>
			</section>
		</div>
	);
}
