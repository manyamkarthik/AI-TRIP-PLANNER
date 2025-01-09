import { Link } from "react-router-dom";
import imageData from '../imageData.json';
import { toast } from "react-toastify";

export const Hotels = ({ tripData }) => {
  let parsedTripData;

  if (tripData?.tripdata) {
    try {
      parsedTripData = JSON.parse(tripData.tripdata);
    } catch (error) {
      toast.error("Error parsing tripdata:", error);
      parsedTripData = null;
    }
  }

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return price.replace(/\s*-\s*/g, " - ");
  };

  const getRandomHotelImage = () => {
    const hotelImages = imageData.hotels;
    const randomIndex = Math.floor(Math.random() * hotelImages.length);
    return hotelImages[randomIndex];
  };

  if (!parsedTripData || !parsedTripData.hotels) {
    return <p>No hotel data available</p>;
  }

  return (
    <div className="px-4 sm:px-0">
      <h2 className="font-bold mt-5 text-xl">Hotels Recommendation</h2>

      <div className="my-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parsedTripData.hotels.map((item, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item.HotelName
            )},${encodeURIComponent(item["Hotel address"])}`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="rounded-t-xl w-full h-48 object-cover"
                  src={item.hotel_image_url || "./placeholder.jpg"}
                  alt={item.HotelName}
                  onError={(e) => {
                    e.target.src = getRandomHotelImage();
                  }}
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="font-medium text-base">{item.HotelName}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  📍{item["Hotel address"]}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">💰{formatPrice(item?.Price)}</span>
                  <span className="text-sm">⭐{item.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};