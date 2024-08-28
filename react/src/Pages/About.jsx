import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
        <h3 className="text-base font-semibold text-indigo-600 text-xl tracking-wide uppercase">
            About Us
          </h3>
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Welcome to FashionFix
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your Ultimate Fashion Rental & Lending Platform
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            At FashionFix, we believe in sustainable fashion. Whether you want to earn from your unused clothes or find the perfect outfit for a special event, FashionFix is here to make fashion accessible, affordable, and fun!
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9V3m-7 12a4 4 0 008 0m4-12v6m3 12H3a1 1 0 01-1-1v-5a2 2 0 012-2h14a2 2 0 012 2v5a1 1 0 01-1 1z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Rent or Buy
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                Need something special for an event? Browse our extensive collection of fashionable clothing to rent or buy, so you can shine at every occasion.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9V3m-7 12a4 4 0 008 0m4-12v6m3 12H3a1 1 0 01-1-1v-5a2 2 0 012-2h14a2 2 0 012 2v5a1 1 0 01-1 1z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Lend and Earn
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                Got clothes you no longer wear? Lend them out on FashionFix and earn money while giving your clothes a second life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
