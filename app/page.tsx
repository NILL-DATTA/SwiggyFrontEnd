"use client";

import { useRef } from "react";
import Appbanner from "@/components/landingPageUser/appBanner/appbanner";
import Categories from "@/components/landingPageUser/categories/categories";
import Hero from "@/components/landingPageUser/heroSection/hero";
import Instamart from "@/components/landingPageUser/instamart/instamart";
import { CitySection } from "@/components/landingPageUser/landingpage/citySection";
import Restaurant from "@/components/landingPageUser/restaurant/restaurant";

export default function SwiggyHome() {
  const instaRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  // ১. ইমেজ পাথগুলো আপনার public/images ফোল্ডারের নামের সাথে মিলিয়ে নিন (Case-sensitive)
  const foods = [
    "/images/Biryani.avif",
    "/images/pizza.avif", // চেক করুন p ছোটহাতের নাকি বড়হাতের Pizza.avif
    "/images/Dosa.avif",
    "/images/Pasta.avif",
    "/images/Vada.avif",
    "/images/Uthappam.avif",
    "/images/ice_Cream.avif",
    "/images/idli.avif",
    "/images/Pancake.avif",
    "/images/Khichdi.avif",
    "/images/Rolls.avif",
  ];

  const instaMart = [
    "/images/bread.avif", "/images/fruitss.avif", "/images/fish_meat.avif",
    "/images/lifeBuoy.avif", "/images/maggie.avif", "/images/oatsMaggie.avif",
    "/images/megaPack.avif", "/images/veggis.avif", "/images/dal.avif",
    "/images/chips.avif", "/images/chana.avif",
  ];

  const restaurant = [
    "/images/res1.jpg", "/images/res2.webp", "/images/res4.jpg",
    "/images/res5.jpg", "/images/res6.avif", "/images/res7.jpg",
    "/images/res8.jpg", "/images/res9.jpg", "/images/res10.webp",
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 text-slate-900 antialiased">
      
      <div className="w-full">
        <Hero />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        <section className="w-full">
          <Categories foods={foods} />
        </section>

        <section className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <Instamart instaMart={instaMart} instaRef={instaRef} scroll={scroll} />
        </section>

        <section className="w-full">
          <Restaurant
            restaurant={restaurant}
            restaurantRef={restaurantRef}
            scroll={scroll}
          />
        </section>

        <section className="w-full">
          <Appbanner />
        </section>

        {/* Cities */}
        <section className="w-full border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CitySection title="Cities with food delivery" type="food online in" />
            <CitySection title="Cities with grocery delivery" type="grocery delivery in" />
          </div>
        </section>

      </main>
    </div>
  );
}