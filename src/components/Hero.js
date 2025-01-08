import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="relative pt-16 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Discover Your Next</span>
              <span className="block text-yellow-400">Adventure with AI</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 sm:mt-6 sm:text-xl max-w-2xl mx-auto">
              Your personal AI travel companion. Create custom itineraries tailored to your interests, budget, and schedule in minutes.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/create-trip"
                className="inline-block rounded-md bg-yellow-500 px-6 py-3 text-lg font-medium text-white shadow-lg hover:bg-yellow-600 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Plan Your Trip
              </Link>
              <a
                href="#features"
                className="inline-block rounded-md border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-blue-900 shadow-md hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <img
            className="relative mx-auto rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Travel adventure"
          />
        </div>
      </div>
    </div>
  );
}
