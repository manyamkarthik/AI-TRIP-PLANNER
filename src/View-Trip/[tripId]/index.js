import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../service/FireBaseConfig"; // Assuming this file exports the Firestore instance
import { ToastContainer, toast } from "react-toastify"; // Import toast for better notifications
import { useEffect, useState } from "react"; // Use useState to manage component state
import { InformationSection } from "../components/InformationSection";
import { Hotels } from "../components/Hotels";
import { Iteranary } from "../components/iteranary";

export const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]); // State to hold trip data

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AI-TRIP-PLANNER', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

       // Parse tripdata string
        setTripData(docSnap.data());
        
       // Update state with trip data
      } else {
        toast.error("No Trip Found", { position: "bottom-right" }); 
      }
    } catch (error) {
      // console.error("Error fetching trip data:", error);
      toast.error("Error fetching trip data", { position: "bottom-right" }); 
    }
  };

  return (
    <>
    <div className="main-content">
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* {InformationSection} */}
        <InformationSection tripData={tripData}/>


        {/* {Recommenede Hotels} */}

        <Hotels tripData={tripData}/>

        {/* {Daily Plan} */}
        <Iteranary tripData={tripData}/>


        {/* {Footer} */}

        <ToastContainer />
        </div>
      </div>
    </>
  );
};