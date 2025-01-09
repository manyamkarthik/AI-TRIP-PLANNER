import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-100">
      <div className="relative py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              <span className="block">Discover Your Next</span>
              <span className="block text-yellow-500">Adventure with AI</span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl text-gray-600 max-w-md sm:max-w-lg mx-auto">
              Your personal AI travel companion. Create custom itineraries
              tailored to your interests, budget, and schedule in minutes.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center space-x-3 sm:space-x-4">
              <Link
                to="/create-trip"
                className="inline-block rounded-md bg-yellow-500 px-5 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-medium text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Plan Your Trip
              </Link>
              <a
                href="#features"
                className="inline-block rounded-md border border-gray-300 bg-white px-5 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <img
            className="mx-auto rounded-lg shadow-xl w-full object-cover"
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Travel adventure"
          />
        </div>
      </div>
    </div>
  );
}