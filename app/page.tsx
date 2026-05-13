"use client";

import Appbanner from "@/components/landingPageUser/appBanner/appbanner";
import Categories from "@/components/landingPageUser/categories/categories";
import Hero from "@/components/landingPageUser/heroSection/hero";
import Instamart from "@/components/landingPageUser/instamart/instamart";
import { CitySection } from "@/components/landingPageUser/landingpage/citySection";
import Restaurant from "@/components/landingPageUser/restaurant/restaurant";
import { useRef } from "react";

/* ---------------- Main Page ---------------- */
export default function SwiggyHome() {
  const instaRef = useRef(null);
  const restaurantRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const foods = [
    "/images/Biryani.avif",
    "/images/pizza.avif",
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
    "/images/bread.avif",
    "/images/fruitss.avif",
    "/images/fish_meat.avif",
    "/images/lifeBuoy.avif",
    "/images/maggie.avif",
    "/images/oatsMaggie.avif",
    "/images/megaPack.avif",
    "/images/veggis.avif",
    "/images/dal.avif",
    "/images/chips.avif",
    "/images/chana.avif",
  ];

  const restaurant = [
    "/images/res1.jpg",
    "/images/res2.webp",
    "/images/res4.jpg",
    "/images/res5.jpg",
    "/images/res6.avif",
    "/images/res7.jpg",
    "/images/res8.jpg",
    "/images/res9.jpg",
    "/images/res10.webp",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}

      <Hero />

      {/* Categories */}
      <Categories foods={foods} />

      {/* Instamart */}
      <Instamart instaMart={instaMart} instaRef={instaRef} scroll={scroll} />

      {/* Restaurants */}
      <Restaurant
        restaurant={restaurant}
        restaurantRef={restaurantRef}
        scroll={scroll}
      />

      {/* App Banner */}
      <Appbanner />

      {/* Cities */}
      <div className="px-6 md:px-16 py-12 text-black">
        <CitySection title="Cities with food delivery" type="food online in" />
        <CitySection
          title="Cities with grocery delivery"
          type="grocery delivery in"
        />
      </div>
    </div>
  );
}
