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

  if (!parsedTripData || !parsedTripData.hotels) {
    return <p>No hotel data available</p>;
  }


const getRandomHotelImage = () => {
  const hotelImages = imageData.hotels;
  const randomIndex = Math.floor(Math.random() * hotelImages.length);
  return hotelImages[randomIndex];
};



  return (
    <div>
      <h2 className="font-bold mt-5 text-xl">Hotels Recommendation</h2>

      <div className="my-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        {parsedTripData.hotels.map((item, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item.HotelName
            )},${encodeURIComponent(item["Hotel address"])}`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div className="p-3 flex flex-col gap-3 hover:scale-105 transition-all cursor-pointer">
              <img
                className="rounded-xl object-cover w-full h-40"
                src={item.hotel_image_url || "./placeholder.jpg"}
                alt={item.HotelName}
                about="hotels"
                onError={(e) => {
                  e.target.src = getRandomHotelImage();
                }}
              />

              <div className="flex flex-col gap-2 h-full">
                <h2 className="font-medium text-sm">{item.HotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍{item["Hotel address"]}
                </h2>
                <h2 className="text-sm">💰{formatPrice(item?.Price)}</h2>
                <h2 className="text-sm">⭐{item.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};