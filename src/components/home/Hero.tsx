import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaBookOpen } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ------------------------- LEFT CONTENT ------------------------- */}
          <div className="space-y-8">
            {/* Simple Highlight Badge */}
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600 mb-2">
              <IoSparklesSharp className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Where Every Child is the Hero</span>
            </div>

            {/* Updated Headline with TaleByYou */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10">Your Child's</span>
                  <span
                    className="absolute bottom-2 left-0 w-full h-3 bg-indigo-100 rounded-full -z-0"
                    aria-hidden="true"
                  ></span>
                </span>{" "}
                <span className="text-indigo-600">Story</span>
                <span className="block mt-1">Comes to Life</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-md">
                Transform your little one into the main character of beautifully
                illustrated adventures. At{" "}
                <span className="text-indigo-600 font-semibold">TaleByYou</span>
                , every story is as unique as your child.
              </p>
            </div>

            {/* Simple Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Link href="/library">
                  <FaBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Start Their Adventure
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Link href="#how-it-works" scroll={true}>
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Clean Stats */}
            <div className="grid grid-cols-3 gap-8 pt-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="font-bold text-indigo-600 text-2xl mb-1">
                  15+
                </div>
                <div className="text-slate-700 text-sm">Story Templates</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="font-bold text-purple-600 text-2xl mb-1">
                  100%
                </div>
                <div className="text-slate-700 text-sm">Personalized</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="font-bold text-indigo-600 text-2xl mb-1">
                  5-Star
                </div>
                <div className="text-slate-700 text-sm">Quality</div>
              </div>
            </div>
          </div>

          {/* ------------------------- RIGHT IMAGE ------------------------- */}
          <div className="relative">
            {/* Simple Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl transform rotate-3 scale-95 opacity-70"
              aria-hidden="true"
            />

            {/* Main Image Card */}
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-100">
              {/* Book Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg mb-6">
                <Image
                  src={siteConfig.images.homePage.hero}
                  alt="Example of a personalized children's book with custom character"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  priority
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Book Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FaBookOpen
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Emma's Adventure
                    </h3>
                    <p className="text-sm text-slate-500">Personalized Story</p>
                  </div>
                </div>

                {/* Page Indicator Dots */}
                <div className="flex space-x-1" role="presentation">
                  <div
                    className="w-2 h-2 rounded-full bg-indigo-600"
                    aria-hidden="true"
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-indigo-300"
                    aria-hidden="true"
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-indigo-300"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Simple Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <div className="bg-purple-600 rounded-full p-2">
                  <IoSparklesSharp
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-white rounded-full p-2 shadow-lg">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Best Seller
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
