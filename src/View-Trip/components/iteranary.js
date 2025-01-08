import React from 'react';
import { PlaceCardItem } from './PlaceCardItem';
import { toast } from 'react-toastify';

export const Iteranary = ({ tripData }) => {
  let parsedTripData;

  if (tripData?.tripdata) {
    try {
      parsedTripData = JSON.parse(tripData.tripdata);
    } catch (error) {
      toast.error("Error parsing tripdata:", error);
      parsedTripData = null;
    }
  }

  function formatDay(day) {
    return day.toUpperCase();
  }

  if (!parsedTripData || !parsedTripData.itinerary) {
    return <p>No Daily plans available</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-lg font-bold">Places To Visit</h2>

      {Object.entries(parsedTripData.itinerary).map(([day, details], index) => (
        <div key={index} className="space-y-4">
          <div className="border-b pb-2">
            <h2 className="text-md font-semibold">{formatDay(day)}: {details.theme}</h2>
            <p className="text-sm text-gray-600">
              <span role="img" aria-label="best-time-to-visit" className="mr-1">🌞</span>
              Best time to visit: <strong>{details.best_time_to_visit}</strong>
            </p>
          </div>

          {/* Apply Flexbox to the grid container */}
          <div className="grid grid-cols-2 gap-4">
            {details.places.map((place, placeIndex) => (
              <div key={placeIndex} className="flex"> {/* Add flex to the individual card container */}
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};