import { MapPin, Search } from "lucide-react";


export default function Hero() {
  return (
    <>
      <div className="bg-orange-500 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Order food & groceries. Discover best restaurants.
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="flex items-center bg-white text-black px-4 py-3 rounded-lg w-full md:w-80">
            <MapPin />
            <input
              className="ml-2 outline-none w-full"
              placeholder="Enter your location"
            />
          </div>

          <div className="flex items-center bg-white text-black px-4 py-3 rounded-lg w-full md:w-96">
            <Search />
            <input
              className="ml-2 outline-none w-full"
              placeholder="Search for food..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
