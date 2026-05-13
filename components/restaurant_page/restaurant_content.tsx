import React from "react";

export default function Restaurant_content({ activeTab }) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        {/* DELIVERY */}
        {activeTab === "delivery" && (
          <div>
            <p className="text-sm font-medium text-orange-500">
              In just 3 easy steps
            </p>

            <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Get your restaurant delivery-ready in 24hrs!
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* LEFT CARD */}
              <div className="rounded-[30px] bg-white p-8 shadow-sm">
                <div className="space-y-10">
                  {[
                    {
                      step: "STEP 1",
                      title: "Install the Swiggy Owner App",
                    },
                    {
                      step: "STEP 2",
                      title: "Login/Register using your phone number",
                    },
                    {
                      step: "STEP 3",
                      title: "Enter restaurant details",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 rounded-full bg-purple-600" />

                        {index !== 2 && (
                          <div className="mt-2 h-full w-[2px] bg-purple-200" />
                        )}
                      </div>

                      <div>
                        <p className="mb-1 text-xs font-bold tracking-[0.2em] text-gray-400">
                          {item.step}
                        </p>

                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="rounded-[30px] bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900">
                  Required Documents
                </h3>

                <p className="mt-3 text-gray-500">
                  Keep these documents handy for a faster onboarding process.
                </p>

                <div className="my-7 h-px w-full bg-gray-200" />

                <ul className="space-y-6">
                  {[
                    "FSSAI License copy",
                    "Restaurant menu",
                    "Bank account details",
                    "GSTIN",
                    "PAN card copy",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg text-orange-500">•</span>

                        <span className="text-lg font-semibold text-gray-800">
                          {item}
                        </span>
                      </div>

                      {(item === "FSSAI License copy" || item === "GSTIN") && (
                        <button className="text-sm font-medium text-orange-500 hover:underline">
                          Apply Here
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* DINEOUT */}
        {activeTab === "dineout" && (
          <div>
            <p className="text-sm font-medium text-orange-500">
              In just 3 easy steps
            </p>

            <h2 className="mt-2 max-w-4xl text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Get your restaurant discovered by millions of diners
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* LEFT */}
              <div className="rounded-[30px] bg-white p-8 shadow-sm">
                <div className="space-y-10">
                  {[
                    {
                      step: "STEP 1",
                      title: "Click on Show Interest",
                    },
                    {
                      step: "STEP 2",
                      title: "Enter your restaurant details and contact number",
                    },
                    {
                      step: "STEP 3",
                      title: "A DineOut Executive will reach out shortly!",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 rounded-full bg-purple-600" />

                        {index !== 2 && (
                          <div className="mt-2 h-full w-[2px] bg-purple-200" />
                        )}
                      </div>

                      <div>
                        <p className="mb-1 text-xs font-bold tracking-[0.2em] text-gray-400">
                          {item.step}
                        </p>

                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="rounded-[30px] bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900">
                  What you’ll need
                </h3>

                <p className="mt-3 text-gray-500">
                  Make sure these details are ready before onboarding.
                </p>

                <div className="my-7 h-px w-full bg-gray-200" />

                <ul className="space-y-6">
                  {[
                    "Restaurant photos",
                    "Menu details",
                    "GSTIN",
                    "Bank details",
                    "FSSAI Certificate",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-lg text-orange-500">•</span>

                      <span className="text-lg font-semibold text-gray-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
