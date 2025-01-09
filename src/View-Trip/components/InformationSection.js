import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export const InformationSection = ({ tripData }) => {
  const duration = tripData?.userSelection?.duration || "1";
  const budgetType = tripData?.userSelection?.budget || "budget";
  const group = tripData?.userSelection?.group || "group";
  
  let parsedTripData;
  try {
    parsedTripData = tripData?.tripdata ? JSON.parse(tripData.tripdata) : null;
  } catch (error) {
    toast.error("Error parsing trip data:", error);
  }

  const coverImage = parsedTripData?.itinerary?.day1?.places?.[0]?.place_image_url || 
    "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const prepareCsvData = () => {
    const csvData = [];
    parsedTripData?.itinerary && Object.keys(parsedTripData.itinerary).forEach((dayKey) => {
      const day = parsedTripData.itinerary[dayKey];
      day?.places?.forEach((place) => {
        csvData.push({
          PlaceName: place.placeName,
          Description: place["Place Details"],
          TicketPricing: place.ticketPricing,
          Rating: place.rating,
          TimeToTravel: place["Time to travel to the location"],
        });
      });
    });
    return csvData;
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="relative">
        <img
          src={coverImage}
          alt="Trip destination"
          className="h-48 sm:h-[340px] w-full object-cover rounded-xl"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
          }}
        />
      </div>

      <div className="my-5 space-y-2">
        <h2 className="font-bold text-xl sm:text-2xl">
          {tripData?.userSelection?.destination || "Destination"}
        </h2>
        <div className="text-sm text-gray-600 italic">
          <p>*Images may vary as I'm using the Google Places API, which may end its free trial soon.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-5">
        <div className="flex flex-wrap gap-2">
          <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-700 text-sm">
            {duration === "1" ? `🗓️ ${duration} day` : `🗓️ ${duration} days`}
          </span>
          <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-700 text-sm">
            {budgetType === "budget" ? `💸 Cheap budget` : `💰 ${budgetType} budget`}
          </span>
          <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-700 text-sm">
            {group === "group" ? "👥 Group" : `👥 ${group}`}
          </span>
        </div>

        <CSVLink
          data={prepareCsvData()}
          filename={"trip-data.csv"}
          className="text-white bg-black hover:bg-black/90 focus:ring-4 focus:ring-black/20 font-medium rounded-lg p-2.5 inline-flex items-center"
        >
          <IoSend className="w-5 h-5" />
          <span className="sr-only">Download Trip Data</span>
        </CSVLink>
      </div>
    </div>
  );
};