import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 xl:gap-x-8 xl:pt-32 lg:grid lg:grid-cols-3 lg:pt-24 lg:pb-52 sm:pb-32">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image src="/BlackSpirit.png" height={50} width={50} alt="Logo"/>
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-950 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a <span className="bg-blue-600 px-2 text-white">Custom</span> Guitar Pick
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Your <span className="bg-blue-300 p-1 rounded-md text-white">guitar pick</span>. Your <span className="bg-orange-300 p-1 rounded-md text-white">image</span>. Your <span className="bg-purple-300 p-1 rounded-md text-white">style</span>. Create a custom guitar pick with your own image and make your music stand out.  
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600"/>
                    High quality celluloid picks
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600"/>
                    Picks for all genres
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600"/>
                    Guaranteed conversation starter
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img src="/users/user-1.png" alt="user image" className="inline-block rounded-full h-10 w-10 ring-2 ring-slate-100" />
                  <img src="/users/user-2.png" alt="user image" className="inline-block rounded-full h-10 w-10 ring-2 ring-slate-100" />
                  <img src="/users/user-3.png" alt="user image" className="inline-block rounded-full h-10 w-10 ring-2 ring-slate-100" />
                  <img src="/users/user-4.jpg" alt="user image" className="inline-block rounded-full h-10 w-10 ring-2 ring-slate-100" />
                  <img src="/users/user-5.jpg" alt="user image" className="inline-block rounded-full h-10 w-10 ring-2 ring-slate-100 object-cover" />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                    <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                    <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                    <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                    <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                  </div>

                  <p><span className="font-semibold">1,371</span> happy customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image src="/guitar-pick.png" height={500} width={500} alt="Guitar Pick"/>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
