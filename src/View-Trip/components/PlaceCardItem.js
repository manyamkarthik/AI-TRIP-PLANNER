import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import imageData from '../imageData.json';

export const PlaceCardItem = ({ place }) => {
  const truncateAtFirstPeriod = (text) => {
    const firstPeriodIndex = text.indexOf('.');
    if (firstPeriodIndex !== -1) {
      return text.slice(0, firstPeriodIndex + 1);
    }
    return text;
  };

  const getRandomPlaceImage = () => {
    const placeImages = imageData.places;
    const randomIndex = Math.floor(Math.random() * placeImages.length);
    return placeImages[randomIndex];
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
        <div className="w-full sm:w-1/3 relative">
          <img
            src={place.place_image_url || "./placeholder.jpg"}
            alt={place.placeName}
            className="w-full h-48 sm:h-full object-cover"
            onError={(e) => { e.target.src = getRandomPlaceImage() }}
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs">{place.rating}</span>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-gray-500 text-sm line-clamp-2">
              {truncateAtFirstPeriod(place["Place Details"])}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span role="img" aria-label="clock">⏰</span>
              <span className="line-clamp-1">{place["Time to travel to the location"]}</span>
            </div>

            {place.Geo && (
              <div className="flex items-center gap-2 text-sm">
                <span role="img" aria-label="location">📍</span>
                <span>{place.Geo.latitude.toFixed(4)}, {place.Geo.longitude.toFixed(4)}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <span role="img" aria-label="ticket">🎟️</span>
              <span>{place.ticketPricing ? place.ticketPricing : place["ticket Pricing"]}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};