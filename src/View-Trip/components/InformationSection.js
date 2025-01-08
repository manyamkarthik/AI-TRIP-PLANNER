import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv"; // import CSVLink for downloading CSV

export const InformationSection = ({ tripData }) => {
  const duration = tripData?.userSelection?.duration || "1";
  const budgetType = tripData?.userSelection?.budget || "budget";
  const group = tripData?.userSelection?.group || "group";
  
  // Parse the JSON string if it exists
  let parsedTripData;
  try {
    parsedTripData = tripData?.tripdata ? JSON.parse(tripData.tripdata) : null;
  } catch (error) {
    toast.error("Error parsing trip data:", error);
  }

  // Get the first place's image from the first day as a cover image
  const coverImage = parsedTripData?.itinerary?.day1?.places?.[0]?.place_image_url || 
    "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Prepare the data for CSV excluding latitude and longitude
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
    <div>
      <img
        src={coverImage}
        alt="Trip destination"
        className="h-[340px] w-full object-cover rounded-xl"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }}
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {tripData?.userSelection?.destination || "Destination"}
        </h2>
        <div className="info-typing">
          <p className="typing-text">
            *Images may vary as I'm' using the Google Places API, which may end its free trial soon.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center my-5">
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md">
            {duration === "1" ? `🗓️ ${duration} day` : `🗓️ ${duration} days`}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md">
            {budgetType === "budget"
              ? `💸 Cheap budget`
              : `💰 ${budgetType} budget`}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md">
            {group === "group" ? "👥 Group" : `👥 ${group}`}
          </h2>
        </div>

        <div>
          <CSVLink
            data={prepareCsvData()} // Prepare data to be downloaded as CSV
            filename={"trip-data.csv"}
            className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
          >
            <IoSend className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </CSVLink>
        </div>
      </div>
    </div>
  );
};
